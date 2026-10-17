"use server";

import { randomUUID } from "node:crypto";
import { revalidateTag, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { brands, shopCategories } from "@/data/store-data";
import { createSessionClient } from "@/lib/supabase/session";

export type AdminFormState = {
  error?: string;
};

const allowedImageTypes: Record<string, string> = {
  "image/avif": "avif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const maxImageSize = 5 * 1024 * 1024;
const bucketName = "product-images";

async function requireAdminAction() {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || user.app_metadata.role !== "admin") {
    throw new Error("You must be signed in as an admin to manage products.");
  }

  return supabase;
}

function readProductFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const brand = String(formData.get("brand") ?? "");
  const category = String(formData.get("category") ?? "");
  const priceText = String(formData.get("price") ?? "").trim();
  const price = Number(priceText);

  if (!name || name.length > 200) {
    return { error: "Enter a product name (up to 200 characters)." } as const;
  }
  if (!brands.includes(brand)) {
    return { error: "Choose a brand from the list." } as const;
  }
  if (!shopCategories.some((item) => item.slug !== "all" && item.name === category)) {
    return { error: "Choose a category from the list." } as const;
  }
  if (!priceText || !Number.isFinite(price) || price < 0) {
    return { error: "Enter a valid price of zero or more." } as const;
  }

  return { name, brand, category, price } as const;
}

async function uploadProductImage(
  supabase: Awaited<ReturnType<typeof createSessionClient>>,
  image: FormDataEntryValue | null,
  productId: string,
) {
  if (!(image instanceof File) || image.size === 0) {
    return { error: "Choose a product image." } as const;
  }

  const extension = allowedImageTypes[image.type];
  if (!extension || image.size > maxImageSize) {
    return { error: "Choose a JPG, PNG, WebP, or AVIF image up to 5 MB." } as const;
  }

  const objectPath = `${productId}/${randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from(bucketName)
    .upload(objectPath, image, {
      contentType: image.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { error: `Image upload failed: ${error.message}` } as const;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(objectPath);
  return { objectPath, imageUrl: data.publicUrl } as const;
}

function invalidateProducts() {
  updateTag("products");
  revalidateTag("products", "max");
  revalidateTag("admin-products", "max");
}

export async function signInAdmin(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "The email or password is incorrect." };
  }

  if (data.user.app_metadata.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "This account is not set up as a shop administrator." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Could not sign out: ${error.message}`);
  redirect("/admin/login");
}

export async function createProduct(
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const supabase = await requireAdminAction();
  const fields = readProductFields(formData);
  if ("error" in fields) return { error: fields.error };

  const id = `${fields.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70)}-${randomUUID().slice(0, 8)}`;
  const upload = await uploadProductImage(supabase, formData.get("image"), id);
  if ("error" in upload) return { error: upload.error };

  const { error } = await supabase.from("products").insert({
    id,
    name: fields.name,
    brand: fields.brand,
    category: fields.category,
    price: fields.price,
    image_url: upload.imageUrl,
    description: null,
  });

  if (error) {
    const { error: cleanupError } = await supabase.storage
      .from(bucketName)
      .remove([upload.objectPath]);
    if (cleanupError) {
      console.error("Could not remove an image after product creation failed:", cleanupError.message);
    }
    return { error: `Could not create product: ${error.message}` };
  }

  invalidateProducts();
  redirect("/admin?notice=created");
}

export async function updateProduct(
  productId: string,
  _previousState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const supabase = await requireAdminAction();
  const fields = readProductFields(formData);
  if ("error" in fields) return { error: fields.error };

  const { data: existing, error: readError } = await supabase
    .from("products")
    .select("id, image_url")
    .eq("id", productId)
    .maybeSingle();
  if (readError) return { error: `Could not load product: ${readError.message}` };
  if (!existing) return { error: "This product no longer exists." };

  const imageFile = formData.get("image");
  let newImagePath: string | undefined;
  let imageUrl = existing.image_url;

  if (imageFile instanceof File && imageFile.size > 0) {
    const upload = await uploadProductImage(supabase, imageFile, productId);
    if ("error" in upload) return { error: upload.error };
    newImagePath = upload.objectPath;
    imageUrl = upload.imageUrl;
  }

  const { error } = await supabase
    .from("products")
    .update({
      name: fields.name,
      brand: fields.brand,
      category: fields.category,
      price: fields.price,
      image_url: imageUrl,
    })
    .eq("id", productId);

  if (error) {
    if (newImagePath) {
      const { error: cleanupError } = await supabase.storage
        .from(bucketName)
        .remove([newImagePath]);
      if (cleanupError) {
        console.error("Could not remove an image after product update failed:", cleanupError.message);
      }
    }
    return { error: `Could not update product: ${error.message}` };
  }

  if (newImagePath) {
    const oldImagePath = getBucketObjectPath(existing.image_url);
    if (oldImagePath) {
      const { error: cleanupError } = await supabase.storage
        .from(bucketName)
        .remove([oldImagePath]);
      if (cleanupError) {
        console.error("Could not remove the replaced product image:", cleanupError.message);
      }
    }
  }

  invalidateProducts();
  redirect("/admin?notice=updated");
}

export async function deleteProduct(formData: FormData) {
  const supabase = await requireAdminAction();
  const productId = String(formData.get("id") ?? "");
  if (!productId) throw new Error("Missing product ID.");

  const { data: existing, error: readError } = await supabase
    .from("products")
    .select("id, image_url")
    .eq("id", productId)
    .maybeSingle();
  if (readError) throw new Error(`Could not load product: ${readError.message}`);
  if (!existing) throw new Error("This product no longer exists.");

  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) throw new Error(`Could not delete product: ${error.message}`);

  const imagePath = getBucketObjectPath(existing.image_url);
  if (imagePath) {
    const { error: storageError } = await supabase.storage
      .from(bucketName)
      .remove([imagePath]);
    if (storageError) {
      console.error("Product was deleted but its image could not be removed:", storageError.message);
    }
  }

  invalidateProducts();
  redirect("/admin?notice=deleted");
}

function getBucketObjectPath(imageUrl: string) {
  try {
    const url = new URL(imageUrl);
    const prefix = `/storage/v1/object/public/${bucketName}/`;
    if (!url.pathname.startsWith(prefix)) return null;
    return decodeURIComponent(url.pathname.slice(prefix.length));
  } catch {
    return null;
  }
}

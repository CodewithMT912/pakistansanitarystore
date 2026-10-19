import { createClient } from "@supabase/supabase-js";
import { loadEnvConfig } from "@next/env";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { products } from "../src/data/store-data";

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before importing.",
  );
}

const bucketName = "product-images";
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function getContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  const contentTypes: Record<string, string> = {
    ".avif": "image/avif",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  return contentTypes[extension] ?? "application/octet-stream";
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  callback: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await callback(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

async function main() {
  console.log(`Uploading images for ${products.length} products...`);

  const productRows = await mapWithConcurrency(products, 6, async (product) => {
    const relativeImagePath = product.image.replace(/^\/+/, "");
    const localImagePath = path.resolve(process.cwd(), "public", relativeImagePath);
    const publicDirectory = path.resolve(process.cwd(), "public");

    if (!localImagePath.startsWith(`${publicDirectory}${path.sep}`)) {
      throw new Error(`Invalid image path for product "${product.id}".`);
    }

    const image = await readFile(localImagePath);
    const objectPath = `${product.id}/${path.basename(localImagePath)}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(objectPath, image, {
        cacheControl: "3600",
        contentType: getContentType(localImagePath),
        upsert: true,
      });

    if (uploadError) {
      throw new Error(
        `Could not upload image for "${product.id}": ${uploadError.message}`,
      );
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(objectPath);

    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.priceAmount,
      image_url: data.publicUrl,
      description: null,
      variants: product.variants ?? [],
    };
  });

  const { error: upsertError } = await supabase
    .from("products")
    .upsert(productRows, { onConflict: "id" });

  if (upsertError) {
    throw new Error(`Could not save products to Supabase: ${upsertError.message}`);
  }

  console.log(`Imported ${productRows.length} products and their images.`);
}

main().catch((error: unknown) => {
  console.error(
    "Product import failed:",
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
});

# Supabase setup

## 1. Create the table and access rules

In the Supabase dashboard, open your project, choose **SQL Editor** in the left sidebar, select **New query**, paste the contents of [`supabase/setup.sql`](./supabase/setup.sql), and click **Run**.

The script creates the `products` table and policies. Everyone can read products; only signed-in users whose trusted `app_metadata.role` is `admin` can change products or product images. Set this role only from the Supabase dashboard or a trusted server—not from a public sign-up form or `user_metadata`.

## 2. Create the public image bucket

In the Supabase dashboard, open **Storage**, click **New bucket**, enter `product-images`, switch **Public bucket** on, and click **Create bucket**. This makes product image URLs viewable on the storefront. The SQL policies still restrict uploads, edits, and deletions to admins.

## 3. Prepare the one-time importer

The public URL and publishable key already belong in `.env.local` as:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

For the one-time import only, add a secret `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`. In Supabase, find it in **Project Settings → API Keys** (the legacy `service_role` key or a secret key). Never put this secret in a `NEXT_PUBLIC_` variable, browser code, GitHub, or Vercel's client-side environment. Keep `.env.local` private.

## 4. Import the products and images

In a terminal, change into the folder containing `package.json`, then run:

```powershell
npx tsx scripts/import-products.ts
```

For this project, the full command is:

```powershell
cd "C:\Users\Abc\Desktop\PakistanSanitary\newpakistansanitary"
npx tsx scripts/import-products.ts
```

The script reads products from `src/data/store-data.ts`, uploads each local image to the public bucket, and inserts or updates product rows. It is safe to run again if you need to repeat the import. The service-role key is used only by this local script and bypasses RLS, so do not deploy the importer or expose that key.

## Popular product sizes

Run [`supabase/popular-product-variants.sql`](./supabase/popular-product-variants.sql) once in the Supabase SQL Editor. It adds the `variants` JSONB array to `products` and combines Popular product rows with recognized size endings into one product row with its existing size/price options. It deletes only the duplicate Popular rows it consolidates. Run the importer again after the SQL migration to sync the complete variant lists generated from the product data.

The admin form edits Popular sizes as `size | price` lines. Other brands are unaffected.

## 5. Check the project

Run `npm run dev` and visit `/`, `/shop`, and a product page to check the products and images. When deploying to Vercel, add only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` under **Project → Settings → Environment Variables**. Do not add the service-role key.

The server-side product list and product-by-ID loaders use the `products` cache tag with a short `minutes` cache lifetime. When a future server action changes product data, call `revalidateTag("products", "max")` to mark the cached data stale and refresh it on the next visit. In a server action that needs the current user to see the change immediately, use `updateTag("products")`.

## 6. Create an admin account

1. In the Supabase dashboard, open **Authentication → Users** and choose **Add user → Create new user**.
2. Enter the email address and a strong password you will use to sign in, then create the user. Confirm the email in the dashboard if Supabase asks you to.
3. Open **SQL Editor → New query**. Replace `you@example.com` below with that exact email address, then run the query:

   ```sql
   update auth.users
   set raw_app_meta_data =
     coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = lower('you@example.com');
   ```

   The query should update **1 row**. This sets the trusted `app_metadata.role` required by the existing product and Storage policies. Do not use `user_metadata` for admin permissions.
4. Visit `/admin/login` on your website and sign in with that email and password. If you were already signed in before changing the role, sign out and sign back in so the new role is included in your session.

The admin screen is not linked from the customer site. The `/admin` pages and every product-changing server action independently verify the signed-in user's trusted app metadata. Add only the public Supabase URL and publishable key to Vercel; never deploy the service-role key.

## 7. Use the admin screen

Visit `/admin` to add products, see the product table, edit an item, or delete it. Product image uploads are limited to JPG, PNG, WebP, and AVIF files up to 5 MB. Successful changes immediately invalidate the cached shop products.

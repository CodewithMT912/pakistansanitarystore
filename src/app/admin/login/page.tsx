import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";
import AdminLoginForm from "./login-form";
import "../admin.css";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Suspense fallback={<main className="admin-login-page" aria-label="Loading admin login" />}>
      <AdminLoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminLoginContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.app_metadata.role === "admin") redirect("/admin");

  const { error } = await searchParams;
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <a className="admin-wordmark" href="/admin/login">
          <span className="admin-mark">NP</span>
          <span>
            <strong>New Pakistan</strong>
            <small>Shop administration</small>
          </span>
        </a>
        <p className="admin-eyebrow">Secure sign in</p>
        <h1>Admin login</h1>
        <p className="admin-login-intro">Sign in with your administrator account to manage shop products.</p>
        {error === "not-admin" && (
          <p className="admin-form-error" role="alert">
            This account does not have administrator access.
          </p>
        )}
        <AdminLoginForm />
      </section>
    </main>
  );
}

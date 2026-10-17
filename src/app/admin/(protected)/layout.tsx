import { Suspense } from "react";
import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { signOutAdmin } from "@/app/admin/actions";
import "../admin.css";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div className="admin-shell" aria-label="Loading admin" />}>
      <ProtectedAdminShell>{children}</ProtectedAdminShell>
    </Suspense>
  );
}

async function ProtectedAdminShell({ children }: { children: ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-inner">
          <a className="admin-wordmark" href="/admin">
            <span className="admin-mark">NP</span>
            <span>
              <strong>New Pakistan</strong>
              <small>Shop administration</small>
            </span>
          </a>
          <div className="admin-account">
            <span>{user.email}</span>
            <form action={signOutAdmin}>
              <button className="admin-signout" type="submit">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}

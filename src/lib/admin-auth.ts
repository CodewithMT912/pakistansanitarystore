import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";

export async function requireAdmin() {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/admin/login");
  if (user.app_metadata.role !== "admin") redirect("/admin/login?error=not-admin");

  return { supabase, user };
}

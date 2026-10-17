"use client";

import { useActionState } from "react";
import { signInAdmin, type AdminFormState } from "@/app/admin/actions";

const initialState: AdminFormState = {};

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(signInAdmin, initialState);

  return (
    <form className="admin-form" action={action}>
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
      <button className="admin-primary-button" type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

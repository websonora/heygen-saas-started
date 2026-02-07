"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin");

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/forgot-password?message=${encodeURIComponent("Check your email for a password reset link.")}`
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Header } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name ?? null;
  const avatarUrl = profile?.avatar_url ?? null;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r bg-sidebar md:block">
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-sm font-semibold text-sidebar-foreground">
            Dashboard
          </span>
        </div>
        <SidebarNav />
      </aside>
      <div className="flex flex-1 flex-col">
        <Header
          email={user.email!}
          fullName={fullName}
          avatarUrl={avatarUrl}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

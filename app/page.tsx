import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Welcome
            </h1>
            <p className="text-muted-foreground">
              Signed in as{" "}
              <span className="font-medium text-foreground">{user.email}</span>
            </p>
            <form action={signOut}>
              <Button variant="outline">Sign out</Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Welcome
            </h1>
            <p className="text-muted-foreground">
              Sign in to get started
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

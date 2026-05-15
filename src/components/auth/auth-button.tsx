import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground hidden lg:inline">Hey, {user.email}!</span>
      <Button size="sm" className="rounded-full px-6" asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  ) : (
    <Button size="sm" className="rounded-full px-6" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-balance">
          Welcome to BookMe! by Loop
        </h1>
        <p className="text-muted-foreground max-w-2xl text-xl">
          Your appointment companion for Loop Merchants
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

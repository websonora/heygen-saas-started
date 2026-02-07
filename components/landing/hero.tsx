import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Create AI Videos{" "}
            <span className="text-muted-foreground">with Style</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Transform your content with AI-powered video generation. Create
            personalized videos in minutes, not hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Watch demo
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-video rounded-xl border bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="rounded-full border-2 border-muted-foreground/30 p-4">
                <Play className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium">AI Video Preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

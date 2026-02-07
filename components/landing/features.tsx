import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Video,
  Globe,
  Zap,
  Users,
  Palette,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "AI Avatar Videos",
    description:
      "Generate professional videos with realistic AI avatars that speak your script naturally.",
  },
  {
    icon: Globe,
    title: "100+ Languages",
    description:
      "Translate and localize your videos into over 100 languages with native-quality voices.",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description:
      "Create videos in minutes instead of hours. No filming, editing, or post-production needed.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together with your team on video projects with shared templates and brand assets.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description:
      "Match your brand identity with custom colors, logos, fonts, and branded templates.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with SSO, role-based access, and data encryption at rest and in transit.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Powerful tools to create, customize, and scale your video content
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="mb-2 h-6 w-6 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Play, Users, Zap, type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Powerful Features for Developers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Everything you need to collaborate on code and execute it in
            real-time.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Users}
            title="Real-time Collaboration"
            description="Create rooms and invite teammates to code together in
                    real-time. See changes as they happen with cursor tracking and
                    presence indicators."
          />
          <FeatureCard
            icon={Play}
            title="Multi-language Execution"
            description="Run code in JavaScript, Python, Ruby, Go, and many more
                    languages directly in your browser with instant results."
          />
          <FeatureCard
            icon={Zap}
            title="Instant Sharing"
            description="Share your code and results with a simple link. Perfect for
                    interviews, teaching, or troubleshooting with colleagues."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeaturesSection;

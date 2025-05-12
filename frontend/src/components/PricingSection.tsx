import { ButtonWithIcon } from "./ui/Button";

function PricingSection() {
  return (
    <section id="pricing" className="py-20 w-full px-2 md:px-28">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Choose the plan that's right for you or your team.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <PricingCard
          title="Free"
          price="$0"
          period="/month"
          features={[
            "Up to 3 collaborators",
            "5 saved rooms",
            "Basic code execution",
          ]}
          buttonLabel="Get Started"
          buttonVariant="outline"
        />
        <PricingCard
          title="Pro"
          price="$12"
          period="/month"
          features={[
            "Unlimited collaborators",
            "Unlimited saved rooms",
            "Advanced code execution",
            "Custom branding",
          ]}
          buttonLabel="Get Started"
          isPopular
        />
        <PricingCard
          title="Enterprise"
          price="Custom"
          features={[
            "Everything in Pro",
            "SSO & advanced security",
            "Dedicated support",
            "Custom integrations",
          ]}
          buttonLabel="Contact Sales"
          buttonVariant="outline"
        />
      </div>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  buttonLabel: string;
  buttonVariant?: "outline" | "default";
  isPopular?: boolean;
}

function PricingCard({
  title,
  price,
  period,
  features,
  buttonLabel,
  isPopular = false,
}: PricingCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm relative">
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium border-2 z-50 border-emerald-300 bg-emerald-500">
          Most Popular
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <svg
              className="h-4 w-4 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <ButtonWithIcon label={buttonLabel} className="w-full" />
    </div>
  );
}

export default PricingSection;

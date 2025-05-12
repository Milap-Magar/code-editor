interface HowItWorksCardProps {
  number: string;
  title: string;
  description: string;
}

function HowItWorksCard({ number, title, description }: HowItWorksCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
        <span className="text-xl font-bold text-primary">{number}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How CodeSync Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Get started in seconds and boost your team's productivity.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          <HowItWorksCard
            number="1"
            title="Create a Room"
            description="Start a new coding room with a single click. Choose your
                    preferred language and settings."
          />
          <HowItWorksCard
            number="2"
            title="Invite Collaborators"
            description="Share a simple link to invite teammates. No sign-up required
                    for guests to join and collaborate."
          />
          <HowItWorksCard
            number="3"
            title="Code & Execute"
            description="Write code together and run it instantly. See results in
                    real-time and iterate quickly."
          />
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;

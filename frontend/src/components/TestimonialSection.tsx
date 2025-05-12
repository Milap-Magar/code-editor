interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  initials: string;
}

function TestimonialCard({
  name,
  title,
  quote,
  initials,
}: TestimonialCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <span className="font-bold text-primary">{initials}</span>
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <p className="text-muted-foreground">{quote}</p>
    </div>
  );
}
function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loved by Developers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            See what our users are saying about CodeSync.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            name="Jane Doe"
            title="Senior Developer at TechCorp"
            quote='"CodeSync has transformed how our team collaborates on code.
                    The real-time execution feature saves us hours of
                    back-and-forth."'
            initials="JD"
          />
          <TestimonialCard
            name="Mike Smith"
            title="Lead Engineer at StartupX"
            quote='"I use CodeSync for technical interviews. Being able to see
                    candidates code in real-time and run their solutions instantly
                    is a game-changer."'
            initials="MS"
          />
          <TestimonialCard
            name="Alex Johnson"
            title="CS Professor at Tech University"
            quote='"My students love using CodeSync for pair programming
                    assignments. The multi-language support means it works for all
                    our courses."'
            initials="AJ"
          />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

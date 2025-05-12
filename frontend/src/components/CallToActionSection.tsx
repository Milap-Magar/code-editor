import { ArrowRight } from "lucide-react";
import { ButtonWithIcon } from "./ui/Button";

function CallToActionSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to transform how you collaborate on code?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Join thousands of developers who are already using CodeSync to code
          better, together.
        </p>
        <div className="mt-10">
          <ButtonWithIcon label="Get Started for Free" icon={ArrowRight} />
        </div>
      </div>
    </section>
  );
}
export default CallToActionSection;

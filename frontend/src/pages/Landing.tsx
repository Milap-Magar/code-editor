import {
  CallToActionSection,
  FeaturesSection,
  Footer,
  HeroSection,
  HowItWorksSection,
  Navbar,
  PricingSection,
  // TestimonialSection,
} from "../components";

const Landing = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 md:px-14 flex flex-col justify-center items-center">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        {/* add this later on */}
        {/* <TestimonialSection /> */}
        <PricingSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;

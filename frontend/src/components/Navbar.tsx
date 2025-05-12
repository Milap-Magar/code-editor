import { Link } from "react-router";
import { ButtonWithIcon } from "./ui/Button";
import { ArrowRight, Code } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 md:px-12">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CodeSync</span>
        </div>
        <nav className="hidden md:flex justify-center items-center gap-6">
          <Link
            to="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            to="#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How It Works
          </Link>
          <Link
            to="#pricing"
            className="text-sm font-medium hover:text-primary"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/sign-in"
            className="cursor-pointer text-sm font-medium hover:underline underline-offset-4"
          >
            Log In
          </Link>
          <Link
            to="/sign-up"
            className="cursor-pointer text-sm font-medium hover:underline underline-offset-4"
          >
            <ButtonWithIcon label="Get Started" icon={ArrowRight} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

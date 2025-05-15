import { ArrowRight, Droplets, Play } from "lucide-react";
import { ButtonWithIcon } from "./ui/Button";
// import bg from "/assets/bg.jpg";

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-12">
      <div className="container flex flex-col items-center text-center">
        <div className="p-4 rounded-lg bg-primary/10 text-emerald-800 flex items-center justify-center text-lg gap-2 font-semibold">
          <Droplets size={24} color="blue" />
          Introducing CodeSync
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Collaborate and Execute Code{" "}
          <span className="text-primary">Together</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          A powerful platform for real-time code collaboration and execution.
          Create rooms, invite teammates, and run code in multiple languages
          instantly.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonWithIcon label="Try It Free" icon={ArrowRight} />
          <ButtonWithIcon label="Watch Demo" />
        </div>
        <div className="mt-16 w-full max-w-5xl rounded-lg border bg-card p-2 shadow-xl shadow-emerald-400 hidden md:flex md:flex-col">
          <div className="rounded bg-muted p-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  <span className="h-3 w-3 rounded-full bg-red-500 mr-1.5"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500 mr-1.5"></span>
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Room: Project Alpha • 3 users connected
                </span>
              </div>
              <ButtonWithIcon label="Run Code" icon={Play} />
            </div>
            <div className="mt-4 font-mono text-sm">
              <pre className="text-left overflow-x-auto p-2">
                <code className="language-javascript">
                  {`// Collaborative JavaScript Editor
  function calculateFibonacci(n) {
    if (n <= 1) return n;
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
  }
 
  // User 1 is typing...
  console.log("The 10th Fibonacci number is:", calculateFibonacci(10));
 
  // Output: The 10th Fibonacci number is: 55`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;

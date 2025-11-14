import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            PromptForge
          </span>
        </div>
        <Link to="/auth">
          <Button variant="outline">Sign In</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              AI-Powered Prompt Generation
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Transform Ideas Into
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Perfect AI Prompts
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate professional, detailed prompts from your simple ideas. 
            Save time and get better results from AI tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2 shadow-glow hover:shadow-glow/70 transition-all">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Examples
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-gradient-card border border-border hover:shadow-card transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
            <p className="text-muted-foreground">
              Turn your rough ideas into detailed, structured prompts in seconds
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-card border border-border hover:shadow-card transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Enhancement</h3>
            <p className="text-muted-foreground">
              AI-powered refinement adds context, clarity, and structure automatically
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-card border border-border hover:shadow-card transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Save & Share</h3>
            <p className="text-muted-foreground">
              Keep your prompts organized and share them with your team easily
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} PromptForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
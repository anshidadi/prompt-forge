import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Code, Rocket, Heart, Home } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Intelligent prompt generation using advanced algorithms"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Modern Stack",
      description: "Built with React, TypeScript, and Lovable Cloud"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Fast & Reliable",
      description: "Optimized performance with real-time updates"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "User-Focused",
      description: "Designed with simplicity and ease of use in mind"
    }
  ];

  const stats = [
    { value: "2025", label: "Established" },
    { value: "1000+", label: "Prompts Generated" },
    { value: "100%", label: "Free to Use" },
    { value: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)] animate-pulse-glow" />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 py-4 flex justify-between items-center"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate("/")}
        >
          PromptForge
        </motion.div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <Home className="w-4 h-4" />
          Home
        </Button>
      </motion.nav>

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-50 animate-pulse-glow" />
              <Sparkles className="w-20 h-20 text-primary relative animate-float" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
          >
            About PromptForge
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Transforming ideas into perfect AI prompts with the power of intelligence and simplicity
          </motion.p>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <Card className="p-12 bg-gradient-card backdrop-blur-xl border-primary/20 shadow-glow hover:shadow-lg transition-all duration-500">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow"
              >
                <span className="text-5xl font-bold text-white">MA</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent"
              >
                Muhammad Anshid KT
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl text-muted-foreground mb-6"
              >
                Creator & Developer | Age 18
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="max-w-2xl mx-auto text-center space-y-4"
              >
                <p className="text-foreground/80 leading-relaxed">
                  A passionate young developer with a vision to simplify AI interaction for everyone.
                  PromptForge was born from the desire to bridge the gap between human creativity and AI capabilities.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  With dedication to clean code, beautiful design, and user experience, this project represents
                  the fusion of modern web technologies and intelligent automation.
                </p>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
            What Makes PromptForge Special
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-6 h-full bg-gradient-card backdrop-blur-xl border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mb-20"
        >
          <Card className="p-12 bg-gradient-card backdrop-blur-xl border-primary/20 shadow-glow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Built With Modern Technology
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["React", "TypeScript", "Tailwind CSS", "Lovable Cloud", "Supabase", "Framer Motion"].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="px-6 py-3 rounded-full bg-gradient-card backdrop-blur-xl border border-primary/20 text-sm font-medium hover:border-primary/40 hover:shadow-glow transition-all duration-300">
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-primary text-white hover:opacity-90 transition-all duration-300 shadow-glow hover:shadow-lg hover:scale-105"
            >
              Get Started Now
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mt-20 pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground"
        >
          <p>© 2025 PromptForge. Created with ❤️ by Muhammad Anshid KT</p>
          <p className="mt-2">All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default About;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy, Share2, Trash2, LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface Prompt {
  id: string;
  user_idea: string;
  generated_prompt: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [userIdea, setUserIdea] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [recentPrompts, setRecentPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadUserProfile(session.user.id);
        loadRecentPrompts();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setUserName(data.name);
    }
  };

  const loadRecentPrompts = async () => {
    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error && data) {
      setRecentPrompts(data);
    }
  };

  const handleGeneratePrompt = async () => {
    if (!userIdea.trim()) {
      toast.error("Please enter your idea first");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: { userIdea },
      });

      if (error) throw error;

      setGeneratedPrompt(data.generatedPrompt);
      
      await supabase.from("prompts").insert({
        user_id: user?.id,
        user_idea: userIdea,
        generated_prompt: data.generatedPrompt,
      });

      loadRecentPrompts();
      toast.success("Prompt generated successfully!");
    } catch (error) {
      toast.error("Failed to generate prompt");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ text });
        toast.success("Shared successfully!");
      } catch (error) {
        handleCopy(text);
      }
    } else {
      handleCopy(text);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("prompts").delete().eq("id", id);

    if (!error) {
      setRecentPrompts(recentPrompts.filter((p) => p.id !== id));
      toast.success("Prompt deleted");
    } else {
      toast.error("Failed to delete prompt");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-float" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PromptForge
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, <span className="text-foreground font-medium">{userName}</span>
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="gap-2 hover:scale-105 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-2 animate-fade-in-up">
              <h1 className="text-4xl font-bold">
                Hi, {userName}! 👋
              </h1>
              <p className="text-muted-foreground">
                What would you like to create today?
              </p>
            </div>

            {/* Generator Section */}
            <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Generate Your Prompt
                </CardTitle>
                <CardDescription>
                  Describe your idea and we'll create a perfect prompt for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter your idea here... (e.g., 'A mobile app for tracking daily habits')"
                    value={userIdea}
                    onChange={(e) => setUserIdea(e.target.value)}
                    rows={4}
                    className="resize-none transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <Button
                  onClick={handleGeneratePrompt}
                  disabled={loading || !userIdea.trim()}
                  className="w-full shadow-glow hover:shadow-glow/70 hover:scale-[1.02] transition-all duration-300 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Generate Prompt
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Prompt Display */}
            {generatedPrompt && (
              <Card className="backdrop-blur-sm bg-gradient-card border border-primary/20 shadow-lg shadow-primary/5 animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-primary">Your Generated Prompt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {generatedPrompt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopy(generatedPrompt)}
                      variant="outline"
                      className="flex-1 gap-2 hover:bg-primary/5 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                    <Button
                      onClick={() => handleShare(generatedPrompt)}
                      variant="outline"
                      className="flex-1 gap-2 hover:bg-secondary/5 hover:border-secondary/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Prompts */}
            {recentPrompts.length > 0 && (
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-2xl font-semibold">Recent Prompts</h2>
                <div className="space-y-3">
                  {recentPrompts.map((prompt, index) => (
                    <Card
                      key={prompt.id}
                      className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Your Idea:</p>
                            <p className="text-sm font-medium line-clamp-2">{prompt.user_idea}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Generated Prompt:</p>
                            <p className="text-sm line-clamp-3 text-muted-foreground">
                              {prompt.generated_prompt}
                            </p>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              onClick={() => handleCopy(prompt.generated_prompt)}
                              variant="ghost"
                              size="sm"
                              className="flex-1 gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </Button>
                            <Button
                              onClick={() => handleShare(prompt.generated_prompt)}
                              variant="ghost"
                              size="sm"
                              className="flex-1 gap-2 hover:bg-secondary/10 hover:text-secondary transition-all duration-300"
                            >
                              <Share2 className="w-3 h-3" />
                              Share
                            </Button>
                            <Button
                              onClick={() => handleDelete(prompt.id)}
                              variant="ghost"
                              size="sm"
                              className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-20 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} PromptForge. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
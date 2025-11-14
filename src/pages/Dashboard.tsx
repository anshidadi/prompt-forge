import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy, Share2, Trash2, LogOut } from "lucide-react";
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
    // Check authentication
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
      
      // Save to database
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PromptForge
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {userName}!</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Generate Section */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Generate Your Prompt</CardTitle>
                <CardDescription>
                  Enter your idea and let AI create a detailed prompt for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Idea</label>
                  <Textarea
                    placeholder="Example: Create a marketing campaign for eco-friendly products..."
                    value={userIdea}
                    onChange={(e) => setUserIdea(e.target.value)}
                    className="min-h-[150px] resize-none"
                  />
                </div>
                <Button
                  onClick={handleGeneratePrompt}
                  disabled={loading}
                  className="w-full gap-2"
                >
                  {loading ? (
                    "Generating..."
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Prompt
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {generatedPrompt && (
              <Card className="shadow-glow border-primary/20 bg-gradient-card animate-scale-in">
                <CardHeader>
                  <CardTitle>Generated Prompt</CardTitle>
                  <CardDescription>Your enhanced AI-ready prompt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                    {generatedPrompt}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => handleCopy(generatedPrompt)}
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => handleShare(generatedPrompt)}
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Recent Prompts */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Prompts</CardTitle>
                <CardDescription>Your previously generated prompts</CardDescription>
              </CardHeader>
              <CardContent>
                {recentPrompts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No prompts yet. Generate your first one!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentPrompts.map((prompt) => (
                      <Card key={prompt.id} className="bg-gradient-card border-border/50">
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Idea:</p>
                            <p className="text-sm font-medium line-clamp-2">
                              {prompt.user_idea}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Prompt:</p>
                            <p className="text-sm line-clamp-3">{prompt.generated_prompt}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopy(prompt.generated_prompt)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleShare(prompt.generated_prompt)}
                            >
                              <Share2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(prompt.id)}
                              className="ml-auto text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
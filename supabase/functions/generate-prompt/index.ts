import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userIdea } = await req.json();

    if (!userIdea || userIdea.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "User idea is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Enhanced prompt generation logic
    const generatedPrompt = enhancePrompt(userIdea);

    return new Response(
      JSON.stringify({ generatedPrompt }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating prompt:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate prompt" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function enhancePrompt(userIdea: string): string {
  // Analyze the user's idea and create a structured, detailed prompt
  const ideaLower = userIdea.toLowerCase();
  
  let prompt = "Create a comprehensive and detailed response for the following:\n\n";
  
  // Add context based on keywords
  if (ideaLower.includes("marketing") || ideaLower.includes("campaign")) {
    prompt += "Marketing Campaign Brief:\n";
    prompt += `Objective: ${userIdea}\n\n`;
    prompt += "Requirements:\n";
    prompt += "1. Target Audience: Define the primary and secondary audiences\n";
    prompt += "2. Key Messages: Outline 3-5 core messages to communicate\n";
    prompt += "3. Channels: Specify digital and traditional marketing channels\n";
    prompt += "4. Timeline: Provide a phased rollout plan\n";
    prompt += "5. Budget Considerations: Suggest cost-effective strategies\n";
    prompt += "6. Success Metrics: Define KPIs and measurement methods\n\n";
    prompt += "Deliverables:\n";
    prompt += "- Creative concepts with visual descriptions\n";
    prompt += "- Sample copy for key materials\n";
    prompt += "- Social media strategy and content calendar outline\n";
    prompt += "- Competitive analysis insights\n";
  } else if (ideaLower.includes("code") || ideaLower.includes("program") || ideaLower.includes("app") || ideaLower.includes("software")) {
    prompt += "Software Development Specification:\n";
    prompt += `Project: ${userIdea}\n\n`;
    prompt += "Technical Requirements:\n";
    prompt += "1. Core Functionality: Detail the primary features and user workflows\n";
    prompt += "2. Technology Stack: Recommend appropriate frameworks and tools\n";
    prompt += "3. Architecture: Describe the system design and component structure\n";
    prompt += "4. Data Model: Define entities, relationships, and storage requirements\n";
    prompt += "5. Security: Outline authentication, authorization, and data protection\n";
    prompt += "6. Performance: Specify scalability and optimization needs\n\n";
    prompt += "Implementation Plan:\n";
    prompt += "- Phase 1: MVP features and core functionality\n";
    prompt += "- Phase 2: Enhanced features and integrations\n";
    prompt += "- Testing Strategy: Unit, integration, and user acceptance testing\n";
    prompt += "- Deployment: CI/CD pipeline and hosting considerations\n";
  } else if (ideaLower.includes("business") || ideaLower.includes("strategy") || ideaLower.includes("plan")) {
    prompt += "Business Strategy Document:\n";
    prompt += `Focus Area: ${userIdea}\n\n`;
    prompt += "Strategic Framework:\n";
    prompt += "1. Current State Analysis: Assess existing situation and challenges\n";
    prompt += "2. Objectives: Define clear, measurable goals (SMART framework)\n";
    prompt += "3. Target Market: Identify and profile key customer segments\n";
    prompt += "4. Value Proposition: Articulate unique competitive advantages\n";
    prompt += "5. Action Plan: Break down strategies into actionable initiatives\n";
    prompt += "6. Resources: Identify required budget, team, and tools\n\n";
    prompt += "Execution Roadmap:\n";
    prompt += "- Short-term wins (0-3 months)\n";
    prompt += "- Medium-term goals (3-12 months)\n";
    prompt += "- Long-term vision (1-3 years)\n";
    prompt += "- Risk mitigation strategies\n";
    prompt += "- Performance monitoring dashboard\n";
  } else if (ideaLower.includes("content") || ideaLower.includes("article") || ideaLower.includes("blog") || ideaLower.includes("write")) {
    prompt += "Content Creation Brief:\n";
    prompt += `Topic: ${userIdea}\n\n`;
    prompt += "Content Specifications:\n";
    prompt += "1. Audience: Define reader demographics and expertise level\n";
    prompt += "2. Tone and Style: Specify voice (formal/casual, technical/accessible)\n";
    prompt += "3. Structure: Outline sections and flow (intro, body, conclusion)\n";
    prompt += "4. Length: Target word count and depth of coverage\n";
    prompt += "5. SEO: Identify primary and secondary keywords\n";
    prompt += "6. Call-to-Action: Define desired reader response\n\n";
    prompt += "Content Elements:\n";
    prompt += "- Compelling headline and subheadings\n";
    prompt += "- Key points and supporting arguments\n";
    prompt += "- Examples, case studies, or data points\n";
    prompt += "- Visual suggestions (images, infographics, videos)\n";
    prompt += "- Links to relevant resources\n";
  } else {
    // Generic enhancement for other topics
    prompt += `Task: ${userIdea}\n\n`;
    prompt += "Detailed Requirements:\n";
    prompt += "1. Context and Background: Provide relevant background information\n";
    prompt += "2. Specific Objectives: Clearly state what needs to be achieved\n";
    prompt += "3. Key Considerations: Identify important factors to address\n";
    prompt += "4. Constraints: Note any limitations or boundaries\n";
    prompt += "5. Success Criteria: Define what a successful outcome looks like\n";
    prompt += "6. Format and Style: Specify preferred output format\n\n";
    prompt += "Expected Output:\n";
    prompt += "- Comprehensive and well-structured response\n";
    prompt += "- Clear explanations with examples where appropriate\n";
    prompt += "- Actionable recommendations or next steps\n";
    prompt += "- Professional and engaging presentation\n";
  }
  
  prompt += "\nPlease provide a thorough, professional response that addresses all the requirements outlined above.";
  
  return prompt;
}
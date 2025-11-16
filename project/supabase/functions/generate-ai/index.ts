import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const AI_RESPONSES = [
  "That's a fascinating question! Based on current understanding, {topic} involves multiple interconnected factors that researchers continue to study.",
  "Great inquiry! The concept of {topic} has evolved significantly over time, with new perspectives emerging regularly.",
  "Excellent point! When considering {topic}, it's important to look at both the practical applications and theoretical foundations.",
  "Interesting perspective! {topic} is an area where innovation continues to drive new discoveries and understanding.",
  "That's a thoughtful question. {topic} represents a complex interplay of various elements that deserve careful consideration.",
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    
    const words = prompt.toLowerCase().split(' ');
    const topic = words.length > 3 ? words.slice(0, 3).join(' ') : prompt;
    
    const response = randomResponse.replace('{topic}', topic);
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const data = {
      response: response,
      prompt: prompt,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
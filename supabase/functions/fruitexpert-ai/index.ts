import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@1.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MODEL = "gemini-2.5-flash";

const fruitAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    commonName: { type: Type.STRING, description: "Common name of the fruit, e.g., 'Dragon Fruit'" },
    scientificName: { type: Type.STRING, description: "Scientific biological name, e.g., 'Selenicereus undatus'" },
    confidence: { type: Type.INTEGER, description: "Confidence score percentage between 0 and 100 based on image clarity" },
    originHistory: { type: Type.STRING, description: "Highly informative paragraph of origin, history, migration and cultural significance of the fruit." },
    physicalCharacteristics: { type: Type.STRING, description: "Physical attributes including typical shape, colors, skin textures, interior pulp, and sensory taste profiles." },
    nutritionalValue: {
      type: Type.OBJECT,
      properties: {
        vitamins: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key vitamins found in high quantities" },
        minerals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of prominent minerals" },
        healthBenefits: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 to 5 detailed medical/wellness benefits of eating this fruit" },
        caloriesPer100g: { type: Type.INTEGER, description: "Estimated calories per 100g serving" },
      },
      required: ["vitamins", "minerals", "healthBenefits", "caloriesPer100g"],
    },
    varieties: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 to 5 popular cultivars or varieties with brief notes" },
    culinaryUsesStorage: { type: Type.STRING, description: "Culinary preparation methods and shelf-life storage tips" },
    topProducers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          country: { type: Type.STRING },
          quantity: { type: Type.STRING, description: "Human-readable production quantity string" },
          valueNumeric: { type: Type.NUMBER, description: "Raw numeric value in thousands of tons for charting" },
        },
        required: ["country", "quantity", "valueNumeric"],
      },
      description: "Top 5 producing countries with production data",
    },
    globalLeader: { type: Type.STRING, description: "The world's leading producer country" },
    majorExporters: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Major export market countries" },
    growingConditions: { type: Type.STRING, description: "Ideal horticultural climate, soil, and cultivation conditions" },
    seasonality: { type: Type.STRING, description: "Harvest season and peak availability" },
    interestingFacts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 to 5 fascinating botanical trivia facts" },
    healthWarnings: { type: Type.STRING, description: "Allergen and consumption warnings" },
  },
  required: [
    "commonName", "scientificName", "confidence", "originHistory",
    "physicalCharacteristics", "nutritionalValue", "varieties",
    "culinaryUsesStorage", "topProducers", "globalLeader",
    "majorExporters", "growingConditions", "seasonality",
    "interestingFacts", "healthWarnings",
  ],
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop() || "";
    const body = await req.json().catch(() => ({}));

    const apiKey = Deno.env.get("GEMINI_API_KEY");

    // Route: config
    if (path === "config") {
      return new Response(JSON.stringify({
        hasApiKey: !!(apiKey && apiKey !== "MY_GEMINI_API_KEY"),
        modelName: apiKey ? MODEL : null,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Route: analyze-fruit
    if (path === "analyze-fruit") {
      const { imageBase64, mimeType, language } = body;

      if (!apiKey) {
        return new Response(JSON.stringify({
          success: false,
          error: "API_KEY_MISSING",
          message: "To analyze your own fruit photos, please set your Gemini API key in the Settings > Secrets menu.",
        }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (!imageBase64 || !mimeType) {
        return new Response(JSON.stringify({
          success: false,
          error: "INVALID_REQUEST",
          message: "Please upload a valid image file.",
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: [
          { inlineData: { mimeType, data: cleanBase64 } },
          "Analyze this fruit image with high accuracy as a master agriculturalist. Identify the fruit and output a complete structured analysis according to the requested JSON schema. Provide extensive, non-trivial, interesting details for all text fields." +
          (language === "bn" ? " IMPORTANT: You MUST output all text descriptions, paragraph explanations, bullet points, list items, and instructions in natural, professional Bengali/Bangla language. The scientificName and botanical keys must remain in standard Latin/English taxonomy." : ""),
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: fruitAnalysisSchema,
        },
      });

      const text = response.text;
      if (!text) throw new Error("No response text returned from Gemini API");

      const data = JSON.parse(text);
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Route: chat
    if (path === "chat") {
      const { messages, activeFruit, language } = body;

      if (!messages || !Array.isArray(messages)) {
        return new Response(JSON.stringify({
          success: false,
          message: "Invalid chat history formatting.",
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (!apiKey) {
        const lastUserMessage = messages[messages.length - 1]?.content || "";
        const lowerMsg = lastUserMessage.toLowerCase();

        let answer = language === "bn"
          ? "আমি বর্তমানে স্যান্ডবক্স মোডে আছি কারণ কোনো জেমিনি এপিআই কী কনফিগার করা নেই। তবে, আমি প্রিলোড করা ফলের (ড্রাগন ফল, আম, অ্যাভোকাডো, ডুরিয়ান এবং আপেল) ক্ষেত্রে আপনাকে সাহায্য করতে পারি। এই ফলগুলো সম্পর্কে জিজ্ঞাসা করুন অথবা উপরোক্ত ড্যাশবোর্ড দেখুন! সমস্ত ফলের লাইভ এআই কথোপকথন সক্ষম করতে সেটিংসের সিক্রেটস ট্যাবে আপনার GEMINI_API_KEY যোগ করুন।"
          : "I am currently in sandbox mode because no Gemini API key is configured. However, I can help you with preloaded fruits (Dragon Fruit, Mango, Avocado, Durian, and Apple). Ask me about these fruits or check out their dashboards! To enable live conversations about all fruits, please add your GEMINI_API_KEY in the Settings > Secrets tab.";

        if (activeFruit) {
          const fName = activeFruit.commonName;
          const sName = activeFruit.scientificName;

          if (lowerMsg.includes("family") || lowerMsg.includes("scientific") || lowerMsg.includes("taxonom") || lowerMsg.includes("belong") || lowerMsg.includes("its name")) {
            answer = language === "bn"
              ? `🔬 **উদ্ভিদবিজ্ঞান শ্রেণীবিভাগ:**\n\n**${fName}** ফলটি বৈজ্ঞানিকভাবে *${sName}* হিসেবে মনোনীত। স্যান্ডবক্স মোডে আরও বিস্তারিত তথ্যের জন্য GEMINI_API_KEY যোগ করুন।`
              : `🔬 **Botanical Classification:**\n\n**${fName}** is scientifically designated as *${sName}*. Add a GEMINI_API_KEY for more detailed information in sandbox mode.`;
          }
        }

        return new Response(JSON.stringify({ success: true, content: answer }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are FruitExpert AI, an advanced AI-powered fruit identification and agricultural analysis tool. You help users with fruit botany, nutrition, cultivation, recipes, and global agricultural trade.${activeFruit ? ` The user is currently viewing ${activeFruit.commonName} (${activeFruit.scientificName}).` : ""}${language === "bn" ? " Respond in natural, professional Bengali/Bangla language." : " Respond in English."}`;

      const recentMessages = messages.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const chatResponse = await ai.models.generateContent({
        model: MODEL,
        contents: [
          { role: "user", parts: [{ text: "Introduce yourself quickly" }] },
          { role: "model", parts: [{ text: "Hello! I am FruitExpert AI, your interactive guide to fruit botany, nutrition, and global agriculture. Ask me anything!" }] },
          ...recentMessages,
        ],
        config: { systemInstruction, temperature: 0.7 },
      });

      return new Response(JSON.stringify({
        success: true,
        content: chatResponse.text || "I was unable to formulate a response. Please try asking again.",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Route: quick-action
    if (path === "quick-action") {
      const { fruitName, actionType, scientificName } = body;

      if (!fruitName) {
        return new Response(JSON.stringify({
          success: false,
          message: "Fruit name is required for a quick action deep dive.",
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (!apiKey) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let markdown = "";
        switch (actionType) {
          case "more_varieties":
            markdown = `### 🔍 Deep Dive: Cultivars & Varieties of **${fruitName}**\n\n#### Notable Cultivars\nThe world of **${fruitName}** encompasses a rich diversity of cultivars, each with unique flavor profiles, textures, and growing requirements. From heirloom varieties preserved for centuries to modern hybrid cultivars bred for disease resistance and yield, the genetic diversity is remarkable.\n\n#### Regional Specialties\nDifferent regions have developed their own preferred varieties adapted to local climate, soil, and culinary traditions. Exploring these regional specialties reveals how geography and culture shape fruit cultivation.\n\n*Add a GEMINI_API_KEY to unlock AI-generated variety reports with full detail.*`;
            break;
          case "production_stats":
            markdown = `### 📊 Global Production & Trade Channels: **${fruitName}**\n\n#### Global Supply Chains\nThe international market for **${fruitName}** is heavily driven by seasonal transit windows and cold-chain logistics. Modern container ships use Controlled Atmosphere (CA) chambers to arrest ripening during sea voyages.\n\n#### Key Trade Statistics\n- **Annual Trade Value:** Estimated at billions USD globally.\n- **Post-Harvest Loss Index:** Around 18-22% in developing nations.\n- **Water Footprint:** Varies by region and cultivation method.\n\n*Add a GEMINI_API_KEY to unlock AI-generated production statistics with full detail.*`;
            break;
          case "recipes_uses":
            markdown = `### 🍽️ Culinary Showcases: **${fruitName}** Recipes\n\n#### Recipe 1: Artisan Summer Salad\n- Fresh **${fruitName}**, baby arugula, goat cheese, toasted walnuts, olive oil, balsamic glaze.\n\n#### Recipe 2: Botanical Infused Mocktail\n- Pureed **${fruitName}** pulp, fresh lime juice, crushed mint, elderflower tonic.\n\n*Add a GEMINI_API_KEY to unlock AI-generated recipe reports with full detail.*`;
            break;
          case "grow_home":
            markdown = `### 🌱 Home Cultivation Guide: **${fruitName}**\n\n#### Getting Started\nGrowing **${fruitName}** at home is a rewarding experience. Choose a sunny location with well-draining soil. Consider your local climate zone and select appropriate varieties.\n\n#### Key Tips\n- **Soil:** Well-draining, rich in organic matter.\n- **Watering:** Consistent moisture, avoid waterlogging.\n- **Sunlight:** Full sun for optimal fruit production.\n\n*Add a GEMINI_API_KEY to unlock AI-generated growing guides with full detail.*`;
            break;
          case "health_nutrition":
            markdown = `### ⚠️ Health & Nutrition Deep Dive: **${fruitName}**\n\n#### Nutritional Highlights\n**${fruitName}** offers a range of essential nutrients that support overall health and wellness. Regular consumption as part of a balanced diet contributes to long-term health.\n\n#### Dietary Considerations\n- Always consult with healthcare professionals for personalized dietary advice.\n- Be aware of potential allergens and cross-reactions.\n\n*Add a GEMINI_API_KEY to unlock AI-generated health reports with full detail.*`;
            break;
          default:
            markdown = `### Report for **${fruitName}**\n\n*Add a GEMINI_API_KEY to unlock AI-generated reports.*`;
        }

        return new Response(JSON.stringify({ success: true, markdown }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const actionPrompts: Record<string, string> = {
        more_varieties: `Provide a comprehensive deep-dive report on the cultivars, varieties, and heirloom strains of ${fruitName} (${scientificName}). Include regional specialties, breeding history, and flavor comparisons.`,
        production_stats: `Provide a comprehensive global production and trade statistics report for ${fruitName} (${scientificName}). Include major producers, export volumes, supply chain logistics, and economic impact.`,
        recipes_uses: `Provide a comprehensive culinary guide for ${fruitName} (${scientificName}). Include 3-4 detailed recipes, preservation methods, and cultural culinary traditions from around the world.`,
        grow_home: `Provide a comprehensive home cultivation guide for ${fruitName} (${scientificName}). Include soil preparation, planting, watering, pruning, pest management, and harvest timing.`,
        health_nutrition: `Provide a comprehensive health and nutrition deep-dive report for ${fruitName} (${scientificName}). Include detailed vitamin/mineral analysis, medicinal properties, dietary interactions, and safety warnings.`,
      };

      const promptInstruction = actionPrompts[actionType] || `Provide a detailed report about ${fruitName} (${scientificName}).`;

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: promptInstruction,
        config: {
          systemInstruction: "You are FruitExpert AI, an advanced AI-powered fruit identification and agricultural analysis tool. Provide accurate, professional, fascinating, and beautiful markdown reports with proper headings and bullet points.",
          temperature: 0.7,
        },
      });

      return new Response(JSON.stringify({
        success: true,
        markdown: response.text || "No report could be generated at this time. Please try again.",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Unknown route
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message || "An unexpected error occurred.",
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

import { GoogleGenerativeAI } from "@google/generative-ai";

// Prompt template for general-purpose explanation
const buildPrompt = (text) => `
You are an expert teacher and explainer. 

Your job is to explain the following text in a very simple, clear, and easy-to-understand way for someone who might not be an expert. 
But make sure that if the text is an instruction like "explain this text", "Write a code.....", you should provide the exact answer of the instruction rather than explaining what the text means.

Please provide the well-structured response. Use everyday language, avoid technical jargon as much as possible, and give examples or analogies if it helps understanding.

Here is the text to explain:

"""
${text}
"""

Make sure your explanation helps someone new to the topic fully understand what this text means or does.
Also make sure if it is asking for meaning or anything which needs a short explanation, you should provide a short explanation.
And most importantly, Please include appropriate HTML tags (like <strong>, <em>, <p>, <br>, etc.) to format the text. Wrap the entire response content inside a single <div> tag, so I can directly insert it into my webpage using innerHTML.
Make sure the HTML tags are properly opened and closed.
`;

export const getExplanationFromGemini = async (text) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = buildPrompt(text);

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return {
      explanation: response.trim(),
      success: true
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      explanation: "Sorry, I couldn't generate an explanation.",
      success: false
    };
  }
};

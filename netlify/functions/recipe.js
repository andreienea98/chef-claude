import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HF_ACCESS_TOKEN)

export async function handler(event) {
  try {
    const { ingredients } = JSON.parse(event.body)

    const SYSTEM_PROMPT = `
      You are an assistant that receives a list of ingredients that a user has 
      and suggests a recipe they could make with some or all of those ingredients. 
      If the language in which the ingredients are written is not English, show the instructions in that language and in English.
      Format your response in markdown.
    `

    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredients.join(", ")}. Please give me a recipe!`,
        },
      ],
      max_tokens: 1024,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: response.choices[0].message.content }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}

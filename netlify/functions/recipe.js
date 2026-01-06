import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN)

export async function handler(event) {
  try {
    const { ingredients } = JSON.parse(event.body)

    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe
they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
If the language in which the ingredients are written is not English, show the instructions in that language and in English. 
Make sure the user is not using bad language or inexistent ingredients. 
If they do, reply telling them that you will not give a recipe because they didn't use real ingredients.
Format your response in markdown to make it easier to render to a web page.
`

    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
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
    console.error("Recipe function error:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message, stack: err.stack }),
    }
  }
}

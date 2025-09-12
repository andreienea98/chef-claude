import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])

  const [recipe, setRecipe] = React.useState("")

  async function fetchRecipe() {
  const res = await fetch("/.netlify/functions/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })
  })
  const data = await res.json()
  setRecipe(data.recipe)   // store AI response in state
  //setRecipeShown(true)     // show the recipe section
}


  // const [recipeShown, setRecipeShown] = React.useState(false)

  // function toggleRecipeShown() {
  //   setRecipeShown(prevShown => !prevShown)
  // }

  
  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient")
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
  }

  return (
    <main>
      <form action={handleSubmit} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={fetchRecipe}/>}
      {recipe && <ClaudeRecipe recipe={recipe}/>}
    </main>
  )
}

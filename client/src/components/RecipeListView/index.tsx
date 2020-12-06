import React, { useState } from 'react'
import RecipeList from './components/RecipeList'
import AddRecipe from './components/AddRecipe'

import { IIngredient, IRecipe } from '../../types'

const units = ['', 'lb', 'oz', 'cup', 'tbsp', 'tsp', 'ml', 'inch']

const RecipeListView = () => {
  const ingredientsState: IIngredient = {
    ingredient: '',
    quantity: 0,
    unit: 'lb',
  }

  const recipeState: IRecipe = {
    recipe: '',
    instructions: '',
  }

  const [ingredients, setIngredients] = useState<IIngredient>(ingredientsState)
  const [recipeIngredients, setRecipeIngredients] = useState<IIngredient[]>([
    ingredientsState,
  ])
  const [recipeData, setRecipeData] = useState<IRecipe>(recipeState)

  const ingredientsHandler = (name: string, value: string) => {
    setIngredients({
      ...ingredients,
      [name]: value,
    })
  }

  const removeIngredientsHandler = (name: string) => {
    setRecipeIngredients(
      recipeIngredients.filter((ing) => ing.ingredient !== name)
    )
  }

  const recipeIngredientsHandler = () => {
    setRecipeIngredients([...recipeIngredients, ingredients])
  }

  const setRecipeHandler = (name: string, value: string) => {
    setRecipeData({ ...recipeData, [name]: value })
  }

  const resetIngredientsHandler = () => {
    setIngredients(ingredientsState)
  }

  const resetRecipeDetailHandler = () => {
    setRecipeData(recipeState)
    setRecipeIngredients([{ ...ingredientsState }])
  }

  const { ingredient, quantity, unit } = ingredients
  const { recipe, instructions } = recipeData

  return (
    <>
      <RecipeList />
      <AddRecipe
        ingredientsHandler={ingredientsHandler}
        recipeIngredients={recipeIngredients}
        recipeIngredientsHandler={recipeIngredientsHandler}
        removeIngredientsHandler={removeIngredientsHandler}
        setRecipeHandler={setRecipeHandler}
        resetRecipeDetail={resetRecipeDetailHandler}
        resetIngredients={resetIngredientsHandler}
        ingredient={ingredient}
        quantity={quantity}
        unit={unit}
        units={units}
        recipe={recipe}
        instructions={instructions}
        recipeData={recipeData}
      />
    </>
  )
}

export default RecipeListView

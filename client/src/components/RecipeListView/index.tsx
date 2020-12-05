import React, { useState } from 'react'
import RecipeList from './components/RecipeList'
import AddRecipe from './components/AddRecipe'

import { IIngredient } from '../../types'

const units = ['', 'lb', 'oz', 'cup', 'tbsp', 'tsp', 'ml', 'inch']

const RecipeListView = () => {
  const ingredientsState: IIngredient = {
    ingredient: '',
    quantity: 0,
    unit: 'lb',
  }

  const [ingredients, setIngredients] = useState<IIngredient>(ingredientsState)
  const [recipeIngredients, setRecipeIngredients] = useState<IIngredient[]>([
    { ...ingredientsState },
  ])

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

  const { ingredient, quantity, unit } = ingredients
  return (
    <>
      <RecipeList />
      <AddRecipe
        ingredientsHandler={ingredientsHandler}
        recipeIngredients={recipeIngredients}
        recipeIngredientsHandler={recipeIngredientsHandler}
        removeIngredientsHandler={removeIngredientsHandler}
        ingredient={ingredient}
        quantity={quantity}
        unit={unit}
        units={units}
      />
    </>
  )
}

export default RecipeListView

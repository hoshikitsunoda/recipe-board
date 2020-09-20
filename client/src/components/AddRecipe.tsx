import React, { useState } from 'react'
import { gql } from '@apollo/client'
import { Mutation } from '@apollo/client/react/components'

import IngredientInput from './IngredientInput'
import { IIngredient, IRecipe } from '../types/types'

type IState = Omit<IRecipe, 'id' | 'ingredients'>

const ADD_RECIPE = gql`
  mutation AddRecipe(
    $recipe: String!
    $ingredients: [IngredientInput]
    $instructions: String!
  ) {
    addRecipe(
      recipe: $recipe
      ingredients: $ingredients
      instructions: $instructions
    ) {
      recipe
      ingredients {
        ingredient
        quantity
        unit
      }
      instructions
    }
  }
`

const RECIPES_QUERY = gql`
  query GetRecipes {
    recipes {
      id
      recipe
      ingredients {
        ingredient
        quantity
        unit
      }
      instructions
    }
  }
`

const AddRecipe: React.FC = () => {
  const ingredientsState: IIngredient = {
    ingredient: '',
    quantity: 0,
    unit: 'lb',
  }
  const initialState: IState = {
    recipe: '',
    instructions: '',
  }
  const [recipeIngredients, setRecipeIngredients] = useState<IIngredient[]>([
    { ...ingredientsState },
  ])
  const [recipeData, setRecipeData] = useState<IState>(initialState)

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault()
    setRecipeData({ ...recipeData, [event.target.name]: event.target.value })
  }

  const copiedIngredients = [...recipeIngredients]
  const ingredientValue = copiedIngredients.map((ing) => {
    return {
      ingredient: ing.ingredient,
      quantity: +ing.quantity,
      unit: ing.unit,
    }
  })

  const variables = {
    recipe: recipeData.recipe,
    ingredients: ingredientValue,
    instructions: recipeData.instructions,
  }

  const subLabels: string[] = ['ingredient', 'quantity', 'unit']

  return (
    <div className="fixed bottom-0 p-8 w-full lg:w-1/2 xl:w-1/3 bg-orange-100 shadow-2xl">
      <div>
        <div className="mb-2">
          <label
            htmlFor="recipe"
            className="block text-gray-700 font-mono text-sm mb-2"
          >
            Recipe Name:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="recipe"
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="ingredients"
            className="text-gray-700 font-mono text-sm mb-2"
          >
            Ingredients:
          </label>
          <div className="flex justify-between space-x-2 mt-2">
            {subLabels.map((label) => (
              <label
                key={label}
                htmlFor={label}
                className={`text-gray-700 w-${
                  label === 'ingredient' ? '2/4' : '1/4'
                } font-mono text-xs mb-2 mx-0`}
              >
                {label}
              </label>
            ))}
          </div>
          <IngredientInput
            recipeIngredients={recipeIngredients}
            setRecipeIngredients={setRecipeIngredients}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="instructions"
            className="block text-gray-700 font-mono text-sm mb-2"
          >
            Instructions:
          </label>
          <textarea
            name="instructions"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChangeHandler}
          />
        </div>
        <Mutation
          mutation={ADD_RECIPE}
          variables={variables}
          refetchQueries={() => {
            return [
              {
                query: RECIPES_QUERY,
              },
            ]
          }}
        >
          {(postMutation: any) => (
            <button
              onClick={postMutation}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ADD
            </button>
          )}
        </Mutation>
      </div>
    </div>
  )
}

export default AddRecipe

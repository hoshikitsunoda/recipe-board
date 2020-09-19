import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { IIngredient } from '../types/types'

const AddRecipe: React.FC = () => {
  const ingredientsState = {
    ingredient: '',
    quantity: 0,
    unit: 'lb',
  }

  const [recipeName, setRecipeName] = useState<string>('')
  const [recipeIngredients, setRecipeIngredients] = useState<IIngredient[]>([
    { ...ingredientsState },
  ])
  const [recipeInstructions, setRecipeInstructions] = useState<string>('')

  const recipeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value)
  }

  const recipeInstructionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRecipeInstructions(event.target.value)
  }

  console.log(recipeName, recipeIngredients.shift(), recipeInstructions)

  const subLabels: string[] = ['ingredient', 'quantity', 'unit']

  return (
    <div className="fixed bottom-0 p-8 w-full lg:w-1/2 xl:w-1/3 bg-orange-100 shadow-2xl">
      <form>
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
            onChange={recipeNameHandler}
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
            value={recipeInstructions}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={recipeInstructionHandler}
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          ADD
        </button>
      </form>
    </div>
  )
}

export default AddRecipe

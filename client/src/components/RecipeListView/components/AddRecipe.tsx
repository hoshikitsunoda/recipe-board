import React, { useState } from 'react'
import { Mutation } from '@apollo/client/react/components'

import IngredientInput from './IngredientInput'
import { Button } from '../../shared/Button'
import {
  IIngredient,
  IRecipe,
  AddRecipeProps,
  IEventTarget,
} from '../../../types'
import { ADD_RECIPE, RECIPES_QUERY } from '../../../queries/queries'

const AddRecipe: React.FC<AddRecipeProps> = ({
  ingredientsHandler,
  recipeIngredients,
  recipeIngredientsHandler,
  removeIngredientsHandler,
  setRecipeHandler,
  resetRecipeDetail,
  resetIngredients,
  ingredient,
  quantity,
  unit,
  units,
  recipe,
  instructions,
  recipeData,
}) => {
  const [isOpen, setIsOpen] = useState({ open: false })

  const onChangeHandler = ({ target: { name, value } }: IEventTarget) => {
    setRecipeHandler(name, value)
  }

  const resetStatesHandler = () => {
    resetRecipeDetail()
  }

  const toggleHandler = () => {
    setIsOpen((prevState) => ({ open: !prevState.open }))
  }

  const ingredientValue: IIngredient[] = recipeIngredients.map((ing) => {
    return {
      ingredient: ing.ingredient,
      quantity: +ing.quantity,
      unit: ing.unit,
    }
  })

  const variables: IRecipe = {
    recipe: recipeData.recipe,
    ingredients: ingredientValue,
    instructions: recipeData.instructions,
  }

  const subLabels: string[] = ['ingredient', 'quantity', 'unit']

  return (
    <div className="fixed bottom-0 p-8 pt-2 w-full lg:w-1/2 xl:w-1/3 bg-orange-100 shadow-2xl border-solidPink border-r-8">
      <div className="w-full flex justify-between items-center">
        <h3 className="font-mono text-xl">Add Recipe</h3>
        <button
          className={`text-3xl text-gray-600 font-mono focus:outline-none ${
            isOpen.open ? 'transform rotate-45' : null
          }`}
          onClick={toggleHandler}
        >
          +
        </button>
      </div>
      <div>
        {isOpen.open ? (
          <>
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
                value={recipe}
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
                ingredientsHandler={ingredientsHandler}
                recipeIngredientsHandler={recipeIngredientsHandler}
                removeIngredientsHandler={removeIngredientsHandler}
                resetIngredients={resetIngredients}
                ingredient={ingredient}
                quantity={quantity}
                unit={unit}
                units={units}
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
                value={instructions}
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
              onCompleted={resetStatesHandler}
            >
              {(postMutation: any) => (
                <Button onClick={postMutation}>Add</Button>
              )}
            </Mutation>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default AddRecipe

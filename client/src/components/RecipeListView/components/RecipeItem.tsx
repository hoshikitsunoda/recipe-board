import React from 'react'
import { Mutation } from '@apollo/client/react/components'

import { Button, LinkButton } from '../../shared/Button'
import { IIngredient, IRecipe } from '../../../types'
import { REMOVE_RECIPE, RECIPES_QUERY } from '../../../queries/queries'

const RecipeItem: React.FC<IRecipe> = ({
  id,
  recipe,
  ingredients,
  instructions,
}) => {
  return (
    <div className="w-full max-w-sm relative shadow-solidPink overflow-scroll flex flex-col justify-between">
      <div className="h-full px-6 py-4 bg-orange-100 flex flex-col justify-between">
        <div>
          <h2 className="font-mono text-gray-800 text-lg">{recipe}</h2>
          <ul className="font-serif text-base mt-4">
            <p className="font-mono text-xs mb-2">Ingredients:</p>
            {ingredients?.map(({ ingredient, quantity, unit }: IIngredient) =>
              ingredient ? (
                <li key={ingredient} className="tracking-wide">
                  {ingredient} - {quantity} {unit}
                </li>
              ) : null
            )}
          </ul>
          <p className="font-serif text-sm mt-6 tracking-wide">
            {instructions}
          </p>
        </div>
      </div>
      <LinkButton id={id}>See the recipe</LinkButton>
    </div>
  )
}

export default RecipeItem

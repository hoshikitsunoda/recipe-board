import React from 'react'
import { IIngredient, IRecipe } from '../types/types'
import { Mutation } from '@apollo/client/react/components'
import { REMOVE_RECIPE, RECIPES_QUERY } from '../queries/queries'

const RecipeItem: React.FC<IRecipe> = ({
  id,
  recipe,
  ingredients,
  instructions,
}) => {
  return (
    <div className="w-full max-w-sm rounded-md overflow-scroll shadow-lg px-6 py-4 bg-orange-100">
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
      <p className="font-serif text-sm mt-6 tracking-wide">{instructions}</p>
      <Mutation
        mutation={REMOVE_RECIPE}
        variables={{ id: id }}
        refetchQueries={() => {
          return [
            {
              query: RECIPES_QUERY,
            },
          ]
        }}
      >
        {(mutation: any) => (
          <button
            onClick={mutation}
            className="text-orange-700 hover:text-gray-700 underline text-sm mt-4"
          >
            delete recipe
          </button>
        )}
      </Mutation>
    </div>
  )
}

export default RecipeItem

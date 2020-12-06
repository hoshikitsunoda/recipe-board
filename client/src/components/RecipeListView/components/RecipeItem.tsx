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
    <div className="w-full max-w-sm overflow-scroll px-6 py-4 bg-orange-100 flex flex-col justify-between shadow-solidPink">
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
      <LinkButton id={id}>See the recipe</LinkButton>
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
          <div className="w-full text-right mt-4">
            <Button onClick={mutation} red>
              delete
            </Button>
          </div>
        )}
      </Mutation>
    </div>
  )
}

export default RecipeItem

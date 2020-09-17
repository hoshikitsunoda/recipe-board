import React from 'react'
import { IIngredient, IRecipe } from '../types/types'

type IProps = Omit<IRecipe, 'id'>

const RecipeItem: React.FC<IProps> = ({
  recipe,
  ingredients,
  instructions,
}) => {
  return (
    <div className="flex-1 max-w-sm rounded-md overflow-hidden shadow-lg px-6 py-4 bg-orange-100 m-4">
      <h2 className="font-mono text-gray-800 text-lg">{recipe}</h2>
      <ul className="font-serif text-base mt-4">
        {ingredients.map(({ ingredient, quantity, unit }: IIngredient) => (
          <li key={ingredient}>
            {ingredient}: {quantity} {unit}
          </li>
        ))}
      </ul>
      <p className="font-serif text-sm mt-6">{instructions}</p>
    </div>
  )
}

export default RecipeItem

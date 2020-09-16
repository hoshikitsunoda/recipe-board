import React from 'react'
import { IIngredient, IRecipe } from '../types/types'

type IProps = IRecipe

const RecipeItem: React.FC<IProps> = ({
  recipe,
  ingredients,
  instructions,
}) => {
  return (
    <div>
      <h2>{recipe}</h2>
      <ul>
        {ingredients.map(({ ingredient, quantity, unit }: IIngredient) => (
          <li key={ingredient}>
            {ingredient}: {quantity} {unit}
          </li>
        ))}
      </ul>
      <p>{instructions}</p>
    </div>
  )
}

export default RecipeItem

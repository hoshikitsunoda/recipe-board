import React from 'react'

const RecipeItem = ({ recipe, ingredients, instructions }: any) => {
  return (
    <div>
      <h2>{recipe}</h2>
      <ul>
        {ingredients.map(({ ingredient, quantity, unit }: any) => (
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

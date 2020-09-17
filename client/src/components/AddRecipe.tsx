import React, { useState } from 'react'
import IngredientInput from './IngredientInput'

const AddRecipe: React.FC = () => {
  const [count, setCount] = useState(1)
  let ingredients: JSX.Element[] = []

  const addInputHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()
    setCount(count + 1)
  }

  const subtractInputHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()
    count <= 0 ? setCount(count - 1) : setCount(1)
  }

  for (let i = 0; i < count; i++) {
    ingredients.push(<IngredientInput key={i} />)
  }

  return (
    <div className="fixed bottom-0 p-8 w-full lg:w-1/3 xl:w-1/4 bg-orange-100 shadow-2xl">
      <form action="post">
        <div className="mb-2">
          <label
            htmlFor="recipe-name"
            className="block text-gray-700 text-sm mb-2"
          >
            Recipe Name:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="recipe-name"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 text-sm mb-2"
          >
            ingredients:
          </label>
          {ingredients}
          <button onClick={addInputHandler}>+</button>
          <button onClick={subtractInputHandler}>-</button>
        </div>
        <div className="mb-2">
          <label
            htmlFor="instructions"
            className="block text-gray-700 text-sm mb-2"
          >
            Instructions:
          </label>
          <textarea className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          ADD
        </button>
      </form>
    </div>
  )
}

export default AddRecipe

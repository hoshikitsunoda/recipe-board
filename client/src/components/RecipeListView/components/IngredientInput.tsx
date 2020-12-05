import { IEventTarget, IngInputProps } from '../../../types'
import React, { useRef, MutableRefObject, useState } from 'react'

// const units = ['', 'lb', 'oz', 'cup', 'tbsp', 'tsp', 'ml', 'inch']

const IngredientInput: React.FC<IngInputProps> = ({
  recipeIngredients,
  ingredientsHandler,
  recipeIngredientsHandler,
  removeIngredientsHandler,
  ingredient,
  quantity,
  unit,
  units,
}) => {
  const [isAdded, setIsAdded] = useState(false)

  const ingredientInput = useRef() as MutableRefObject<HTMLInputElement>
  const quantityInput = useRef() as MutableRefObject<HTMLInputElement>
  const unitInput = useRef() as MutableRefObject<HTMLSelectElement>

  const onChangeHandler = ({ target: { name, value } }: IEventTarget): void => {
    ingredientsHandler(name, value)
  }

  const addIngredientHandler = () => {
    recipeIngredientsHandler()
    isAdded ? setIsAdded(false) : setIsAdded((prev) => !prev)
  }

  const ingredientList = recipeIngredients.map((ing, i) => {
    return ing.ingredient ? (
      <li key={i} className="ml-4">
        <div className="flex justify-between space-x-2 mb-2 font-serif">
          <span className="w-6/12">{ing.ingredient}</span>
          <span className="w-3/12 pl-2">{ing.quantity}</span>
          <span className="w-2/12 pl-4">{ing.unit}</span>
          <button
            className="w-1/12"
            onClick={() => removeIngredientsHandler(ing.ingredient)}
          >
            -
          </button>
        </div>
      </li>
    ) : null
  })

  return (
    <>
      <div>
        <ul>{ingredientList}</ul>
        <div className="flex justify-between space-x-2 mb-2">
          <input
            className="appearance-none border rounded w-6/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="ingredient"
            onChange={onChangeHandler}
            ref={ingredientInput}
            value={isAdded ? '' : ingredient}
          />
          <input
            className="appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="quantity"
            onChange={onChangeHandler}
            ref={quantityInput}
            min="0"
            value={isAdded ? '' : quantity}
          />
          <select
            className="border rounded w-2/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="unit"
            id="unit"
            onChange={onChangeHandler}
            ref={unitInput}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <button
            className="border w-auto lg:w-1/12 lg:py-2 lg:px-3 text-gray-700 hover:bg-orange-300 text-xl leading-4 p-2 outline-none border-orange-900"
            onClick={addIngredientHandler}
          >
            +
          </button>
        </div>
      </div>
    </>
  )
}

export default IngredientInput

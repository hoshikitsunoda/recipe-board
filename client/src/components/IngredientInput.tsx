import { IIngredient } from '../types/types'
import React, {
  useState,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react'

const units = ['', 'lb', 'oz', 'cup', 'tbsp', 'tsp', 'ml', 'inch']

type IState = IIngredient

interface IProps {
  recipeIngredients: IIngredient[]
  setRecipeIngredients: Dispatch<SetStateAction<IIngredient[]>>
}

const IngredientInput: React.FC<IProps> = ({
  recipeIngredients,
  setRecipeIngredients,
}) => {
  const initialState: IState = {
    ingredient: '',
    quantity: 0,
    unit: '',
  }

  const [ingredients, setIngredients] = useState<IState>(initialState)

  const ingredientInput = useRef() as MutableRefObject<HTMLInputElement>
  const quantityInput = useRef() as MutableRefObject<HTMLInputElement>
  const unitInput = useRef() as MutableRefObject<HTMLSelectElement>

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    event.preventDefault()

    setIngredients({
      ...ingredients,
      [event.target.name]: event.target.value,
    })
  }

  const addIngredientHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()

    setRecipeIngredients([
      ...recipeIngredients,
      {
        ingredient: ingredients.ingredient,
        quantity: ingredients.quantity,
        unit: ingredients.unit,
      },
    ])

    ingredientInput.current.value = ''
    quantityInput.current.value = ''
    unitInput.current.value = ''

    setIngredients(initialState)
  }

  const removeIngredientHandler = (
    name: string,
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()

    const ingredientsCopy = [...recipeIngredients]
    setRecipeIngredients(
      ingredientsCopy.filter((item) => item.ingredient !== name)
    )
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
            onClick={(event) => removeIngredientHandler(ing.ingredient, event)}
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
            className="appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="ingredient"
            onChange={onChangeHandler}
            ref={ingredientInput}
          />
          <input
            className="appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="quantity"
            onChange={onChangeHandler}
            ref={quantityInput}
            min="0"
          />
          <select
            className="border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        </div>
      </div>
      <div className="flex justify-items-start space-x-3">
        <button
          className="w-2/12 lg:w-1/12 hover:bg-orange-300 text-xl leading-4 p-2 outline-none border border-orange-900"
          onClick={addIngredientHandler}
        >
          +
        </button>
      </div>
    </>
  )
}

export default IngredientInput

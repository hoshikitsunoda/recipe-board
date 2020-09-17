import React from 'react'

const IngredientInput = () => {
  return (
    <div className="flex justify-between space-x-2 mb-2">
      <input
        className="appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="ingredients"
      />
      <input
        className="appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        name="quantity"
      />
      <select
        className="border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="unit"
        id="unit"
      >
        <option value="lb">lb</option>
        <option value="oz">oz</option>
        <option value="cup">cup</option>
        <option value="tbsp">tbsp</option>
        <option value="tsp">tsp</option>
        <option value="ml">ml</option>
        <option value="inch">inch</option>
      </select>
    </div>
  )
}

export default IngredientInput

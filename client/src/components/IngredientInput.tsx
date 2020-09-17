import React from 'react'

const units = ['lb', 'oz', 'cup', 'tbsp', 'tsp', 'ml', 'inch']

const IngredientInput: React.FC = () => {
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
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  )
}

export default IngredientInput

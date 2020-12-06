import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { RECIPES_QUERY } from '../../queries/queries'
import { IRecipeList } from '../../types'
import { GoBackButton } from '../shared/Button'

const RecipeDetail = () => {
  let { id }: any = useParams()
  const { loading, error, data = {} as IRecipeList } = useQuery<IRecipeList>(
    RECIPES_QUERY
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipeDataList = [...data.recipes]

  const recipeItem = recipeDataList.filter((recipe) => recipe.id === id)
  const { recipe, ingredients, instructions } = recipeItem[0]
  return (
    <div className="w-full max-w-6xl my-20 mx-auto p-16 bg-orange-100 shadow-solidPink">
      <div className="h-full p-12 border-2 flex flex-col relative">
        <div className="inline-block mb-12">
          <h1 className="font-mono text-gray-800 text-4xl font-bold">
            {recipe}
          </h1>
          <hr className="h-2 bg-pink -mt-4 pr-10" />
        </div>
        <h3 className="font-mono text-gray-800 text-xl">Ingredients:</h3>
        <ul className="list-disc list-inside mb-12">
          {ingredients?.map((ing) => (
            <li key={ing.ingredient} className="text-lg pl-4 my-2">
              {ing.ingredient}: {ing.quantity} {ing.unit}
            </li>
          ))}
        </ul>
        <h3 className="font-mono text-gray-800 text-xl pb-4">Instructions:</h3>
        <p className="text-lg leading-relaxed tracking-wide">{instructions}</p>
        <GoBackButton>Back to list</GoBackButton>
      </div>
    </div>
  )
}

export default RecipeDetail

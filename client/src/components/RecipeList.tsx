import React from 'react'
import { useQuery } from '@apollo/client'
import RecipeItem from './RecipeItem'
import { IRecipe, IRecipeList } from '../types/types'
import { RECIPES_QUERY } from '../queries/queries'

const RecipeList: React.FC = () => {
  const { loading, error, data = {} as IRecipeList } = useQuery<IRecipeList>(
    RECIPES_QUERY
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipeDataList = [...data.recipes]

  const recipeItem = recipeDataList
    .reverse()
    .map((props: IRecipe) => <RecipeItem key={props.id} {...props} />)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-6 lg:mx-auto my-0">
      {recipeItem}
    </div>
  )
}

export default RecipeList

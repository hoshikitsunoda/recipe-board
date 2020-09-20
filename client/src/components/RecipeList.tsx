import React from 'react'
import { gql, useQuery } from '@apollo/client'
import RecipeItem from './RecipeItem'
import { IRecipe, IRecipeList } from '../types/types'

const RECIPES_QUERY = gql`
  query GetRecipes {
    recipes {
      id
      recipe
      ingredients {
        ingredient
        quantity
        unit
      }
      instructions
    }
  }
`

const RecipeList: React.FC = (): any => {
  const { loading, error, data = {} as IRecipeList } = useQuery<IRecipeList>(
    RECIPES_QUERY
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipeItem = data.recipes.map(({ id, ...props }: IRecipe) => (
    <RecipeItem key={id} {...props} />
  ))

  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center space-y-6 lg:space-y-0 lg:space-x-6 max-w-6xl mx-auto my-0">
      {recipeItem}
    </div>
  )
}

export default RecipeList

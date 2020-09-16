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
  const { loading, error, data } = useQuery<IRecipeList>(RECIPES_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipeItem = data?.recipes.map(({ id, ...props }: IRecipe) => (
    <RecipeItem key={id} {...props} />
  ))

  return recipeItem
}

export default RecipeList

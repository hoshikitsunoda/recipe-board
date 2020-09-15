import React from 'react'
import { gql, useQuery } from '@apollo/client'
import RecipeItem from './RecipeItem'

const RECIPE_QUERY = gql`
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

const RecipeList = () => {
  const { loading, error, data } = useQuery(RECIPE_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipeItem = data.recipes.map(({ id, ...props }: any) => (
    <RecipeItem key={id} {...props} />
  ))

  return recipeItem
}

export default RecipeList

import { gql } from '@apollo/client'

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $recipe: String!
    $ingredients: [IngredientInput]
    $instructions: String!
  ) {
    addRecipe(
      recipe: $recipe
      ingredients: $ingredients
      instructions: $instructions
    ) {
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

export const REMOVE_RECIPE = gql`
  mutation remove($id: String!) {
    removeRecipe(id: $id) {
      id
      recipe
    }
  }
`

export const RECIPES_QUERY = gql`
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

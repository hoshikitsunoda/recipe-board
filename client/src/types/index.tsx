export interface IIngredient {
  ingredient: string
  quantity: number
  unit: string
}

export interface IRecipe {
  id?: string
  recipe: string
  ingredients?: IIngredient[]
  instructions: string
}

export interface IRecipeList {
  recipes: IRecipe[]
}

export interface AddRecipesProps {
  ingredientsHandler: (name: string, value: string) => void
  recipeIngredients: IIngredient[]
  recipeIngredientsHandler: () => void
  removeIngredientsHandler: (name: string) => void
  ingredient: string
  quantity: number
  unit: string
  units: string[]
}

interface ITarget {
  name: string
  value: string
}

export interface IEventTarget {
  target: ITarget
}

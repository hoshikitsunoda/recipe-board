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

export interface IngInputProps {
  ingredientsHandler: (name: string, value: string) => void
  recipeIngredients: IIngredient[]
  recipeIngredientsHandler: () => void
  removeIngredientsHandler: (name: string) => void
  resetIngredients: () => void
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

export interface AddRecipeProps extends IngInputProps {
  setRecipeHandler: (name: string, value: string) => void
  resetRecipeDetail: () => void
  recipe: string
  instructions: string
  recipeData: IRecipe
}

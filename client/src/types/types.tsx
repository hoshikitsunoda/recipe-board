export interface IIngredient {
  ingredient: string
  quantity: number
  unit: string
}

export interface IRecipe {
  id?: string
  recipe: string
  ingredients: IIngredient[]
  instructions: string
}

export interface IRecipeList {
  recipes: IRecipe[]
}

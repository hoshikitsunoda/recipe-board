import mongoose from 'mongoose'

export interface IIngredients {
  ingredient: string
  quantity: number
  unit: string
}

export interface IRecipe extends mongoose.Document {
  recipe: string
  ingredients: IIngredients[]
  instructions: number
}

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  recipe: { type: String },
  ingredients: { type: Array },
  instructions: { type: String },
})

export default mongoose.model<IRecipe>('Recipe', recipeSchema)

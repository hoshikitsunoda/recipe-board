import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  recipe: { type: String },
  ingredients: { type: Array },
  instructions: { type: String },
})

export default mongoose.model('Recipe', recipeSchema)

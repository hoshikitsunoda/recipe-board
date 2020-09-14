import express from 'express'
import { Application } from 'express'
import { graphqlHTTP } from 'express-graphql'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Recipe from './models/recipe'

const app: Application = express()
dotenv.config()

const PORT: number = 8000
const URL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@recipe-board.lel7a.mongodb.net/recipe-board?retryWrites=true&w=majority`

const IngredientType = new GraphQLObjectType({
  name: 'Ingredient',
  fields: () => ({
    ingredient: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString },
  }),
})

const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    id: { type: GraphQLID },
    recipe: { type: GraphQLString },
    ingredients: { type: new GraphQLList(IngredientType) },
    instructions: { type: GraphQLString },
  }),
})

const IngredientInputType = new GraphQLInputObjectType({
  name: 'IngredientInput',
  fields: {
    ingredient: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    unit: { type: new GraphQLNonNull(GraphQLString) },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    recipe: {
      type: new GraphQLList(RecipeType),
      args: { id: { type: GraphQLID } },
      resolve: () => {
        return Recipe.find({})
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRecipe: {
      type: RecipeType,
      args: {
        recipe: { type: new GraphQLNonNull(GraphQLString) },
        ingredients: { type: new GraphQLList(IngredientInputType) },
        instructions: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        let recipe = new Recipe({
          recipe: args.recipe,
          ingredients: args.ingredients,
          instructions: args.instructions,
        })
        return recipe.save()
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

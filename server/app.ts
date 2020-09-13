import express from 'express'
import { Application } from 'express'
import { graphqlHTTP } from 'express-graphql'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  // GraphQLID,
  GraphQLList,
  GraphQLFloat,
} from 'graphql'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app: Application = express()
dotenv.config()

const PORT: number = 8000
const URL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@recipe-board.lel7a.mongodb.net/recipe-board?retryWrites=true&w=majority`

const recipeList = [
  {
    id: '1',
    recipe: 'Meatball',
    ingredients: [{ ingredient: 'meat', quantity: 2, unit: 'lb' }],
  },
  {
    id: '2',
    recipe: 'Risotto',
    ingredients: [{ ingredient: 'mushroom', quantity: 8, unit: 'oz' }],
  },
  {
    id: '3',
    recipe: 'Grilled Asparagus',
    ingredients: [{ ingredient: 'asparagus', quantity: 1, unit: 'lb' }],
  },
  {
    id: '4',
    recipe: 'Mac & Cheese',
    ingredients: [{ ingredient: 'cheese', quantity: 1, unit: 'cup' }],
  },
]

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
    id: { type: GraphQLString },
    recipe: { type: GraphQLString },
    ingredients: { type: new GraphQLList(IngredientType) },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    recipe: {
      type: new GraphQLList(RecipeType),
      args: { id: { type: GraphQLString } },
      resolve: () => {
        return recipeList.filter((item) => item.id === '4')
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
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

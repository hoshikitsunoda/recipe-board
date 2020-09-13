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
// const _ = require('lodash')

const app: Application = express()

const PORT: number = 8000

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
      resolve() {
        return recipeList
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

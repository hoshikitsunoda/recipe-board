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
import Recipe from '../models/recipe'

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
    recipes: {
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

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})

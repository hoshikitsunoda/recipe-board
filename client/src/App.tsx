import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import RecipeList from './components/RecipeList'
import AddRecipe from './components/AddRecipe'

const URI: string = `http://localhost:8000/graphql`

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="pb-16">
        <header className="text-center py-6 mb-8 lg:mb-16 bg-yellow-900 shadow-lg">
          <h1 className="text-3xl font-bold font-mono text-gray-100 tracking-wider">
            Recipe Board
          </h1>
        </header>
        <RecipeList />
        <AddRecipe />
      </div>
    </ApolloProvider>
  )
}

export default App

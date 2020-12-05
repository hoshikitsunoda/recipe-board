import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import RecipeListView from './components/RecipeListView'

const URI: string = `http://localhost:8000/graphql`

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen lg:flex">
        <header className="text-center py-6 mb-8 lg:mb-0 bg-yellow-900 shadow-lg lg:w-2/12">
          <h1 className="text-3xl font-bold font-mono text-gray-100 tracking-wider">
            Recipe Board
          </h1>
        </header>
        <RecipeListView />
      </div>
    </ApolloProvider>
  )
}

export default App

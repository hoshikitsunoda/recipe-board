import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import RecipeList from './components/RecipeList'

const URI = `http://localhost:8000/graphql`

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Client Side</h2>
        <RecipeList />
      </div>
    </ApolloProvider>
  )
}

export default App

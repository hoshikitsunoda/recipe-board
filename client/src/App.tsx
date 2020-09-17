import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import RecipeList from './components/RecipeList'

const URI: string = `http://localhost:8000/graphql`

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <RecipeList />
      </div>
    </ApolloProvider>
  )
}

export default App

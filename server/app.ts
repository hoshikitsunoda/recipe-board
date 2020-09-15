import express from 'express'
import { Application } from 'express'
import { graphqlHTTP } from 'express-graphql'

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { schema } from './schema/schema'

const app: Application = express()
dotenv.config()

const PORT: number = 8000
const URL: string = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@recipe-board.lel7a.mongodb.net/recipe-board?retryWrites=true&w=majority`

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

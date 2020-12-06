import React from 'react'
import { useParams } from 'react-router-dom'

const RecipeDetail = () => {
  let { id }: any = useParams()
  return <div>{id}</div>
}

export default RecipeDetail

import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  children: string
  id?: string
  red?: boolean
  onClick?: () => {}
}

export const Button = ({ children, onClick, id, red }: IProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`${
        red
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-orange-500 hover:bg-orange-700'
      } text-white font-mono font-bold tracking-wider py-2 px-4 focus:outline-none focus:shadow-outline`}
    >
      {children}
    </button>
  )
}

export const LinkButton = ({ children, onClick, id }: IProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-700 text-white font-mono font-bold tracking-wider py-2 px-4 focus:outline-none focus:shadow-outline"
    >
      <Link
        to={{
          pathname: '/detail/',
          search: `?id=${id}`,
        }}
      >
        {children}
      </Link>
    </button>
  )
}

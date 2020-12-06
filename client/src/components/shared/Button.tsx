import React from 'react'
import { Link, NavLink } from 'react-router-dom'

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
      } text-white font-mono font-bold tracking-wider py-2 px-4 focus:outline-none focus:shadow-outline w-full`}
    >
      {children}
    </button>
  )
}

export const LinkButton = ({ children, onClick, id }: IProps) => {
  return (
    <Link
      to={{
        pathname: `/detail/${id}`,
      }}
    >
      <button
        id={id}
        onClick={onClick}
        className="bg-orange-500 hover:bg-orange-700 text-white font-mono font-bold tracking-wider py-2 px-4 focus:outline-none focus:shadow-outline w-full"
      >
        {children}
      </button>
    </Link>
  )
}

export const GoBackButton = ({ children }: IProps) => {
  return (
    <NavLink
      to={{
        pathname: `/`,
      }}
    >
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-mono font-bold tracking-wider py-2 px-4 focus:outline-none focus:shadow-outline w-full">
        {children}
      </button>
    </NavLink>
  )
}

import React from 'react'

interface IProps {
  children: string
  onClick?: () => {}
}

export const Button = ({ children, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-700 text-white font-mono font-bold tracking-wider py-2 px-4 focus:outline-none focus:shadow-outline"
    >
      {children}
    </button>
  )
}

import React from 'react'

const Header = ({title, description}) => {
  return (
    <div className='flex flex-col'>
      <h2 className='text-lg capitalize text-black'>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Header

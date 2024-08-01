import React from 'react'

const Card = ({children,rounded="sm",className=""}) => {
  return (
    <div className={`w-100 rounded-${rounded} bg-white p-4 shadow-sm ${className}`}>
        <div>
            {children}
        </div>
    </div>
  )
}

export default Card

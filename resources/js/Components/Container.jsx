import React from 'react'

const Container = ({ children, className }) => {
    return (
        <div className={`max-w-7xl py-10 mx-auto sm:px-6 px-3 lg:px-8 ${className}`}>
            {children}
        </div>
    )
}

export default Container

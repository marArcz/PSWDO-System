import React from 'react'

const Button = ({ variant = "filled" || "outlined", bg = "primary", color = "white", children, className, ...props }) => {

    const filled = `bg-${bg} text-${color}`;
    const outlined = `border-${bg} border border-solid text-${bg}`;

    return (
        <button className={` rounded-[5px] p-3 ${variant == 'filled' ? filled : outlined} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
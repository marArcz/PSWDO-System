import React from 'react'

const TextButton = ({ variant = "primary", text = "Button", allCaps = true, className, children, ...props }) => (
    <button className={`btn text-btn text-btn-${variant} ${allCaps ? 'text-uppercase' : ''} fw-bold ${className}`} {...props}>
        {
            children ?? (
                <span className="text-sm">{text}</span>
            )
        }
    </button>
)

export default TextButton

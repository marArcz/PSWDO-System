import React from 'react'

const TextProfilePic = ({ bg = 'primary', text = 'OS', fluid = false, className, size = "md" }) => {
    return (
        <div className={`text-profile-pic bg-${bg} ${fluid ? 'fluid' : ''} ${className} ${size}`}>{text}</div>
    )
}

export default TextProfilePic

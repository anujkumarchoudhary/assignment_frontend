import React from 'react'

const CommonHeading = ({ textSize = "text-3xl", title,description }) => {

    return (
        <div>
            <h2 className={`${textSize} font-bold text-center`}>{title}</h2>
            <p className='my-6 text-md text-center'>{description}</p>
        </div>
    )
}

export default CommonHeading

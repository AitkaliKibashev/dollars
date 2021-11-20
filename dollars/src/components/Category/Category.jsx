import React from 'react'
import './Category.css'

const Category = ({id, title, onClick}) => {
    return (
        <div className="category" onClick={() => onClick(id)}>
            {title}
        </div>
    )
}

export default Category
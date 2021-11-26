import React from 'react'
import './Category.css'

const Category = ({id, title, onClick, categoryId}) => {
    return (
        <div className={"category" + (categoryId === id ? ' active': '')} onClick={() => onClick(id)}>
            {title}
        </div>
    )
}

export default Category
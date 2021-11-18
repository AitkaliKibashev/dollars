import React from 'react'
import trashIcon from '../../assets/images/trash-icon.png'

const DeleteBtn = ({clickHandler}) => {
    return (
        <div className="delete-post-btn" onClick={() => clickHandler()} >
            <img src={trashIcon} alt="trash icon"/>
        </div>
    )
}

export default DeleteBtn
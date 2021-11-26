import React from 'react'
import logoutIcon from '../../assets/images/logout.png'
import './Logout.css'

const Logout = ({onClick}) => {
    return (
        <div className="logout-wrapper" onClick={() => onClick()}>
            <div className="logout-img">
                <img src={logoutIcon} alt="logout"/>
            </div>
        </div>
    )
}

export default Logout
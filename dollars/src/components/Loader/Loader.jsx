import React from 'react'
import loadingGif from '../../assets/images/loading.gif'
import './Loader.css'

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <img src={loadingGif} alt="loader"/>
        </div>
    )
}

export default Loader
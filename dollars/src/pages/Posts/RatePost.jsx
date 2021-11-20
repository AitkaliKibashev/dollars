import React from 'react'

const RatePost = ({onClick, rate, color}) => {
    return (
        <div className={`rate-post ${color}`} onClick={() => onClick(rate)}>
            <p>+{rate}</p>
        </div>
    )
}

export default RatePost
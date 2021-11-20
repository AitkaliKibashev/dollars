import React, {useState} from 'react'
import dollarsLogo from '../../assets/images/dollars_logo.jpg'
import './Index.css'
import {connect} from "react-redux"
import {
    setCanEnterAC,
} from "../../redux/reducers/authReducer"

const Index = ({enterPassword, setCanEnter}) => {
    const [error, setError] = useState('')

    const handleForm = (e) => {
        e.preventDefault()
        if(e.target[0].value === enterPassword) {
            setCanEnter(true)
            setError('')
        } else {
            setError('Неправильный пароль')
        }
    }
    return (
        <div className="index-main">
            <div className="index-image-wrapper">
                <img src={dollarsLogo} alt="dollars"/>
            </div>
            {error && <div className="error-p">{error}</div>}

            <form className="enter-form" onSubmit={e => handleForm(e)}>
                <div className="password-input">
                    <label className="password-label" htmlFor="pw">PASSWORD:</label>
                    <input type="password"
                           className="enter-password"
                           id="pw"
                    />
                </div>

                <button className="enter-btn">ENTER</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    enterPassword: state.auth.enterPassword
})

const mapDispatchToProps = (dispatch) => ({
    setCanEnter: (payload) => dispatch(setCanEnterAC(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(Index)
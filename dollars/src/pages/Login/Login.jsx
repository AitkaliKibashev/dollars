import React, {useState} from 'react'
import Header from "../../components/Header/Header"
import './Login.css'
import {connect} from "react-redux"
import EmailInput
    from "../../components/common/EmailInput"
import LoginInput
    from "../../components/common/LoginInput"
import PasswordInput
    from "../../components/common/PasswordInput"
import {
    loginUser,
    registerUser
} from "../../redux/reducers/authReducer"
import { useHistory } from 'react-router-dom'

const Login = ({loginError, loginUser, registerUser}) => {
    const [isValid, setIsValid] = useState(false)
    const [window, setWindow] = useState('login')
    const [isSubmit, setIsSubmit] = useState(false)
    const history = useHistory()

    const toggleWindow = () => {
        if(window === 'login') setWindow('register')
        else setWindow('login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const login = e.target[0].value
        const password = e.target[1].value
        const email = e.target[2]?.value

        const data = {
            username: login,
            password: password
        }

        if (window === 'login') {
            const res = await loginUser(data)

            if(res) {
                setIsSubmit(true)
                history.push('/home')
            }
        } else {
            const res = await registerUser({
                ...data,
                email: email
            })

            if(res) {
                setIsSubmit(true)
                setWindow('login')
            }
        }
    }

    return (
        <main className="main">
            <div className="container">
                <Header />
                <div className="welcome_login">
                    <h1>{window === 'register' ? 'Register' : 'Login'}</h1>
                </div>
                {loginError && <p className="error-message">{loginError}</p>}
                <form className="auth-form" onSubmit={e => handleSubmit(e)}>
                    <LoginInput setIsValid={setIsValid} isSubmit={isSubmit}/>
                    <PasswordInput setIsValid={setIsValid} isSubmit={isSubmit}/>
                    {window === 'register' && <EmailInput setIsValid={setIsValid} isSubmit={isSubmit}/>}


                    <button disabled={!isValid} className="common-btn">{window === 'register' ? 'Register' : 'Login'}</button>
                </form>
                <p className="helper_text">{window === 'register' ? 'Есть аккаунт?' : 'Нет аккаунта?'}</p>
                <button className="switch-btn" onClick={() => toggleWindow()}>{window === 'register' ? 'Войти' : 'Стань участником общества'}</button>
            </div>
        </main>
    )
}

const mapStateToProps = (state) => ({
    loginError: state.auth.error
})


export default connect(mapStateToProps, {loginUser, registerUser})(Login)
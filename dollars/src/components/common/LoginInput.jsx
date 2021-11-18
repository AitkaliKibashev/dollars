import React, {useEffect, useState} from 'react'

const LoginInput = ({setIsValid, isSubmit}) => {
    const [login, setLogin] = useState('')
    const [dirty, setDirty] = useState(false)
    const [error, setError] = useState( 'Поле не может быть пустым')

    useEffect(() => {
        if(error) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }, [error])


    useEffect(() => {
        if(isSubmit) {
            setLogin('')
        }
    }, [isSubmit])


    const handleBlur = (e) => {
        setDirty(true)
    }

    const loginHandler = (e) => {
        const maxLength = 30
        const minLength = 3
        const value = e.target.value

        setLogin(value)

        if (value.length > maxLength || value.length < minLength) {
            setError(`Логин не может быть меньше ${minLength} символов и больше ${maxLength} символов`)
        } else {
            setError( '')
        }
    }

    return (
        <>
            {(dirty && error) && <div className="error-p">{error}</div>}
            <div className="field-wrapper">
                <input onChange={(e) => loginHandler(e)} value={login}  onBlur={(e) => handleBlur(e)} className="common-input" name="login" type="text" placeholder="Логин"/>
            </div>
        </>
    )
}

export default LoginInput
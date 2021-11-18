import React, {useEffect, useState} from 'react'

const PasswordInput = ({setIsValid, isSubmit}) => {
    const [password, setPassword] = useState('')
    const [dirty, setDirty] = useState(false)
    const [error, setError] = useState('Поле не может быть пустым')


    useEffect(() => {
        if(error) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }, [error])

    useEffect(() => {
        if(isSubmit) {
            setPassword('')
        }
    }, [isSubmit])


    const handleBlur = (e) => {
        setDirty(true)
    }

    const passwordHandler = (e) => {
        const minLength = 8
        const maxLength = 30

        const value = e.target.value

        setPassword(value)

        if (value.length < minLength || value.length > maxLength) {
            setError(`Пароль не может быть меньше ${minLength} символов и больше ${maxLength} символов`)

            if(!value) {
                setError('Поле не может быть пустым')
            }
        }
        else {
            setError( '')
        }
    }

    return (
        <>
            {(dirty && error) && <div className="error-p">{error}</div>}
            <div className="field-wrapper">
                <input onChange={(e) => passwordHandler(e)} value={password} onBlur={(e) => handleBlur(e)} className="common-input" name="password" type="password" placeholder="Пароль"/>
            </div>
        </>
    )
}

export default PasswordInput
import React, {useEffect, useState} from 'react'

const EmailInput = ({setIsValid, isSubmit}) => {
    const [email, setEmail] = useState('')
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
            setEmail('')
        }
    }, [isSubmit])

    const handleBlur = (e) => {
        setDirty(true)
    }

    const emailHandler = (e) => {
        const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/

        const value = e.target.value

        setEmail(value)

        if (!re.test(String(e.target.value).toLowerCase())) {
            setError(`Некорректный email`)

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
                <input onChange={(e) => emailHandler(e)} value={email} onBlur={(e) => handleBlur(e)} className="common-input" name="email" type="email" placeholder="Email"/>
            </div>
        </>
    )
}

export default EmailInput
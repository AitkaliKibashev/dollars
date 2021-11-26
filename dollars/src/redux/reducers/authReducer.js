import {
    userAPI
} from "../../API/API"

const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH'
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
const SET_CAN_ENTER = 'SET_CAN_ENTER'
const SET_USER_REPUTATION = 'SET_USER_REPUTATION'


const initialState = {
    canEnter: false,
    isAuth: false,
    enterPassword: 'babbooka',
    user: {},
    error: null
}

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.data
            }
        case SET_CAN_ENTER:
            return {
                ...state,
                canEnter: action.payload
            }
        case REMOVE_USER:
            return {
                ...state,
                user: {}
            }
        case SET_AUTH_ERROR:
            return  {
                ...state,
                error: action.error
            }
        case SET_USER_REPUTATION:
            return {
                ...state,
                user: {...state.user, ...action.payload}
            }
        default:
            return state
    }
}

export const setCanEnterAC = (payload) => ({type: SET_CAN_ENTER, payload})
const setUserAC = (data) => ({type: SET_USER, data})
const removeUserAC = () => ({type: REMOVE_USER})
const setErrorAC = (error) => ({type: SET_AUTH_ERROR, error})
const toggleIsAuthAC = (payload) => ({type: TOGGLE_IS_AUTH, payload})
const setUserReputationAC = (payload) => ({type: SET_USER_REPUTATION, payload})


export const loginUser = (data) => async (dispatch) => {
    try {
        const res = await userAPI.login(data)

        if (res.status === 200) {
            const item = {
                ...res.data
            }
            localStorage.setItem('auth', JSON.stringify(item))

            dispatch(toggleIsAuthAC(true))
            dispatch(setUserAC(res.data.user))
            dispatch(setErrorAC(null))
            return true
        }

    } catch (e) {
        dispatch(setErrorAC('Неверный логин или пароль'))
    }

}

export const registerUser = (data) => async (dispatch) => {
    try {
        const user = await userAPI.register(data)
        if (user.status === 200) {
            return true
        }

        dispatch(setErrorAC(null))

    } catch (e) {
        dispatch(setErrorAC('Email или Логин с такими же данными уже существует'))
    }

}

export const checkIsAuth = () => async (dispatch) => {
    const itemStr = localStorage.getItem('auth')

    if (!itemStr) {
        dispatch(toggleIsAuthAC(false))
        return null
    }

    const item = JSON.parse(itemStr)
    const expiry = new Date(item.expiry)
    const now = new Date()

    if (now.getTime() > expiry.getTime()) {
        localStorage.removeItem('auth')
        dispatch(toggleIsAuthAC(false))
        return null
    }
    dispatch(toggleIsAuthAC(true))
    dispatch(setUserAC(item.user))
}

export const logoutUser = () => async (dispatch) => {
    try {
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await userAPI.logout(token)

        if(res.status === 204) {
            localStorage.removeItem('auth')
            dispatch(toggleIsAuthAC(false))
            dispatch(removeUserAC())
            dispatch(setErrorAC(null))
        }
    } catch (e) {
        dispatch(setErrorAC('Произошла ошибка при выходе'))
    }
}

export const addReputation = (data) => async (dispatch) => {
    try {
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await userAPI.addReputation(data, token)
        if(res.status === 200) {
            console.log(res)
            console.log(data)
            dispatch(setErrorAC(null))
        }
    } catch (e) {
        dispatch(setErrorAC('Произошла ошибка при добавлении репутации'))
    }

}

export const fetchUserReputation = (userId) => async (dispatch) => {
    try {
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await userAPI.fetchReputation(userId, token)
        if(res.status === 200) {
            dispatch(setUserReputationAC(res.data))
            dispatch(setErrorAC(null))
        }
    } catch (e) {
        console.log(e)
    }
}
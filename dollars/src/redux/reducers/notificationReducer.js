import {notificationAPI} from "../../API/API"

const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'
const SET_NOTIFICATIONS_ERROR = 'SET_NOTIFICATIONS_ERROR'
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION'

const initialState = {
    notifications: [

    ],
    error: null,
}

export const notificationsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: [...action.payload]
            }
        case SET_NOTIFICATIONS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.map(n => n.id === action.payload.id ? action.payload : n)
            }
        default:
            return state
    }
}


const setNotificationsAC = (payload) => ({type: SET_NOTIFICATIONS, payload})
const updateNotificationAC = (payload) => ({type: UPDATE_NOTIFICATION, payload})
const setErrorAC = (payload) => ({type: SET_NOTIFICATIONS_ERROR, payload})


export const fetchNotifications = (userId) => async (dispatch) => {
    try {
        const res = await notificationAPI.fetchNotifications(userId)
        dispatch(setNotificationsAC(res.data))
        dispatch(setErrorAC(null))
    } catch (e) {
        setErrorAC('Произшола ошибка при получении уведомлении')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const sendNotification = (data) => async (dispatch) => {
    try {
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await notificationAPI.sendNotification(data, token)
        dispatch(setErrorAC(null))
    } catch (e) {
        setErrorAC('Произшола ошибка при отправке уведомления')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const updateNotification = (data, notificationId) => async (dispatch) => {
    try {
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await notificationAPI.updateNotification(data, notificationId, token)
        dispatch(updateNotificationAC(res.data))
        dispatch(setErrorAC(null))
    } catch (e) {
        console.log(e)
    }
}
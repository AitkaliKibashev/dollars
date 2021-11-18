import {chatAPI} from "../../API/API"

const SET_MESSAGE = 'SET_MESSAGE'
const INIT_MESSAGES = 'INIT_MESSAGES'

const initialState = {
    messages: [

    ]
}

export const messagesReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case INIT_MESSAGES:
            return {
                ...state,
                messages: [...action.payload]
            }
        default:
            return state
    }
}


const setMessageAC = (payload) => ({type: SET_MESSAGE, payload})
const initMessagesAC = (payload) => ({type: INIT_MESSAGES, payload})

export const setMessage = (payload) => (dispatch) => {
    dispatch(setMessageAC(payload))
}

export const initializeMessages = () => async (dispatch) => {
    const res = await chatAPI.getMessages()

    dispatch(initMessagesAC(res.data))
}

import {
    commentsAPI,
    userAPI
} from "../../API/API"

const SET_COMMENTS = 'SET_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const SET_COMMENT_ERROR = 'SET_COMMENT_ERROR'
const SET_IS_COMMENTS_LOADING = 'SET_IS_COMMENTS_LOADING'
const CLEAR_COMMENTS = 'CLEAR_COMMENTS'

const initialState = {
    comments: [

    ],
    error: null,
    isLoading: false
}

export const commentsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: [...state.comments, ...action.payload]
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(c => c.id !== action.commentId)
            }
        case SET_COMMENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_IS_COMMENTS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case CLEAR_COMMENTS:
            return {
                ...state,
                comments: []
            }
        default:
            return state
    }
}


const setCommentsAC = (payload) => ({type: SET_COMMENTS, payload})
const addCommentAC = (payload) => ({type: ADD_COMMENT, payload})
const deleteCommentAC = (commentId) => ({type: DELETE_COMMENT, commentId})
const setErrorAC = (payload) => ({type: SET_COMMENT_ERROR, payload})
const setIsLoadingAC = (payload) => ({type: SET_IS_COMMENTS_LOADING, payload})
const clearCommentsAC = () => ({type: CLEAR_COMMENTS})

export const fetchComments = (postId) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true))
        const res = await commentsAPI.fetchPostComments(postId)
        const comments = []
        if(res.status === 200) {
            for(let i=0; i < res.data.length; i++) {
                const user = await userAPI.getUser(res.data[i].user)
                if(user.data) {
                    comments.push({...res.data[i], user: {...user.data}})
                }
            }
            dispatch(setCommentsAC(comments))
            dispatch(setErrorAC(null))
            dispatch(setIsLoadingAC(false))
        }
    } catch (e) {
        setErrorAC('Произшола ошибка')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const addComment = (data) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true))
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await commentsAPI.addCommentToPost(data, token)

        if(res.status === 200) {
            const user = await userAPI.getUser(res.data.user)

            dispatch(addCommentAC({...res.data, user: user.data}))
            dispatch(setErrorAC(null))
            dispatch(setIsLoadingAC(false))
        }
    } catch (e) {
        setErrorAC('Произшола ошибка')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const deleteComment = (id) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true))
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await commentsAPI.deleteCommentFromPost(id, token)

        if(res.status === 204) {
            dispatch(deleteCommentAC(id))
            dispatch(setErrorAC(null))
            dispatch(setIsLoadingAC(false))
        }
    } catch (e) {
        setErrorAC('Произшола ошибка')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const clearComments = () => async (dispatch) => {
    dispatch(clearCommentsAC())
}
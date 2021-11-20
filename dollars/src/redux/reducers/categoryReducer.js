import {categoryAPI} from "../../API/API"

const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_CATEGORIES_ERROR = 'SET_CATEGORIES_ERROR'
const SET_IS_CATEGORIES_LOADING = 'SET_IS_CATEGORIES_LOADING'
const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES'

const initialState = {
    categories: [

    ],
    error: null,
    isLoading: false
}

export const categoriesReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...action.payload]
            }
        case SET_CATEGORIES_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_IS_CATEGORIES_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case CLEAR_CATEGORIES:
            return {
                ...state,
                categories: []
            }
        default:
            return state
    }
}


const setCategoriesAC = (payload) => ({type: SET_CATEGORIES, payload})
const setErrorAC = (payload) => ({type: SET_CATEGORIES_ERROR, payload})
const setIsLoadingAC = (payload) => ({type: SET_IS_CATEGORIES_LOADING, payload})
const clearCategoriesAC = () => ({type: CLEAR_CATEGORIES})

export const fetchCategories = () => async (dispatch) => {
    try {
        const res = await categoryAPI.fetchCategories()
        dispatch(setCategoriesAC(res.data))
        dispatch(setErrorAC(null))
        dispatch(setIsLoadingAC(false))

    } catch (e) {
        setErrorAC('Произшола ошибка при получении категории')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}


export const clearCategories = () => async (dispatch) => {
    dispatch(clearCategoriesAC())
}
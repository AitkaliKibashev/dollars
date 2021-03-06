import {commentsAPI, postAPI} from "../../API/API"

const SET_POSTS = 'SET_POSTS'
const CLEAR_POSTS = 'CLEAR_POSTS'
const ADD_POST = 'ADD_POST'
const ADD_RATING_TO_POST = 'ADD_RATING_TO_POST'
const SET_POSTS_ERROR = 'SET_POSTS_ERROR'
const SET_IS_POSTS_LOADING = 'SET_IS_POSTS_LOADING'
const DELETE_POST = 'DELETE_POST'
const SET_POST = 'SET_POST'
const SET_PAGES_NUMBER = 'SET_PAGES_NUMBER'

const initialState = {
    posts: [

    ],
    post: {

    },
    error: null,
    isLoading: false,
    pagesNumber: 1,
}

export const postsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: [...state.posts.filter(p => p.category === action.category), ...action.payload]
            }
        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case ADD_RATING_TO_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.payload.post ? {...p, ratings: [...p.ratings, action.payload]} : p)
            }
        case SET_POSTS_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_IS_POSTS_LOADING:
            return {
                ...state,
                isLoading: action.bool
            }
        case SET_POST:
            return {
                ...state,
                post: {...action.payload}
            }
        case SET_PAGES_NUMBER:
            return {
                ...state,
                pagesNumber: action.pages
            }
        default:
            return state
    }
}


const setPostsAC = (payload, category) => ({type: SET_POSTS, payload, category})
const addPostAC = (payload) => ({type: ADD_POST, payload})
const addRatingToPostAC = (payload) => ({type: ADD_RATING_TO_POST, payload})
const setErrorAC = (error) => ({type: SET_POSTS_ERROR, error})
const setIsLoadingAC = (bool) => ({type: SET_IS_POSTS_LOADING, bool})
const clearPostsAC = () => ({type: CLEAR_POSTS})
const deletePostAC = (postId) => ({type: DELETE_POST, postId})
const setPostAC = (payload) => ({type: SET_POST, payload})
const setPageNumberAC = (pages) => ({type: SET_PAGES_NUMBER, pages})

export const setPosts = (page, categoryId) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true))
        const res = await postAPI.getPosts(page, categoryId)

        const posts = []
        if(!res.data.error) {
            for(let i=0; i < res.data.posts.length; i++) {
                const postRatings = await postAPI.getPostRatings(res.data.posts[i].id)
                const postComments = await commentsAPI.fetchPostComments(res.data.posts[i].id)

                if(postRatings.data) {
                    posts.push({...res.data.posts[i], ratings: [...postRatings.data], commentsLength: postComments.data.length},)
                }
            }
            dispatch(setPageNumberAC(res.data.pages))
            dispatch(setPostsAC(posts, categoryId))
            dispatch(setErrorAC(null))
        } else {
            clearPostsAC()
        }

        dispatch(setIsLoadingAC(false))

    } catch (e) {
        dispatch(setIsLoadingAC(false))
        setErrorAC('?????????????????? ????????????')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const fetchPost = (postId) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true))
        const res = await postAPI.getPost(postId)
        let post
        if(!res.data.error) {
            const postRatings = await postAPI.getPostRatings(postId)

            post = {...res.data, ratings: [...postRatings.data]}

            dispatch(setPostAC(post))
            dispatch(setErrorAC(null))
        }
        dispatch(setIsLoadingAC(false))
    } catch (e) {
        dispatch(setIsLoadingAC(false))
        setErrorAC('?????????????????? ????????????')
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const clearPosts = () => async (dispatch) => {
   dispatch(clearPostsAC())
}

export const addPost = (data) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true))
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await postAPI.addPost(data, token)

        dispatch(addPostAC({...res.data, ratings: [], commentsLength: 0}))
        dispatch(setErrorAC(null))
        dispatch(setIsLoadingAC(false))
    } catch (e) {
        dispatch(setIsLoadingAC(false))
        dispatch(setErrorAC('?????????????????? ???????????? ?????? ???????????????????? ??????????'))
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const deletePost = (postId) => async (dispatch) => {
    try {
        dispatch(setIsLoadingAC(true))
        const {token} = JSON.parse(localStorage.getItem('auth'))
        const res = await postAPI.deletePost(postId, token)

        if (res.status === 204) {
            dispatch(deletePostAC(postId))
            dispatch(setErrorAC(null))
        }
        dispatch(setIsLoadingAC(false))
    } catch (e) {
        dispatch(setErrorAC('?????????????????? ???????????? ?????? ???????????????? ??????????'))
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const addRatingToPost = (data) => async (dispatch) => {
    try {
        const {token} = JSON.parse(localStorage.getItem('auth'))
        dispatch(setIsLoadingAC(true))
        const res = await postAPI.addRating(data, token)
        if(res.data.error) {
            dispatch(setErrorAC(res.data.error))
            setTimeout(() => {
                dispatch(setErrorAC(''))
            }, 5000)
            dispatch(setIsLoadingAC(false))
        } else {
            dispatch(addRatingToPostAC(data))
            dispatch(setErrorAC(null))
            dispatch(setIsLoadingAC(false))
        }
    } catch (e) {
        dispatch(setErrorAC('?????????????????? ???????????? ?????? ???????????????????? ????????????????'))
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 5000)
    }
}

export const setError = (error) => (dispatch) => {
    dispatch(setErrorAC(error))
    setTimeout(() => {
        dispatch(setErrorAC(''))
    }, 5000)
}
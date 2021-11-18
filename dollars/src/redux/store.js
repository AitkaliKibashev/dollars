import {
    applyMiddleware,
    combineReducers,
    createStore
} from "redux"
import {authReducer} from "./reducers/authReducer"
import {messagesReducer} from "./reducers/messagesReducer"
import thunk from "redux-thunk"
import {postsReducer} from "./reducers/postsReducer"
import {commentsReducer} from "./reducers/commentReducer"

const reducers = combineReducers({
    auth: authReducer,
    messages: messagesReducer,
    posts: postsReducer,
    comments: commentsReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))
import Home from "./pages/Home"
import Index from "./pages/Index"
import Login from "./pages/Login"
import About from "./pages/About"
import Posts from "./pages/Posts/Posts"
import PostDetail from "./pages/Posts/PostDetail"

const INDEX_ROUTE = '/'
const HOME_ROUTE = '/home'
const LOGIN_ROUTE = '/login'
const ABOUT_ROUTE = '/about'
const POSTS_ROUTE = '/posts'
const POST_DETAIL_ROUTE = '/post/:id'

export const publicRoutes = [
    {
        path: INDEX_ROUTE,
        Component: Index
    },

]

export const privateRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: POSTS_ROUTE,
        Component: Posts
    },
    {
        path: POST_DETAIL_ROUTE,
        Component: PostDetail
    }
]

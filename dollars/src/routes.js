import Home from "./pages/Home/Home"
import Index from "./pages/Index/Index"
import Login from "./pages/Login/Login"
import About from "./pages/About/About"
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

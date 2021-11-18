import React, {useEffect} from 'react'
import './App.css'
import AppRouter from "./components/AppRouter"
import {
    HashRouter
} from "react-router-dom"
import {connect} from "react-redux"
import {checkIsAuth} from "./redux/reducers/authReducer"

const App = ({checkIsAuth}) => {

    useEffect(() => {
        checkIsAuth()
    }, [])

    return (
        <HashRouter>
            <AppRouter />
        </HashRouter>
    )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {checkIsAuth})(App)
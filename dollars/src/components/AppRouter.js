import React from 'react'
import {
    Redirect,
    Switch,
    Route
} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "../routes"
import {connect} from "react-redux"

const AppRouter = ({canEnter}) => {
    return canEnter ?
        <Switch>
            {privateRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact={false}>
                    <Component />
                </Route>
            )}
            <Redirect to={"/home"} />
        </Switch>
        :
        <Switch>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact={true}>
                    <Component />
                </Route>
            )}
            <Redirect to={"/"} />
        </Switch>
}


const mapStateToProps = (state) => ({
    canEnter: state.auth.canEnter
})

export default connect(mapStateToProps)(AppRouter)

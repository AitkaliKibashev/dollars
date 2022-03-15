import React, {useEffect} from 'react'
import './Header.css'
import dollarsLogo from '../../assets/images/dollars_logo.jpg'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {
    fetchUserReputation,
    logoutUser
} from "../../redux/reducers/authReducer"
import Notification
    from "../Notification/Notification"
import {fetchNotifications} from "../../redux/reducers/notificationReducer"
import Reputation from "../Reputation/Reputation"
import Logout from "../Logout/Logout"

const Header = ({isAuth, user, fetchUserReputation, fetchNotifications, logoutUser}) => {

    useEffect(() => {
        if(isAuth) {
            fetchUserReputation(user.id)
            fetchNotifications(user.id)
        }

    }, [isAuth])

    return (
        <header className="header">
            <div className="logo">
                <img src={dollarsLogo} alt="dollars"/>
            </div>
            <ul className="link-list">
                <li className="nav-link" >
                    <NavLink to='/home'>
                        Home
                    </NavLink>
                </li>
                <li className="nav-link" >
                    <NavLink to='/about'>
                        About
                    </NavLink>
                </li>
                <li className="nav-link" >
                    <NavLink to='/posts'>
                        Posts
                    </NavLink>
                </li>
                <li className="nav-link" >
                    <NavLink to='/members'>
                        Members
                    </NavLink>
                </li>
                <li className="nav-link" >
                    {isAuth ? user.username:
                        <NavLink to='/login'>
                            Login
                        </NavLink>}
                </li>
            </ul>
            {isAuth && <>
                <Logout onClick={logoutUser}/>
                <Notification />
                <Reputation reputation={user.reputation} />
            </>}
        </header>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
})

export default connect(mapStateToProps, {fetchUserReputation, fetchNotifications, logoutUser})(Header)
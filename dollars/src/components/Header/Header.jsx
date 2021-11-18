import React, {useEffect} from 'react'
import './Header.css'
import dollarsLogo from '../../assets/images/dollars_logo.jpg'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {fetchUserReputation} from "../../redux/reducers/authReducer"

const Header = ({isAuth, user, fetchUserReputation}) => {

    useEffect(() => {
        if(isAuth) fetchUserReputation(user.id)
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
                    {isAuth ? `Hello, ${user.username}`:
                        <NavLink to='/login'>
                            Login
                        </NavLink>}
                </li>
            </ul>
            {isAuth &&
                <div className="reputation-wrapper">
                    <div className="reputaion">
                        {user.reputation}
                    </div>
                </div>
            }
        </header>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
})

export default connect(mapStateToProps, {fetchUserReputation})(Header)
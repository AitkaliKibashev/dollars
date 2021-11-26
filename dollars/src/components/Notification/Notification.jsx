import React, {
    useEffect,
    useRef,
    useState
} from 'react'
import notificationIcon
    from "../../assets/images/notification-bell.png"
import './Notification.css'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {
    updateNotification
} from "../../redux/reducers/notificationReducer"

const Notification = ({notifications, updateNotification}) => {
    const [isActive, setIsActive] = useState(false)
    const [newNotifications, setNewNotifications] = useState([])

    useEffect(() => {
        if(notifications) {
            setNewNotifications(notifications.filter(n => !n.watched))
        }
    }, [notifications])


    useEffect(() => {
        if(isActive) {
            newNotifications.forEach(n => updateNotification({...n, watched: true}, n.id))
        }
    }, [isActive])



    return (
        <div className={isActive ? 'notification-wrapper active' : 'notification-wrapper'}>
            <div className="notifications">
                <div className="close" onClick={() => setIsActive(false)} />
                {!notifications.length && <p>Новых уведомлений нет</p>}
                {notifications.map(n =>
                    <div className="notification">
                        <NavLink to={n.comment ? `/post/${n.post}#${n.comment}` : `/post/${n.post}/`}>
                            {n.message}
                        </NavLink>
                    </div>
                )}
            </div>
            <div className="notification-icon" onClick={() => setIsActive(true)}>
                {newNotifications.length ?
                <div
                    className="notification-indicator">
                    <span>{newNotifications.length}</span>
                </div>: null
                }
                <img src={notificationIcon} alt="notification icon"/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    notifications: state.notifications.notifications
})

export default connect(mapStateToProps, {updateNotification})(Notification)
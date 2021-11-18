import React, {useState} from 'react'
import './Comment.css'
import DeleteBtn
    from "../common/DeleteBtn"
import {connect} from "react-redux"
import {deleteComment} from "../../redux/reducers/commentReducer"

const Comment = ({id, user, text, created_date, parentComment, authUser, deleteComment, setToReplyData}) => {
    const createdDate = new Date(created_date)

    return (
        <div className='comment-wrapper'>

            <div className="comment-header">
                <p className="comment-author">
                    {user.username} <span>{createdDate.toLocaleString()}</span>
                </p>
                {authUser.id === user.id && <DeleteBtn clickHandler={() => deleteComment(id)} />}
            </div>
            <div className="comment-body">
                {parentComment && <span>>>> {parentComment.user.username}</span>}
                {text}
            </div>
            <div className="comment_footer">
                {authUser && <button className="reply-btn" onClick={() => setToReplyData({commentId: id, username: user.username})}>Ответить</button>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
    authUser: state.auth.user,
})

export default connect(mapStateToProps, {deleteComment})(Comment)
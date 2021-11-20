import React, {useState} from 'react'
import './Comment.css'
import DeleteBtn
    from "../common/DeleteBtn"
import {connect} from "react-redux"
import {deleteComment} from "../../redux/reducers/commentReducer"

const Comment = ({id, user, text, created_date, authUser, deleteComment, setToReplyData, children}) => {
    const createdDate = new Date(created_date)

    return (
        <div className='comment-wrapper' id={id}>
            <div className="comment-header">
                <p className="comment-author">
                    {user.username} <span>{createdDate.toLocaleString()}</span>
                </p>
                {authUser.id === user.id && <DeleteBtn clickHandler={() => deleteComment(id)} />}
            </div>
            <div className="comment-body">
                {text}
            </div>
            <div className="comment_footer">
                {authUser && <button className="reply-btn" onClick={() => setToReplyData({commentId: id, user: user})}>Ответить</button>}
            </div>

            {children?.map(child =>
            <div className='comment-children'>
                <div className="comment-header">
                    <p className="comment-author">
                        {child.user.username} <span>{new Date(child.created_date).toLocaleString()}</span>
                    </p>
                    {authUser.id === child.user.id && <DeleteBtn clickHandler={() => deleteComment(child.id)} />}
                </div>
                <div className="comment-body">
                    {child.text}
                </div>
                <div className="comment_footer">
                    {authUser && <button className="reply-btn" onClick={() => setToReplyData({commentId: id, user: child.user})}>Ответить</button>}
                </div>
            </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) =>({
    authUser: state.auth.user,
})

export default connect(mapStateToProps, {deleteComment})(Comment)
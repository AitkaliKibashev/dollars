import React, {useEffect, useState} from 'react'
import Post from "./Post"
import Comment from "../../components/Comment/Comment"
import { useLocation } from "react-router-dom";
import Header
    from "../../components/Header/Header"
import {connect} from "react-redux"
import {fetchPost} from "../../redux/reducers/postsReducer"
import {
    addComment,
    clearComments,
    fetchComments
} from "../../redux/reducers/commentReducer"
import sendPng from "../../assets/images/send.png"
import Loader
    from "../../components/Loader/Loader"
import {sendNotification} from "../../redux/reducers/notificationReducer"

const PostDetail = ({fetchPost, post, user, fetchComments, comments, clearComments, error, addComment, isAuth, isPostsLoading, isCommentsLoading, sendNotification}) => {
    const location = useLocation()
    const [value, setValue] = useState('')
    const postId = location.pathname.split('/')[2]
    const [toReplyData, setToReplyData] = useState(null)
    const primaryComments = comments.filter(c => !c.parent)
    const newComments = primaryComments.map(nc => {
        return {...nc, children: comments.reverse().filter(c => c.parent === nc.id)}
    })

    useEffect(() => {
        fetchPost(postId)
        fetchComments(postId)

        return () => {
            clearComments()
        }
    }, [])

    useEffect(() => {
        if(toReplyData) {
            setValue(`${toReplyData.user.username}, `)
        }
    }, [toReplyData])

    const handleTextarea = (e) => {
        e.target.style.height = e.target.scrollHeight + 'px'

        setValue(e.target.value)
    }

    const blur = (e) => {
        if (!value) {
            e.target.style.height = '67px'
        }
    }

    const submitComment = (e) => {
        e.preventDefault()
        if (!value) return

        const comment = {
            text: e.target[0].value,
            post: post.id,
            user: user.id
        }

        if(toReplyData) {
            comment.parent = toReplyData.commentId
            sendNotification({
                user: toReplyData.user.id,
                post: post.id,
                comment: toReplyData.commentId,
                message: `${user.username} ответил на ваш комметарий`
            })
        }

        addComment(comment)
        sendNotification({
            user: post.user,
            post: post.id,
            message: `${user.username} оставил комментарий на ваш пост`
        })
        setToReplyData(null)
        setValue('')
    }

    return (
        <div className="main">
            <div className="container">
                <Header />
                <div className="post-container">
                    {isPostsLoading ? <Loader /> : <Post post={post} authUser={user}/>}

                    <h2 className="comments-title">Комментарии</h2>
                    {toReplyData && <p style={{marginBottom: '10px'}}>Ответ {toReplyData.user.username}</p>}
                    {isAuth &&
                    <form className="comment-form" onSubmit={(e) => submitComment(e)}>
                        <textarea
                            className="common-textarea wide" onChange={e => handleTextarea(e)} value={value} onBlur={e => blur(e)} placeholder="Поделитесь чем нибудь"/>
                        <label className="send-btn" htmlFor="submit-input">
                            <input className="submit-input" id="submit-input" type="submit"/>
                            <div className="icon-wrapper">
                                <img src={sendPng} alt="send icon"/>
                            </div>
                        </label>
                    </form>
                    }
                    {isCommentsLoading && <Loader />}
                    {newComments?.map(c => <Comment {...c} setToReplyData={setToReplyData}/>)}
                    {error && <div className="error_wrapper">{error}</div>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
    post: state.posts.post,
    user: state.auth.user,
    comments: state.comments.comments,
    error: state.posts.error,
    isAuth: state.auth.isAuth,
    isPostsLoading: state.posts.isLoading,
    isCommentsLoading: state.comments.isLoading
})


export default connect(mapStateToProps, {fetchPost, fetchComments, clearComments, addComment, sendNotification})(PostDetail)
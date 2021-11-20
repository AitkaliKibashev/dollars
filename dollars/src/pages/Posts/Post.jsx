import React from 'react'
import {addReputation} from "../../redux/reducers/authReducer"
import {connect} from "react-redux"
import {
    addRatingToPost,
    deletePost, setError
} from "../../redux/reducers/postsReducer"
import DeleteBtn
    from "../../components/common/DeleteBtn"
import {NavLink} from "react-router-dom"
import RatePost from "./RatePost"
import {sendNotification} from "../../redux/reducers/notificationReducer"

const Post = ({post, addRatingToPost, authUser, addReputation, deletePost, sendNotification, setError}) => {
    const {id, username, text, image, published_date, ratings, user, commentsLength} = post


    const ratePost = (rate) => {
        if(user === authUser.id) {
            setError('Вы мне можете поставить рейтинг на свой же пост!')
        } else {
            addRatingToPost({
                post: id,
                user: authUser.id,
                rating: rate
            })
            addReputation({
                username: authUser.username,
                user: user,
                value: rate,
                post: id
            })
            sendNotification({
                user: user,
                post: id,
                message: `${authUser.username} поставил на ваш пост +${rate}`
            })
        }
    }


    const publishedDate = new Date(published_date)
    const ratingSum = ratings?.length ? Math.round(ratings.map(r => r.rating).reduce((prev, cur) => prev+cur)/ratings.length * 100) / 100 : 0

    const checkRatingLevel = (ratingSum) => {
        if(ratingSum >= 8) return 'post-rating green'
        else if(ratingSum >= 5) return 'post-rating orange'
        else return 'post-rating red'
    }

    return (
        <div className="post">

            <div className="post-header">
                <p className="post-author">{username}, <span>{publishedDate.toLocaleString()}</span></p>
                <div className="post-header__right-side">
                    {commentsLength !== undefined &&
                    <NavLink to={`post/${id}`} style={{textDecoration: 'none', marginRight: "10px"}}>
                        <p className="common-p">{'Комментарии (' + commentsLength + ')'}</p>
                    </NavLink>}

                    {user === authUser.id && <DeleteBtn clickHandler={() => deletePost(id)} />}
                </div>

            </div>
            <div className="post-body">
                <p className="post-text">
                    {text}
                </p>
                {image &&
                <div className="post-img">
                    <img src={image}
                         alt="mock"/>
                </div>}
            </div>
            <div className="post-footer">
                <div className={checkRatingLevel(ratingSum)}>
                    <p>{ratingSum}</p>
                </div>
                <RatePost rate={1} color={'red'} onClick={ratePost}/>
                <RatePost rate={5} color={'orange'} onClick={ratePost}/>
                <RatePost rate={10} color={'green'} onClick={ratePost}/>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>({

})

export default connect(mapStateToProps, {addReputation, addRatingToPost, deletePost, sendNotification, setError})(Post)
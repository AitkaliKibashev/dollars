import React from 'react'
import {addReputation} from "../../redux/reducers/authReducer"
import {connect} from "react-redux"
import {
    addRatingToPost,
    deletePost
} from "../../redux/reducers/postsReducer"
import DeleteBtn
    from "../../components/common/DeleteBtn"
import {NavLink} from "react-router-dom"

const Post = ({id, username, text, image, published_date, addRatingToPost, authUser, user, ratings, addReputation, deletePost}) => {


    const ratePost = (rate) => {
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
                    <NavLink to={`post/${id}`} style={{textDecoration: 'none', marginRight: "10px"}}>
                        <p className="common-p">Комментарии</p>
                    </NavLink>
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
                <div className="rate-post red" onClick={() => ratePost(1)}>
                    <p>+1</p>
                </div>
                <div className="rate-post orange" onClick={() => ratePost(5)}>
                    <p>+5</p>
                </div>
                <div className="rate-post green" onClick={() => ratePost(10)}>
                    <p>+10</p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>({

})

export default connect(mapStateToProps, {addReputation, addRatingToPost, deletePost})(Post)
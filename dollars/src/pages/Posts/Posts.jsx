import React, {
    useEffect,
    useRef,
    useState
} from 'react'
import Header from "../../components/Header/Header"
import './Posts.css'
import sendPng from '../../assets/images/send.png'
import photoPng from '../../assets/images/photo.png'
import {connect} from "react-redux"
import {
    addPost, addRatingToPost, clearPosts,
    setPosts
} from "../../redux/reducers/postsReducer"
import Post from "./Post"
import {addReputation} from "../../redux/reducers/authReducer"
import Loader
    from "../../components/Loader/Loader"

const Posts = ({posts, error, setPosts, addPost, user, clearPosts, isLoading, isAuth}) => {
    const [value, setValue] = useState('')
    const [img, setImg] = useState(null)
    const [page, setPage] = useState(1)
    const postsEndRef = useRef(null)
    const observer = useRef(null)

    useEffect(() => {
        setPosts(page)
    }, [page])

    useEffect(() => () => {
        clearPosts()
    }, [])

    useEffect(() => {
        if(isLoading) return
        if(observer.current) observer.current.disconnect()
        const callback = (entries) => {
            if(entries[0].isIntersecting) {
                setPage(page + 1)
            }
        }

        observer.current = new IntersectionObserver(callback)
        observer.current.observe(postsEndRef.current)
    }, [isLoading])



    const handleTextarea = (e) => {
        e.target.style.height = e.target.scrollHeight + 'px'

        setValue(e.target.value)
    }

    const blur = (e) => {
        e.target.style.height = '67px'
    }

    const handleFileInput = (e) => {
        setImg(e.target.files[0])
    }

    const handleForm = (e) => {
        e.preventDefault()

        if(!value) return

        const formData = new FormData()

        if(img) {
            formData.append('image', img, img.name)
            formData.append('user', user.id)
            formData.append('username', user.username)
            formData.append('text', value)
        } else {
            formData.append('user', user.id)
            formData.append('username', user.username)
            formData.append('text', value)
        }
        addPost(formData)
        setValue('')
        setImg(null)
    }

    return (
        <main className="main">
            <div className="container">
                <Header />
                <h1 className="about-us">Активность сообщества</h1>
                <div className="posts-container">
                    {img &&
                    <div className="img-name">
                        Изображение: {img.name}
                    </div>}
                    {isAuth &&
                    <form className="create-post" onSubmit={e => handleForm(e)}>
                        <textarea
                            className="common-textarea" onChange={e => handleTextarea(e)} value={value} onBlur={e => blur(e)} placeholder="Поделитесь чем нибудь"/>
                        <label className="add-img-btn" htmlFor="file-input">
                            <input className="file-input" id="file-input" type="file" onChange={e => handleFileInput(e)}/>
                            <div className="icon-wrapper">
                                <img src={photoPng} alt="upload icon"/>
                            </div>
                        </label>
                        <label className="send-btn" htmlFor="submit-input">
                            <input className="submit-input" id="submit-input" type="submit"/>
                            <div className="icon-wrapper">
                                <img src={sendPng} alt="send icon"/>
                            </div>
                        </label>
                    </form>
                    }
                    {posts.map(p =>
                        <>
                            <Post {...p} authUser={user} />

                        </>)}
                    {!isLoading && <div className="posts-end" ref={postsEndRef} />}
                    {isLoading && <Loader />}
                </div>
                {error && <div className="error_container">{error}</div>}
            </div>
        </main>
    )
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    error: state.posts.error,
    user: state.auth.user,
    isLoading: state.posts.isLoading,
    isAuth: state.auth.isAuth,
})


export default connect(mapStateToProps, {setPosts, addPost, addRatingToPost, addReputation, clearPosts})(Posts)
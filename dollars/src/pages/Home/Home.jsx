import React, {
    useEffect,
    useRef,
    useState
} from 'react'
import Header from "../../components/Header/Header"
import './Home.css'
import {connect} from "react-redux"
import Pusher from "pusher-js"
import {
    initializeMessages,
    setMessage,
} from "../../redux/reducers/messagesReducer"
import {chatAPI} from "../../API/API"
import Loader from "../../components/Loader/Loader"

const Home = ({messages, setMessage, isAuth, user, initializeMessages}) => {

    const [messageInput, setMessageInput] = useState('')

    useEffect(() => {
        initializeMessages()

        const pusher = new Pusher('7e90421bdf9c4ad510d8', {
            cluster: 'ap2'
        })

        const channel = pusher.subscribe('chat')

        channel.bind('messages', function(data) {
            setMessage(data)
        })

        return () => {
            pusher.disconnect();
        }
    }, [])


    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const messageEndRef =  useRef(null)

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!e.target[0].value) return
        setMessageInput('')

        const sendDate = new Date()

        const data = {
            message: e.target[0].value,
            username: user.username,
            send_date: sendDate.toLocaleString()
        }

        await chatAPI.sendMessage(data)

        scrollToBottom()
    }

    return (
        <main className="main">
            <div className="container">
                <Header />
                <h2 className="chat-title">Main Board</h2>
                <div className="main-board" >
                    {messages.map(m =>
                        <div className="board-subject">
                            <div className="board-header">
                                {m.username} <span>{m.send_date}</span>
                            </div>
                            <div className="board-body">
                                {m.message}
                            </div>
                        </div>
                    )}
                    <div className="message-end"  ref={messageEndRef}/>
                </div>
                {isAuth &&
                <form className="message-form" onSubmit={(e => handleSubmit(e))}>
                    <input name="message-input" value={messageInput} onChange={e => setMessageInput(e.target.value)}/>
                    <button>Send</button>
                </form> }

            </div>
        </main>
    )
}

const mapStateToProps = (state) => ({
    messages: state.messages.messages,
    isAuth: state.auth.isAuth,
    user: state.auth.user
})


export default connect(mapStateToProps, {setMessage, initializeMessages})(Home)
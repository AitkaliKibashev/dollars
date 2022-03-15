import React from 'react'
import Header
    from "../../components/Header/Header"
import Reputation
    from "../../components/Reputation/Reputation"
import './Members.css'

const Members = () => {
    return (
        <main className="main">
            <div className="container">
                <Header />
                <h1 className="page-title">Участники сообщества</h1>
                <div className="members-body">
                    <div className="member-box">
                        <div className="box-left">
                            Нагаторо
                        </div>
                        <div className="box-right">
                            <Reputation reputation={100}/>
                            <div className="posts-number">
                                Количество постов: 5
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Members
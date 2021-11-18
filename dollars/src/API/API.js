import axios from "axios"

const url = '/api'





export const chatAPI = {
    sendMessage: (data) => {
        return axios.post(`${url}/messages/`, data)
    },
    getMessages: () => {
        return axios.get(`${url}/messages/`)
    }
}

export const userAPI = {
    login: (data) => {
        return axios.post(`${url}/login/`, data)
    },
    logout: (token) => {
        return axios.post(`${url}/logout/`, {},
            {
                headers: {
                    'Authorization': `token ${token}`
                }
            }
        )
    },
    register: (data) => {
        return axios.post(`${url}/register/`, data)
    },
    addReputation: (data, token) => {
        return axios.post(`${url}/user-reputation/`, data, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    fetchReputation: (userId, token) => {
        return axios.get(`${url}/get-user-reputation/${userId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    getUser: (userId) => {
        return axios.get(`${url}/user/${userId}`)
    }
}

export const postAPI = {
    getPosts: (page) => {
        return axios.get(`${url}/post/${page}`)
    },
    addPost: (data, token) => {
        return axios.post(`${url}/post/`, data, {
            headers: {
                'Authorization': `token ${token}`,
                'content-type': `multipart/form-data`
            }
        })
    },
    getPost: (postId) => {
        return axios.get(`${url}/post-detail/${postId}`)
    },
    deletePost: (postId, token) => {
        return axios.delete(`${url}/post-detail/${postId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    getPostRatings: (postId) => {
        return axios.get(`${url}/post-rating/${postId}`)
    },
    addRating: (data, token) => {
        return axios.post(`${url}/post-rate/`, data, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

export const commentsAPI = {
    fetchPostComments: (postId) => {
        return axios.get(`${url}/comment/${postId}`)
    },
    addCommentToPost: (data, token) => {
        return axios.post(`${url}/add-comment/`, data, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
    deleteCommentFromPost: (id, token) => {
        return axios.delete(`${url}/delete-comment/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    },
}
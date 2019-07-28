export const create = (userId, token, post) =>{

    return  fetch(`/api/post/new/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
};

export const list = ()=>{
    return  fetch(`/api/posts`,{
        method:"GET"
    })
        .then(response => {
            return response.json();
        })
};

export const singlePost = (postId)=>{
    return  fetch(`/api/post/${postId}`,{
        method:"GET"
    })
        .then(response => {
            return response.json();
        })
};

export const listByUser = (userId,token)=>{
    return  fetch(`/api/post/by/${userId}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
};

export const remove = (postId,token)=>{
    return  fetch(`/api/post/${postId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
};

export const update = (postId, token, post) =>{

    return  fetch(`/api/post/${postId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
};

export const like = (userId, token, postId) =>{

    return  fetch(`/api/post/like`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userId,postId})
    })
        .then(response => {
            return response.json();
        })
};

export const unlike = (userId, token, postId) =>{

    return  fetch(`/api/post/unlike`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userId,postId})
    })
        .then(response => {
            return response.json();
        })
};

export const comment = (userId, token, postId, comment) =>{

    return  fetch(`/api/post/comment`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userId,postId,comment})
    })
        .then(response => {
            return response.json();
        })
};

export const uncomment = (userId, token, postId, comment) =>{

    return  fetch(`/api/post/uncomment`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userId,postId,comment})
    })
        .then(response => {
            return response.json();
        })
};


export const read = (_id, token) =>{
    return  fetch(`/api/users/${_id}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
};

export const list = ()=>{
    return  fetch(`/api/users`,{
        method:"GET"
    })
        .then(response => {
            return response.json();
        })
};

export const remove = (userId, token)=>{
    return  fetch(`/api/users/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
};

export const update = (id, token, user) =>{

    return  fetch(`/api/users/${id}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json();
        })
};

export const updateUser = (user, next)=>{
    if (typeof window !== 'undefined'){
        if (localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth))
            next();
        }
    }
};

export const follow = (userId, token, followId) =>{

    return  fetch(`/api/users/follow`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    })
        .then(response => {
            return response.json();
        })
};
export const unFollow = (userId, token, unfollowId) =>{

    return  fetch(`/api/users/unfollow`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userId, unfollowId})
    })
        .then(response => {
            return response.json();
        })
};

export const findPeople = (userId, token)=>{
    return  fetch(`/api/users/findpeople/${userId}`,{
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
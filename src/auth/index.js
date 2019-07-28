export const signup = user =>{
    return  fetch('/api/signup',{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signin = user =>{
    return  fetch('/api/signin',{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const authenticate = (jwt, next)=>{
    if (typeof window !== 'undefined'){
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
};

export const signout = (next)=>{
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch("/api/signout",{
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));

};

export const isAuthenticated =()=>{
    if (typeof window == 'undefined'){
        return false
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
        return false;
    }
};

export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`/api/forgot-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`/api/reset-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
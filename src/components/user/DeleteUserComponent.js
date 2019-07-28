import React, {useState} from 'react';
import {isAuthenticated} from '../../auth';
import {remove} from './apiUser'
import {signout} from '../../auth'
import {Redirect} from "react-router-dom";
const DeleteUserComponent = props=> {

    const [redirectTo, setRedirectTo] = useState(false);

    const deleteAccount = ()=>{
        const token = isAuthenticated().token;
        const userId = props.userId;
        remove(userId,token)
            .then(data =>{
                if (data.error){
                    console.log(data.error)
                }
                else {
                    signout(()=> {
                        setRedirectTo(true)
                    })
                }
            })
    };
    const deleteConfirmed = ()=>{
        let answer = window.confirm("Are you sure you want to Delete your account");
        if (answer){
            deleteAccount();
        }
    };

    if (redirectTo){
        return <Redirect to='/'/>
    }
    return (
        <button
            className="btn btn-raised btn-danger"
            onClick={deleteConfirmed}
        >
            Delete Profile
        </button>
    );
};

export default DeleteUserComponent;
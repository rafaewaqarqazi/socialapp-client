import React, {Component} from 'react';
import {isAuthenticated} from '../../auth';
import {remove} from './apiUser'
import {signout} from '../../auth'
import {Redirect} from "react-router-dom";
class DeleteUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo:false
        };
    }


    deleteAccount = ()=>{
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId,token)
            .then(data =>{
                if (data.error){
                    console.log(data.error)
                }
                else {
                    signout(()=> {
                        this.setState({redirectTo:true})
                    })
                }
            })
    };
    deleteConfirmed = ()=>{
        let answer = window.confirm("Are you sure you want to Delete your account");
        if (answer){
            this.deleteAccount();
        }
    };


    render() {
        if (this.state.redirectTo){
            return <Redirect to='/'/>
        }
        return (
            <button
                className="btn btn-raised btn-danger"
                onClick={this.deleteConfirmed}
            >
                Delete Profile
            </button>
        );
    }
}

export default DeleteUserComponent;
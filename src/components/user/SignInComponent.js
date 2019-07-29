import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {signin, authenticate} from '../../auth';

const SignInComponent = props=> {
    const [state, setState] = useState({
        email:'',
        password:'',
        error:'',
        redirectToReferer:false,
        loading:false
    });

    const handleChange = name => event =>{
        setState({...state,error:''});
        setState({
            ...state,
            [name]:event.target.value
        })
    };

    const clickSubmit = event =>{
        event.preventDefault();
        setState({...state,loading:true});
        const {email, password} = state;

        const user = {
            email,
            password
        };
        signin(user)
            .then(data =>{

                if (data.error)
                    setState({...state,error:data.error,loading:false});
                else{
                    authenticate(data, ()=>{
                        setState({...state,redirectToReferer:true})
                    })
                }

            });
    };




    const signinForm = (email, password)=>{
        return  <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    placeholder='someone@example.com'
                    value={email}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>

            <button
                onClick={clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    };


    const {email, password,error, redirectToReferer, loading} = state;

    if (redirectToReferer){
        return <Redirect to='/'/>
    }
    return (

        <div className='container mt-5'>
            <div className="card w-75 m-auto">
                <h2 className='card-header text-center text-muted'>Sign In</h2>

                <div className="card-body">
                    <div className="alert alert-danger"
                         style={{display: error?"":"none"}}
                    >
                        {error}
                    </div>

                    {loading ? <div className='jumbotron text-center'>
                        <h2>Loading...</h2>
                    </div>:""}
                    {signinForm(email, password)}
                    <p>
                        <Link to="/forgot-password" className="text-danger">
                            {" "}
                            Forgot Password
                        </Link>
                    </p>
                </div>

            </div>
        </div>

    );
};

export default SignInComponent;
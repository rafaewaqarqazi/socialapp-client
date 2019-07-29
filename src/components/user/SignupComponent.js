import React, {useState} from 'react';
import {signup} from '../../auth';
import {Link} from "react-router-dom";

const SignUpComponent = props => {

    const [state, setState] = useState({
        name: '',
        email:'',
        password:'',
        error:'',
        open:false
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

        const {name, email, password} = state;

        const user = {
            name,
            email,
            password
        };
       signup(user)
           .then(data =>{
               if (data.error)
                   setState({...state,error:data.error});
               else
                   setState({
                       name: '',
                       email:'',
                       password:'',
                       error:'',
                       open:true
                   })
           });
    };

    const signupForm = (name, email, password)=>{
        return  <form>
            <div className="form-group" >
                <label className='text-muted'>Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
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


    const {name, email, password,error, open} = state;
    return (

        <div className='container mt-5'>
            <div className="card w-75 m-auto">
                <h2 className='card-header text-center text-muted'>Sign Up</h2>

                <div className="card-body">
                    <div className="alert alert-danger"
                         style={{display: error?"":"none"}}
                    >
                        {error}
                    </div>

                    <div className="alert alert-info"
                         style={{display: open?"":"none"}}
                    >
                        Account is Successfully Created... Please <Link to='/signin'>Sign In </Link>
                    </div>
                    {signupForm(name, email, password)}
                </div>

            </div>
            </div>

    );
}

export default SignUpComponent;
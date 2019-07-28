import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {signin, authenticate} from '../../auth';

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            error:'',
            redirectToReferer:false,
            loading:false
        };
    }

    handleChange = name => event =>{
        this.setState({error:''});
        this.setState({
            [name]:event.target.value
        })
    };

    clickSubmit = event =>{
        event.preventDefault();
        this.setState({loading:true});
        const {email, password} = this.state;

        const user = {
            email,
            password
        };
        signin(user)
            .then(data =>{

                if (data.error)
                    this.setState({error:data.error,loading:false})
                else{
                    authenticate(data, ()=>{
                        this.setState({redirectToReferer:true})
                    })
                }

            });
    };




    signinForm = (email, password)=>{
        return  <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    placeholder='someone@example.com'
                    value={email}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    };

    render() {
        const {email, password,error, redirectToReferer, loading} = this.state;

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
                        {this.signinForm(email, password)}
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
    }
}

export default SignInComponent;
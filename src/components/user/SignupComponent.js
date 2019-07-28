import React, {Component} from 'react';
import {signup} from '../../auth';
import {Link} from "react-router-dom";
class SignUpComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email:'',
            password:'',
            error:'',
            open:false
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

        const {name, email, password} = this.state;

        const user = {
            name,
            email,
            password
        };
       signup(user)
           .then(data =>{
               if (data.error)
                   this.setState({error:data.error})
               else
                   this.setState({
                       name: '',
                       email:'',
                       password:'',
                       error:'',
                       open:true
                   })
           });
    };

    signupForm = (name, email, password)=>{
        return  <form>
            <div className="form-group" >
                <label className='text-muted'>Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
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
        const {name, email, password,error, open} = this.state;
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
                        {this.signupForm(name, email, password)}
                    </div>

                </div>
                </div>

        );
    }
}

export default SignUpComponent;
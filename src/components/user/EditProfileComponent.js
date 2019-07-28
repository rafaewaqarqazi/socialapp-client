import React, {Component} from 'react';
import {isAuthenticated} from '../../auth';
import {read, update, updateUser} from "./apiUser";
import {Redirect} from "react-router-dom";
import DefaultProfile from '../../images/userAvatar.jpg';


class EditProfileComponent extends Component{


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name:'',
            email:'',
            about:'',
            password:'',
            error:'',
            redirectToProfile:false,
            loading:false,
            fileSize:0
        };
    }


    init(_id){
        const token = isAuthenticated().token;
        read(_id, token)
            .then(data =>{
                if (data.error){
                    this.setState({redirectToProfile:true})
                }else
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        about:data.about
                    })
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid = ()=>{
        const {name, email, password, fileSize} = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error:'Image should be less than 1mb'
            });
            return false
        }
        if (name.length === 0) {
            this.setState({
                error:'Name is required'
            });
            return false
        }
        if (!/^\w+([\.]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error:'Email is Not Valid'
            });
            return false
        }
        if (password.length >= 1 && password.length <=5) {
            this.setState({
                error:'Password Must be at-least 6 characters long'
            });
            return false
        }
        return true;
    };
    

    handleChange = name => event =>{
        this.setState({error:''});
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size :0;
        this.userData.set(name, value);
        this.setState({
            [name]:value,
            fileSize
        })
    };

    clickSubmit = event =>{
        event.preventDefault();

        if (this.isValid()){
            this.setState({loading:true});
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            update(userId, token, this.userData)
                .then(data =>{
                    if (data.error)
                        this.setState({error:data.error});
                    else
                        updateUser(data, ()=>{
                            this.setState({
                                redirectToProfile:true
                            })
                        });

                });
        }

    };

    updateForm = (name, email, password, about)=>{
        return  <form>
            <div className="form-group" >
                <label className='text-muted'>Profile Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    className="form-control"
                    accept='image/*'
                />
            </div>

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
                <label className='text-muted'>About</label>
                <textarea
                    onChange={this.handleChange("about")}
                    type="text"
                    className="form-control"
                    value={about}
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
                Update
            </button>
        </form>
    };
    render() {
        const {id, name, email, password, redirectToProfile, error,loading,about} = this.state;
        if (redirectToProfile)
            return <Redirect to={`/api/user/${id}`}/>;

        const photoUrl= id?`http://localhost:3000/api/users/photo/${id}?${new Date().getTime()}`:DefaultProfile;
        return (
            <div className='container w-75'>
                <div className='card mb-4'>

                    <div className="card-header">
                        <h3 className='m-auto text-muted'>Edit Profile</h3>
                    </div>
                    {loading ? <div className='jumbotron text-center'>
                        <h2>Loading...</h2>
                    </div>:""}
                    <div className="alert alert-danger"
                         style={{display: error?"":"none"}}
                    >
                        {error}
                    </div>
                    <div className='text-center'>
                        <img style={{height:"200px", width:"auto"}}
                             className='img-thumbnail' src={photoUrl}
                             onError={i => (i.target.src = `${DefaultProfile}`)}
                             alt={name}/>
                    </div>

                    <div className="card-body">



                        {this.updateForm(name, email, password,about)}
                    </div>
                </div>


            </div>


        );
    }
}

export default EditProfileComponent;
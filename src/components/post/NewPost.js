import React, {Component} from 'react';
import {isAuthenticated} from '../../auth';
import {create} from "./apiPost";
import {Redirect} from "react-router-dom";
class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            body:'',
            photo:'',
            user:{},
            error:'',
            redirectToProfile:false,
            loading:false,
            fileSize:0
        };
    }


    componentDidMount() {
        this.postData = new FormData();
       this.setState({
           user:isAuthenticated().user
       })
    }

    isValid = ()=>{
        const {title, body,fileSize} = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error:'Image should be less than 1mb'
            });
            return false
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({
                error:'All fields are required'
            });
            return false
        }
        return true;
    };


    handleChange = name => event =>{
        this.setState({error:''});
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size :0;
        this.postData.set(name, value);
        this.setState({
            [name]:value,
            fileSize
        })
    };

    clickSubmit = event =>{
        event.preventDefault();

        if (this.isValid()){
            this.setState({loading:true});
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            create(userId, token, this.postData)
                .then(data =>{
                    if (data.error)
                        this.setState({error:data.error});
                    else
                    {
                        this.setState({
                            loading:false,
                            title:'',
                            body:'',
                            photo:'',
                            redirectToProfile:true
                        })
                    }

                });
        }

    };

    postForm = (title, body)=>{
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
                <label className='text-muted'>Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Create Post
            </button>
        </form>
    };
    render() {
        const {title, body,user,photo, redirectToProfile, error,loading} = this.state;
        if (redirectToProfile)
            return <Redirect to={`/user/${user._id}`}/>;


        return (
            <div className='container w-75'>
                <div className='card mb-4'>

                    <div className="card-header">
                        <h3 className='m-auto text-muted'>Create a New Post</h3>
                    </div>
                    {loading ? <div className='jumbotron text-center'>
                        <h2>Loading...</h2>
                    </div>:""}
                    <div className="alert alert-danger"
                         style={{display: error?"":"none"}}
                    >
                        {error}
                    </div>
                    <div className="card-body">
                        {this.postForm(title, body)}
                    </div>
                </div>


            </div>


        );
    }
}

export default NewPost;
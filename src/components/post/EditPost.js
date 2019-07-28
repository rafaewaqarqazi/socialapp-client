import React, {Component} from 'react';
import {isAuthenticated} from "../../auth";

import { singlePost,update} from "./apiPost";
import {Redirect} from "react-router-dom";
import DefaultProfile from "../../images/userAvatar.jpg";
import DefaultPost from "../../images/defaultPost.jpg";

class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title:'',
            body:'',
            error:'',
            redirectToProfile:false,
            fileSize:0,
            loading:false
        };
    }


    init = postId => {
        const token = isAuthenticated().token;
        singlePost(postId, token)
            .then(data =>{
                if (data.error){
                    this.setState({redirectToProfile:true})
                }else
                    this.setState({
                        id: data._id,
                        title: data.title,
                        body: data.body,
                        error:''
                    })
            })
            .catch(err => console.log(err))
    };
    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
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
            const postId = this.state.id;
            const token = isAuthenticated().token;
            update(postId, token, this.postData)
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

    editPostForm = (title, body)=>{
        return  <form>
            <div className="form-group" >
                <label className='text-muted'>Post Photo</label>
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
                Update Post
            </button>
        </form>
    };
    render() {
        const {id,title, body,redirectToProfile,loading, error} = this.state;
        if (redirectToProfile)
            return <Redirect to={`/user/${isAuthenticated().user._id}`}/>;
        return (
            <div className='container w-75'>
                <div className='card mb-4'>

                    <div className="card-header">
                        <h3 className='m-auto text-muted'>Edit Post</h3>
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
                        <div className='text-center'>
                            <img
                                className='img-thumbnail mb-3'
                                style={{height:"200px", width:"auto"}}
                                src={`http://localhost:3000/api/post/photo/${id}?${new Date().getTime()}`}
                                onError={i => (i.target.src = `${DefaultPost}`)}
                                alt={title}
                            />
                        </div>
                        {this.editPostForm(title,body)}
                    </div>

                </div>
            </div>
        );
    }
}

export default EditPost;
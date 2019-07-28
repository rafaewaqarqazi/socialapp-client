import React, {Component} from 'react';
import {comment, remove, uncomment} from "./apiPost";
import {isAuthenticated} from "../../auth";
import {Link} from "react-router-dom";
import DefaultProfile from "../../images/userAvatar.jpg";

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text:'',
            error:''
        };
    }

    handleChange = event => {
        this.setState({error:''})
        this.setState({text: event.target.value})
    };

    isValid = ()=>{
        const {text} = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error:'Comment should not be empty and more than 150 Characters'
            });
            return false
        }
        return true;
    };
    addComment = e => {
        e.preventDefault();
        if (!isAuthenticated()){
            this.setState({
                error:'Please Sign in to Post a Comment'
            });
            return false
        }
       if (this.isValid()){
           const userId = isAuthenticated().user._id;
           const postId = this.props.postId;
           const token = isAuthenticated().token;
           const aComment = {
               text: this.state.text
           };

           comment(userId,token,postId,aComment)
               .then(data => {
                   if (data.error){
                       console.log(data.error)
                   }
                   else {
                       this.setState({text:''});
                       this.props.updateComments(data.comments);
                   }
               })
       }
    };
    deleteComment = (comment)=>{
        const userId = isAuthenticated().user._id;
        const postId = this.props.postId;
        const token = isAuthenticated().token;

        uncomment(userId,token,postId,comment)
            .then(data => {
                if (data.error){
                    console.log(data.error)
                }
                else {
                    this.props.updateComments(data.comments);
                }
            })
    };

    deleteConfirmed = (comment)=>{
        let answer = window.confirm("Are you sure you want to Delete your Post");
        if (answer){
            this.deleteComment(comment);
        }
    };
    render() {
        const {comments} = this.props;
        const {error} = this.state;
        return (
            <div>
                <h2 className='mt-5 mb-5'>Leave a comment</h2>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input
                            className='form-control'
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.text}
                            placeholder='Leave a Comment'
                        />
                    </div>
                    <button className="btn btn-success btn-raised">Post</button>
                </form>
                <div className="alert alert-danger"
                     style={{display: error?"":"none"}}
                >
                    {error}
                </div>


                <div className="col-md-12">
                    <h3 className="text-primary">{comments.length} Comments</h3>
                    <hr/>
                    {
                        comments.map((comment, i)=>(
                            <div key={i}>

                                <div>
                                    <Link to={`/user/${comment.postedBy._id}`}>
                                        <img
                                            style={{borderRadius:"50%",
                                                border:"1px solid black"
                                            }}
                                            className='float-left mr-2'
                                            height="30px"
                                            src={`http://localhost:3000/api/users/photo/${comment.postedBy._id}?${new Date().getTime()}`}
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                            alt={comment.postedBy.name}
                                        />

                                    </Link>
                                    <div>
                                        <p className='lead'>{comment.text}</p>
                                        <p className="font-italic mark">
                                            Posted by: <Link to={`${comment.postedBy._id}`}>{comment.postedBy.name}</Link>
                                            {' '} on {' '} {new Date(comment.created).toDateString()}
                                            <span>
                                                 {
                                                     isAuthenticated().user &&
                                                     isAuthenticated().user._id === comment.postedBy._id &&
                                                     <>
                                                         <span
                                                             onClick={()=>this.deleteConfirmed(comment)}
                                                             className="text-danger float-right mr-1">
                                                             Remove
                                                         </span>
                                                     </>
                                                 }
                                            </span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Comment;
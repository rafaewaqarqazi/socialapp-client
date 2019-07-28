import React, {Component} from 'react';
import {singlePost, remove,like,unlike} from "./apiPost";
import DefaultPost from "../../images/defaultPost.jpg";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../../auth";
import Comment from './Comment';
class SinglePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post:{},
            deleted:false,
            like:false,
            likes:0,
            redirectToSignin:false,
            comments:[]
        };
    }

    checkLike=likes=>{
      const userId = isAuthenticated() && isAuthenticated().user._id;
      let match = likes.indexOf(userId) !== -1;
      return match;
    };
    componentDidMount() {
        const postId = this.props.match.params.postId;
        singlePost(postId)
            .then(data =>{
                if (data.error){
                    console.log(data.error);
                }else {
                    this.setState({
                        post:data,
                        likes:data.likes.length,
                        like:this.checkLike(data.likes),
                        comments:data.comments
                    })
                }
            } )
    }

    deletePost = ()=>{
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;

        remove(postId, token)
            .then(data => {
                if (data.error){
                    console.log(data.error)
                }
                else {
                    this.setState({deleted:true})
                }
            })
    };

    deleteConfirmed = ()=>{
        let answer = window.confirm("Are you sure you want to Delete your Post");
        if (answer){
            this.deletePost();
        }
    };

    updateComments = comments =>{
        this.setState({comments})
    };

    likeToggle = ()=>{
        if(!isAuthenticated()){
            this.setState({redirectToSignin:true});
            return false
        }
      let callApi = this.state.like ? unlike : like ;
      const userId = isAuthenticated().user._id;
      const postId = this.state.post._id;
      const token = isAuthenticated().token;
      callApi(userId, token, postId).then(data => {
          if (data.error){
              console.log(data.error)
          }
          else {
              this.setState({
                  like: !this.state.like,
                  likes: data.likes.length
              })
          }
      })
    };
    renderPost  = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}`:'';
        const posterName = post.postedBy? post.postedBy.name:'Unknown';
        const postedBy = post.postedBy ? `${post.postedBy._id}` : '';
        const {like, likes} = this.state;
        return (


                <div >
                    <img
                        className='img-thumbnail mb-3'
                        style={{height:"300px", width:"100%", objectFit:"cover"}}
                        src={`http://localhost:3000/api/post/photo/${post._id}?${new Date().getTime()}`}
                        onError={i => (i.target.src = `${DefaultPost}`)}
                        alt={post.title}
                    />
                    <div>
                        {like ?(
                            <h3 onClick={this.likeToggle}>
                                <i className="fa fa-thumbs-up bg-dark text-success"
                                   style={{padding:"10px", borderRadius:"50%"}}
                                />
                                {`${likes} Likes`}
                            </h3>
                        ):(
                            <h3 onClick={this.likeToggle}>
                                <i className="fa fa-thumbs-up bg-dark text-warning"
                                   style={{padding:"10px", borderRadius:"50%"}}
                                />
                                {`${likes} Likes`}
                            </h3>
                        )}

                    </div>
                    <p className="card-text"> {post.body}</p>
                    <p className="font-italic mark">
                        Posted by: <Link to={`${posterId}`}>{posterName}</Link>
                        on {new Date(post.createdAt).toDateString()}
                    </p>
                    <div className="d-inline inline-block">
                        <Link to={`/`}
                              className="btn btn-raised btn-primary mr-5"
                        >
                            Go to Posts
                        </Link>
                        {
                            isAuthenticated().user &&
                            isAuthenticated().user._id === postedBy &&
                            <>
                                <Link
                                    to={`/post/edit/${post._id}`}
                                    className="btn btn-raised btn-warning mr-5">
                                    Update Post
                                </Link>
                                <button
                                    onClick={this.deleteConfirmed}
                                    className="btn btn-raised btn-danger ">
                                    Delete Post
                                </button>
                            </>
                        }
                    </div>



                </div>


        )
    };

    render() {
        const {post, deleted, redirectToSignin, comments} =this.state;
        if (deleted){
            return <Redirect to={'/'}/>
        }
       else if (redirectToSignin){
            return <Redirect to={'/signin'}/>
        }
        return (
            <div className='container'>

                {!post ?
                    <h2>Loading...</h2>
                :
                   ( <div>
                        <h2 className='display-2 mt-2'>{post.title}</h2>
                        {this.renderPost(post)}
                    </div>
)
                }
                <Comment
                    postId={post._id}
                    comments={comments.reverse()}
                    updateComments={this.updateComments}
                />



            </div>
        );
    }
}

export default SinglePost;
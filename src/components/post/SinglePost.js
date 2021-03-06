import React, {useState, useEffect} from 'react';
import {singlePost, remove,like,unlike} from "./apiPost";
import DefaultPost from "../../images/defaultPost.jpg";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../../auth";
import Comment from './Comment';

const SinglePost =props=> {

    const [state,setState] = useState({
        post:{},
        deleted:false,
        like:false,
        likes:0,
        redirectToSignin:false,
        comments:[]
    });

    const checkLike=likes=>{
      const userId = isAuthenticated() && isAuthenticated().user._id;
      let match = likes.indexOf(userId) !== -1;
      return match;
    };

    useEffect(()=>{
        const postId = props.match.params.postId;
        singlePost(postId)
            .then(data =>{
                if (data.error){
                    console.log(data.error);
                }else {
                    setState({
                        ...state,
                        post:data,
                        likes:data.likes.length,
                        like:checkLike(data.likes),
                        comments:data.comments
                    })
                }
            } )
    },[props.match.params.postId]);

    const deletePost = ()=>{
        const postId = props.match.params.postId;
        const token = isAuthenticated().token;

        remove(postId, token)
            .then(data => {
                if (data.error){
                    console.log(data.error)
                }
                else {
                    setState({...state,deleted:true})
                }
            })
    };

    const deleteConfirmed = ()=>{
        let answer = window.confirm("Are you sure you want to Delete your Post");
        if (answer){
            deletePost();
        }
    };

    const updateComments = comments =>{
        setState({...state,comments})
    };

    const likeToggle = ()=>{
        if(!isAuthenticated()){
            setState({...state,redirectToSignin:true});
            return false
        }
      let callApi = state.like ? unlike : like ;
      const userId = isAuthenticated().user._id;
      const postId = state.post._id;
      const token = isAuthenticated().token;
      callApi(userId, token, postId).then(data => {
          if (data.error){
              console.log(data.error)
          }
          else {
              setState({
                  ...state,
                  like: !state.like,
                  likes: data.likes.length
              })
          }
      })
    };
    const renderPost  = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}`:'';
        const posterName = post.postedBy? post.postedBy.name:'Unknown';
        const postedBy = post.postedBy ? `${post.postedBy._id}` : '';
        const {like, likes} = state;
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
                            <h3 onClick={likeToggle}>
                                <i className="fa fa-thumbs-up bg-dark text-success"
                                   style={{padding:"10px", borderRadius:"50%"}}
                                />
                                {`${likes} Likes`}
                            </h3>
                        ):(
                            <h3 onClick={likeToggle}>
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
                                    onClick={deleteConfirmed}
                                    className="btn btn-raised btn-danger ">
                                    Delete Post
                                </button>
                            </>
                        }
                    </div>
                </div>
        )
    };

    const {post, deleted, redirectToSignin, comments} =state;
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
                    {renderPost(post)}
                </div>
)
            }
            <Comment
                postId={post._id}
                comments={comments.reverse()}
                updateComments={updateComments}
            />
        </div>
    );
};

export default SinglePost;
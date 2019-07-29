import React, {useState} from 'react';
import {comment, uncomment} from "./apiPost";
import {isAuthenticated} from "../../auth";
import {Link} from "react-router-dom";
import DefaultProfile from "../../images/userAvatar.jpg";

const Comment = ({postId,updateComments, comments}) => {

    const [text,setText]=useState('');
    const [error,setError]=useState('');

    const handleChange = event => {
        setError('');
        setText( event.target.value);
    };

    const isValid = ()=>{
        if (!text.length > 0 || text.length > 150) {
          setError('Comment should not be empty and more than 150 Characters');
            return false
        }
        return true;
    };
    const addComment = e => {
        e.preventDefault();
        if (!isAuthenticated()){
            setError('Please Sign in to Post a Comment');
            return false
        }
       if (isValid()){
           const userId = isAuthenticated().user._id;

           const token = isAuthenticated().token;
           const aComment = {text};

           comment(userId,token,postId,aComment)
               .then(data => {
                   if (data.error){
                       console.log(data.error)
                   }
                   else {
                       setText('');
                       updateComments(data.comments);
                   }
               })
       }
    };
    const deleteComment = (comment)=>{
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        uncomment(userId,token,postId,comment)
            .then(data => {
                if (data.error){
                    console.log(data.error)
                }
                else {
                    updateComments(data.comments);
                }
            })
    };

    const deleteConfirmed = (comment)=>{
        let answer = window.confirm("Are you sure you want to Delete your Post");
        if (answer){
            deleteComment(comment);
        }
    };


    return (
        <div>
            <h2 className='mt-5 mb-5'>Leave a comment</h2>

            <form onSubmit={addComment}>
                <div className="form-group">
                    <input
                        className='form-control'
                        type="text"
                        onChange={handleChange}
                        value={text}
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
                                                         onClick={()=>deleteConfirmed(comment)}
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

};

export default Comment;
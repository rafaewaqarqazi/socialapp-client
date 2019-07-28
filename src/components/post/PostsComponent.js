import React, {Component} from 'react';
import {list} from './apiPost';
import {Link} from "react-router-dom";
import DefaultPost from "../../images/defaultPost.jpg";
class PostsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts:[]
        };
    }


    componentDidMount() {
        list().then(data => {
            if (data.error){
                console.log(data.error)
            }
            else {
                this.setState({posts:data})
            }
        })
    }

    renderPosts = posts =>{
        return (
            <div className='row'>
                {posts.map((post, i)=> {
                    const posterId = post.postedBy ? `/user/${post.postedBy._id}`:'';
                    const posterName = post.postedBy? post.postedBy.name:'Unknown';
                 return (
                     < div className="card col-md-4 mb-5 " key={i}>

                         <div className="card-body ">
                             <img
                                 className='img-thumbnail mb-3'
                                 style={{height:"200px", width:"100%"}}
                                 src={`http://localhost:3000/api/post/photo/${post._id}?${new Date().getTime()}`}
                                 onError={i => (i.target.src = `${DefaultPost}`)}
                                 alt={post.title}
                             />
                             <h5 className="card-title">{post.title}</h5>
                             <p className="card-text"> {post.body.substring(0,100)}</p>
                            <p className="font-italic mark">
                                Posted by: <Link to={`${posterId}`}>{posterName}</Link>
                            </p>
                            on {new Date(post.createdAt).toDateString()}
                         </div>
                         <Link to={`/post/${post._id}`}
                               className="card-footer btn btn-raised btn-primary"
                         >
                             Read more
                         </Link>
                     </div>
                     )

                })}
            </div>
            )

};

    render() {
        const {posts} = this.state;
        return (
            <div>
                <div className='card mb-4'>
                    <h3 className='m-auto p-3 text-muted'>

                        {!posts.length ?
                            "Loading..."
                        :(
                            "Recent Posts"
                        )}</h3>
                </div>
                <div className="container">
                    {this.renderPosts(posts)}
                </div>

            </div>

        );
    }
}

export default PostsComponent;
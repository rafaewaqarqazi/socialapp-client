import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DefaultProfile from "../../images/userAvatar.jpg";

class ProfileTabsComponent extends Component {
    render() {
        const {following, followers,posts} = this.props;

        return (
            <div>
               <div className="row">
                   <div className="col-md-4">
                       <h3 className="text-primary">Followers</h3>
                       <hr/>
                       {
                           followers.map((person, i)=>(
                               <div key={i}>

                                        <div>
                                            <Link to={`/user/${person._id}`}>
                                                <img
                                                    style={{borderRadius:"50%",
                                                        border:"1px solid black"
                                                    }}
                                                    className='float-left mr-2'
                                                    height="30px"
                                                    src={`http://localhost:3000/api/users/photo/${person._id}?${new Date().getTime()}`}
                                                     onError={i => (i.target.src = `${DefaultProfile}`)}
                                                     alt={person.name}
                                                />
                                                <div>
                                                    <p className='lead'>{person.name}</p>
                                                </div>
                                            </Link>


                                    </div>
                               </div>
                           ))
                       }
                   </div>
                   <div className="col-md-4">
                       <h3 className="text-primary">Following</h3>
                       <hr/>
                       {
                           following.map((person, i)=>(
                               <div key={i}>

                                   <div>
                                       <Link to={`/user/${person._id}`}>
                                           <img
                                               style={{borderRadius:"50%",
                                                border:"1px solid black"
                                               }}
                                               className='float-left mr-2'
                                               height="30px"
                                               src={`http://localhost:3000/api/users/photo/${person._id}?${new Date().getTime()}`}
                                               onError={i => (i.target.src = `${DefaultProfile}`)}
                                               alt={person.name}
                                           />
                                           <div>
                                               <p className='lead'>{person.name}</p>
                                           </div>
                                       </Link>
                                   </div>
                               </div>
                           ))
                       }
                   </div>
                   <div className='col-md-4'>
                       <h3 className="text-primary">Posts</h3>
                       <hr/>
                       {
                           posts.map((post, i)=>(
                               <div key={i}>

                                   <div>
                                       <Link to={`/post/${post._id}`}>
                                           <div>
                                               <p className='lead'>{post.title}</p>
                                           </div>
                                       </Link>
                                   </div>
                               </div>
                           ))
                       }
                   </div>
               </div>
            </div>
        );
    }
}

export default ProfileTabsComponent;
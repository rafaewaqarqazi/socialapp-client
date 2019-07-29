import React, {useState, useEffect} from 'react';
import {isAuthenticated} from '../../auth';
import {Link, Redirect} from "react-router-dom";
import {read} from './apiUser';
import DefaultProfile from "../../images/userAvatar.jpg";
import DeleteUser from './DeleteUserComponent';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabsComponent from './ProfileTabsComponent';
import {listByUser} from "../post/apiPost";

const ProfileComponent = props=> {
    const [user, setUser] = useState({
        following:[],
        followers:[]
    });
    const [posts, setPosts] = useState([]);
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);
    const [following, setFollowing] = useState(false);
    const [, setError] = useState('');

    const checkFollow = user=>{
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        });
        return match
    };

    const clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, user._id)
            .then(data => {
                if (data.error){
                    setError(data.error)
                }
                else {
                    setUser(data);
                    setFollowing(!following);

                }
            })
    };

    const init = _id => {
        const token = isAuthenticated().token;
        read(_id, token)
            .then(data =>{
                if (data.error){
                    setRedirectToSignIn(true);
                }else
                {
                    console.log('init');
                    let following = checkFollow(data);
                    setUser(data);
                    setFollowing(following);
                    loadPosts(data._id,token);
                }

            })
            .catch(err => console.log(err))
    };

    const loadPosts=(userId,token)=>{
        listByUser(userId,token)
            .then(data =>{
                if (data.error){
                    console.log(data.error)
                }
                else {

                    setPosts(data);

                }
            })
    };

    useEffect(()=>{
        console.log('useEffect');
        const userId = props.match.params.userId;
        init(userId);
    },[props.match.params.userId]);



    const {_id,name,email, created,about, followers}=user;


    if (redirectToSignIn) return <Redirect to='/signin'/>;
    const photoUrl= _id?`http://localhost:3000/api/users/photo/${_id}?${new Date().getTime()}`:DefaultProfile;

    return (
        <div>
            <div className='card'>
                <h3 className='m-auto p-3 text-muted'>{name} Profile</h3>
            </div>

            <div className='container mt-3'>
                <div className="row">
                    <div className="col-md-4 col-sm-4 mt-2">
                        <img style={{height:"200px", width:"auto"}}
                             className='img-thumbnail'
                             src={photoUrl}
                             onError={i => (i.target.src = `${DefaultProfile}`)}
                             alt={name}
                        />


                    </div>
                    <div className="col-md-8 col-sm-8">
                        <div className="lead mt-2 ">
                            <p>{name}</p>
                            <p>{email}</p>
                            {created && <p>Joined At: {new Date(created).toDateString() }</p>}

                        </div>
                        {
                            isAuthenticated().user &&
                            isAuthenticated().user._id === _id ? (
                                <div className="d-inline-block">
                                    <Link
                                        className='btn btn-raised btn-info mr-3'
                                        to={`/post/new`}
                                    >
                                        Create Post
                                    </Link>
                                    <Link
                                        className='btn btn-raised btn-success mr-3'
                                        to={`/user/edit/${_id}`}
                                    >
                                        Edit Profile
                                    </Link>
                                    <DeleteUser userId={_id}/>
                                </div>
                            ):
                                (
                                    <FollowProfileButton
                                        following={following}
                                        onButtonClick={clickFollowButton}
                                    />
                                )
                        }

                    </div>

                </div>
                <div className="row">

                    <div className="col-md-12 mt-5">
                        <hr/>
                        <p className='lead'>{about}</p>
                        <hr/>
                        <ProfileTabsComponent followers={followers} following={user.following} posts={posts}/>
                    </div>
                    <hr/>
                </div>
            </div>
        </div>


    );

};

export default ProfileComponent;
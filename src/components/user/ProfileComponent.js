import React, {Component} from 'react';
import {isAuthenticated} from '../../auth';
import {Link, Redirect} from "react-router-dom";
import {read} from './apiUser';
import DefaultProfile from "../../images/userAvatar.jpg";
import DeleteUser from './DeleteUserComponent';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabsComponent from './ProfileTabsComponent';
import {listByUser} from "../post/apiPost";

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:{
                following:[],
                followers:[]
            },
            posts:[],
            redirectToSignIn:false,
            following:false,
            error:''
        };
    }

    checkFollow = user=>{
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        });
        return match
    };

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id)
            .then(data => {
                if (data.error){
                    this.setState({error:data.error})
                }
                else {
                    this.setState({user:data, following:!this.state.following})
                }
            })
    };

    init(_id){
        const token = isAuthenticated().token;
        read(_id, token)
            .then(data =>{
                if (data.error){
                    this.setState({redirectToSignIn:true})
                }else
                {
                    let following = this.checkFollow(data);
                    this.setState({user: data, following});
                    this.loadPosts(data._id,token);
                }

            })
            .catch(err => console.log(err))
    }

    loadPosts=(userId,token)=>{
        listByUser(userId,token)
            .then(data =>{
                if (data.error){
                    console.log(data.error)
                }
                else {
                    this.setState({posts:data})
                }
            })
    };
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {
        const {_id,name,email, created,about, followers, following}=this.state.user;
        const { redirectToSignIn,posts } = this.state;

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
                                            following={this.state.following}
                                            onButtonClick={this.clickFollowButton}
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
                            <ProfileTabsComponent followers={followers} following={following} posts={posts}/>
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>


        );
    }
}

export default ProfileComponent;
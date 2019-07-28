import React, {useState, useEffect} from 'react';
import {findPeople, follow} from './apiUser';
import {Link} from "react-router-dom";
import DefaultProfile from '../../images/userAvatar.jpg';
import {isAuthenticated} from "../../auth";

const FindPeople = props => {

    const [users,setUsers]=useState([]);
    const [error,setError] = useState('');
    const [open, setOpen] = useState(false);
    const [followMessage,setFollowMessage] = useState('');

    useEffect(()=>{
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findPeople(userId,  token).then(data => {
            if (data.error){
                console.log(data.error)
            }
            else {
                setUsers(data);
            }
        })
    },[]);

    const clickFollow = (user, i)=>{
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        follow(userId, token, user._id)
            .then(data => {
                if (data.error){
                    setError(data.error);
                }
                else {
                    let toFollow = users;
                    toFollow.splice(i,1);
                    setUsers(toFollow);
                    setOpen(true);
                    setFollowMessage(`Following ${user.name}`);
                }
            })
    };

    const renderUsers = users =>(
        <div className='row'>
            {users.map((user, i)=>(

                < div className="card col-md-4" key={i}>
                    <img style={{height:"200px", width:"auto"}}
                         className='img-thumbnail'
                         src={`http://localhost:3000/api/users/photo/${user._id}?${new Date().getTime()}`}
                         onError={i => (i.target.src = `${DefaultProfile}`)}
                         alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text"> {user.email}</p>
                        <Link to={`/user/${user._id}`}
                              className="btn btn-raised btn-primary btn-sm"
                        >
                            View Profile
                        </Link>
                        <button onClick={()=>clickFollow(user,i)}
                            className="btn btn-raised btn-info float-right btn-sm"
                        >
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className='card mb-4'>
                <h3 className='m-auto p-3 text-muted'>Users</h3>
            </div>
            {
                open &&
                    <div className='alert alert-success'>
                        <p>{followMessage}</p>
                    </div>
            }
            {renderUsers(users)}
        </div>

    );

};

export default FindPeople;
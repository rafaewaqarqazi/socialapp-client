import React, {useState, useEffect} from 'react';
import {list} from './apiUser';
import {Link} from "react-router-dom";
import DefaultProfile from '../../images/userAvatar.jpg';

const UsersComponent = props => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        list().then(data => {
            if (data.error){
                console.log(data.error)
            }
            else {
                setUsers(data);
            }
        })
    },[]);


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
                        <Link to={`/user/${user._id}`}  className="btn btn-raised btn-primary">View Profile</Link>
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
            {renderUsers(users)}
        </div>

    );

};

export default UsersComponent;
import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth';


const MenuComponent = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName=""  to='/'>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName=""  to='/users'>Users</NavLink>
                </li>

                {
                    !isAuthenticated()? (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName=""  to={`/post/new`}>Create Post</NavLink>
                            </li>
                            <li className="nav-item ml-auto">
                                <NavLink className="nav-link"  to='/signin'>Sign In</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/signup'>Sign Up</NavLink>
                            </li>

                        </>
                    ):
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName=""  to='/findpeople'>Find People</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName=""  to={`/post/new`}>Create Post</NavLink>
                            </li>
                            <li className="nav-item ml-auto">
                                <p className="nav-link" onClick={()=>signout(()=>history.push('/'))}>Sign Out</p>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`/user/${isAuthenticated().user._id}`} className="nav-link" >{`${isAuthenticated().user.name}'s Profile`}</NavLink>
                            </li>
                        </>

                }
            </ul>
        </div>
    );
};

export default withRouter(MenuComponent);
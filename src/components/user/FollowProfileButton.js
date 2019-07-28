import React from 'react';
import {follow, unFollow} from './apiUser';
const FollowProfileButton = props=> {

    const followClick = ()=>{
        props.onButtonClick(follow)
    };

    const unFollowClick =()=>{
        props.onButtonClick(unFollow)
    };
    return (
        <div className='d-inline-block '>
            {
                !props.following?(
                    <button
                        className="btn btn-success btn-raised mr-5"
                        onClick={followClick}
                    >
                        Follow
                    </button>
                ):(
                    <button
                        className="btn btn-danger btn-raised "
                        onClick={unFollowClick}
                    >
                        UnFollow
                    </button>
                )
            }
        </div>
    );
};

export default FollowProfileButton;
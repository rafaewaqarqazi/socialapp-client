import React, {Component} from 'react';
import {follow, unFollow} from './apiUser';
class FollowProfileButton extends Component {

    followClick = ()=>{
        this.props.onButtonClick(follow)
    };

    unFollowClick =()=>{
        this.props.onButtonClick(unFollow)
    };
    render() {
        return (
            <div className='d-inline-block '>
                {
                    !this.props.following?(
                        <button
                            className="btn btn-success btn-raised mr-5"
                            onClick={this.followClick}
                        >
                            Follow
                        </button>
                    ):(
                        <button
                            className="btn btn-danger btn-raised "
                            onClick={this.unFollowClick}
                        >
                            UnFollow
                        </button>
                    )
                }
            </div>
        );
    }
}

export default FollowProfileButton;
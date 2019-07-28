import React from 'react';
import Posts from './post/PostsComponent'
const Home = ()=>(
    <div>
        <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead">Welcome To React Front-end</p>
        </div>
        <div >
            <Posts/>
        </div>
    </div>

);

export default Home;
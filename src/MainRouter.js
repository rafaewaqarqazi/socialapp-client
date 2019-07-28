import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import SignUpComponent from './components/user/SignupComponent';
import SignInComponent from './components/user/SignInComponent';
import MenuComponent from './components/MenuComponent';
import ProfileComponent from './components/user/ProfileComponent';
import UsersComponent from './components/user/UsersComponent';
import EditProfileComponent from './components/user/EditProfileComponent';
import FindPeople from './components/user/FindPeople';
import NewPost from './components/post/NewPost';
import SinglePost from './components/post/SinglePost';
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import PrivateRoute from './auth/PrivateRoute';
import EditPost from './components/post/EditPost';
const MainRouter = ()=>(
    <div>
        <MenuComponent/>
        <Switch>
            <Route path='/' component={HomeComponent} exact/>
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}/>
            <PrivateRoute path='/post/new' component={NewPost} exact/>
            <Route path='/post/:postId' component={SinglePost} exact/>
            <PrivateRoute path='/post/edit/:postId' component={EditPost} exact/>
            <Route path='/signup' component={SignUpComponent} exact/>
            <Route path='/signin' component={SignInComponent} exact/>
            <Route path='/users' component={UsersComponent} exact/>
            <PrivateRoute path='/user/edit/:userId' component={EditProfileComponent} exact/>
            <PrivateRoute path='/user/:userId' component={ProfileComponent} exact/>
            <PrivateRoute path='/findpeople' component={FindPeople} exact/>

            <Redirect to='/'/>
        </Switch>
    </div>
);

export default MainRouter;
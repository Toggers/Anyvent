import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import googleSign from '../../images/googleSign.png';
import '../events.css';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import LoginEmail from './LoginEmail';
import GoogleLogin from 'react-google-login';
import ReactDOM from "react-dom";   



function LoginPage() {
    const [emailLogin, setEmailLogin] = useState(false)
    const responseGoogle = (response) => {
        console.log(response);
    };
    
    function onPageSwitch() {
        setEmailLogin(true)
    }

    if (emailLogin) {
        console.log(emailLogin)
        console.log('hi')
        return <LoginEmail />
    } else {
        return (
            
            <div>
                <AppNavbar/>
    
                {/* <Grid item xs={12} container justify="center">
                    <h1 className="loginHeader">Welcome Back</h1>
                </Grid> */}
    
                <Grid item xs={12} container justify="center">
                    <img className="googleSign" src={googleSign} />
                    
                    {/* <GoogleLogin
                        clientId="828540566167-q88jt3ch2bnineavqegae2t6volaqfeq.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                  
                </Grid>
    
                
                <Grid item xs={12} container justify="center">
                    <Grid className="orDivider" container item xs={3}>
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                        
                    </Grid>
                </Grid>
       
                <Grid item xs={12} container justify="center">
                    <Grid onClick={onPageSwitch} container justify="center">
                        <Grid className="emailSign" item xs={2} container justify="center">
                            <p>Sign in with Email</p>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        )
    }

    
}

export default LoginPage
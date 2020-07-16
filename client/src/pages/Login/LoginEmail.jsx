import React ,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import googleSign from '../../images/googleSign.png';

function LoginEmail() {


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))
  
  const classes = useStyles();
  console.log('reached here');


//-------------------------------------------------------Handle email,password, and submit-------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState(""); 


  function emailHandler(e){
    setEmail(e.target.value);
  }

  function passwordHandler(e){
    setPassword(e.target.value);
  }

  function onSubmitHandler(e){
     e.preventDefault(); 
     console.log(email,password);

      if(email.trim().length===0||password.trim().length==0){
        return;
     }

      const requestBody={
        query:`
          query{
            login(email:"${email}", password:"${password}"){
                userId
                token
                tokenExpiration
            }
          }
        `
      };



      fetch('http://localhost:8000/graphql',{
          method: 'POST',
          body:JSON.stringify(requestBody),

          headers:{
            'Content-Type': 'application/json'
         }
       }).then(res =>{
        
        if(res.status !==200 &&res.status !==201){
          alert("Fail, Make sure to enter a correct email and password!!");
          throw new Error('Failed!');
        }
            return res.json();
        }).then(resData=>{
          setEmail("");
          setPassword("");
          alert("Found User!!!");
            console.log(resData);
        }).catch(err =>{
            console.log(err);
      });
  }

//----------------------------------------------------------------------------------

  return (
      <div>
    <AppNavbar />
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={emailHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={passwordHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

    
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" to="/signUp" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>

          </Grid>
        </form>
      </div>
      
    </Container>
    </div>
  );
}

export default LoginEmail
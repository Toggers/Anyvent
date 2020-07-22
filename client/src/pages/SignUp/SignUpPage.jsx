import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import React , {useState} from 'react';
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
import googleSign from '../../images/googleSign.png';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();



  const [email, setEmail] = useState("");
  const [password, setPassword] =useState(""); 
  const [first, setFirst] = useState("");
  const [last, setLast] =useState(""); 


  function emailHandler(e){
    setEmail(e.target.value);
  }

  function passwordHandler(e){
    setPassword(e.target.value);
  }

   function firstHandler(e){
    setFirst(e.target.value);
  }

  function lastHandler(e){
    setLast(e.target.value);
  }


  

   function onSubmitHandler(e){
     e.preventDefault(); 
     console.log(email,password, last, first);

     if(email.trim().length===0||password.trim().length==0){
        return;
     }

      const requestBody={
        query:`
          mutation{
            createUser(userInput:{email:"${email}", password: "${password}"}){
                _id
                email
                
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
          throw new Error('Failed!');
        }
            return res.json();
        }).then(resData=>{

            if(resData.errors){
              alert("User Already Exist")
            }else{
              setEmail("");
              setFirst("");
              setLast("");
              setPassword("");

              alert("Registered successfully!!, now go to login page ");
            }

        }).catch(err =>{
            console.log(err);
      });
  }


  return (
      <div>

        <AppNavbar></AppNavbar>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
                
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={emailHandler}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
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
                </Grid>
        
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="#" variant="body2" to="/login">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        
        </Container>

    </div>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import SwipeableDrawer from './EventDrawer.jsx';
import '../events.css';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function AppNavbar() {
    const classes = useStyles();
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Grid item xs={12} container direction="row" alignItems="center"> 
                    <Grid item xs={1} justify="flex-end">
                        <SwipeableDrawer />
                    </Grid>

                    <Grid item xs={1} justify="flex-start">
                        <Typography variant="h6" className={classes.title}> 
                            Anyvent
                        </Typography>
                    </Grid>

                    <Grid item xs={5}>
                        
                    </Grid>

                    <Grid container item xs={2} justify="flex-start">
                        <SearchBar></SearchBar>
                    </Grid>

                    <Grid item xs={1}>
                        
                    </Grid>


                    <Grid item xs={1} justify="flex-end">
                        <Link className="logLink" to="/signUp">
                            <Button color="inherit" variant="outlined">Sign Up</Button>
                        </Link>
                    </Grid> 

                    <Grid item xs={1} justify="flex-end">
                        <Link className="logLink" to="/login">
                            <Button color="inherit" variant="outlined">Login</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default AppNavbar
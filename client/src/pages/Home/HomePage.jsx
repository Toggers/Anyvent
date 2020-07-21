import React,{useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../events.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import Title from './Title.jsx';
import mountain from '../../images/mountain.png';

function HomePage() {
    return(
        <div>
            <AppNavbar></AppNavbar>

            
            
            <br></br>
            <br></br>                
            
            <Grid container direction="row" justify="center">
                <Grid item xs={6} container justify="center">
                    <Paper elevation={3} square={false}>
                        <Title></Title>
                    </Paper>
                </Grid>

            
                <Grid item xs={12}>
                    <br></br>
                    <br></br>
                    <br></br>
                </Grid>
 
                <Grid item xs={12} container justify="center">
                    <Grid item xs={2} >
                        <Paper elevation={3}>
                            <Grid item xs={12} container justify="center" direction="row">
                                <Grid item xs={10} container justify="center">
                                    <h3 className="homeChoice">Join an Event</h3>
                                </Grid>

                                <Grid item xs={2} container justify="center" alignItems="center">
                                
                                <button className="smallRectangle">
                                    <Link href="#" variant="body2" to="/joinEvent">
                                    <ArrowForwardIosIcon style={{ fontSize: 30 }} color="secondary"></ArrowForwardIosIcon> 
                                    </Link>
                                </button>
                                
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={1}>

                    </Grid>

                    <Grid item xs={2} >
                        <Paper elevation={3}>
                            <Grid item xs={12} container justify="center" direction="row">
                                <Grid item xs={10} container justify="center">
                                    <h3 className="homeChoice">{" "}Create an Event</h3>
                                </Grid>

                                <Grid item xs={2} container justify="center" alignItems="center">
                                <button className="smallRectangle">
                                    <Link href="#" variant="body2" to="/createEvent">
                                    <ArrowForwardIosIcon style={{ fontSize: 30 }} color="secondary"></ArrowForwardIosIcon> 
                                    </Link>
                                </button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    
                </Grid>

                <Grid item xs={4}>

                </Grid>
            </Grid>
          
        </div>
    )
}

export default HomePage
import React,{useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../events.css';
import homeCalendar from '../../images/homeCalendar.png';
import search from '../../images/search.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

function Title() {
    return (
        <div>
            
            <Grid container direction="row" item xs={12}>
                <Grid item xs={9} container justify="center" alignItems="center">
                    <Grid item xs={2} >
                        <Grid container justify="center">
                            <img className="search" src={search} />
                        </Grid>
                    </Grid>

                    <h1 className="titleMain">F I N D</h1>
                </Grid>

                <Grid item xs={3}>

                </Grid>

                <Grid item xs={3}>

                </Grid>

                <Grid item xs={9} container justify="center">
                    <h1 className="titleText">events near you...</h1>
                </Grid>
            
                <Grid item xs={9} container justify="center" alignItems="center">
                    <Grid item xs={2}>
                        <Grid container justify="center">
                            <img className="homeCalendar" src={homeCalendar} />
                        </Grid>
                    </Grid>
                    <h1 className="titleMain">H O S T</h1>
                </Grid>

                <Grid item xs={3}>

                </Grid>

                <Grid item xs={3}>

                </Grid>

                <Grid item xs={9} container justify="center">
                    <h1 className="titleText">your own events...</h1>
                </Grid>
            </Grid>
           
        
        </div>
    )
}

export default Title
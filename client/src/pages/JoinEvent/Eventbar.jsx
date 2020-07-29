import React, {useState} from 'react';
import DropDown from './DropDown.jsx'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { blue } from '@material-ui/core/colors';


function Eventbar({showAll, hideAll}) {
	const [viewAll, setViewAll] = useState(false) 

	function onViewAll() {
		setViewAll(true)
		showAll()
	}

	function onHideAll() {
		setViewAll(false)
		hideAll()
	}

    return(
        
    <Grid item xs={12} container justify="center"> 
			<Grid item xs={8}> 
				<Paper elevation={3}> 
					<Grid item xs={12} container direction="row" alignItems="center"> 
							<Grid item xs={1}>
								
							</Grid>

							<Grid item xs={2}>
								<h3>All Events</h3>
							</Grid>

							<Grid container item xs={3} justify="flex-start">
                                
							</Grid>

							<Grid item xs={2}>
								
							</Grid>

							<Grid item xs={2}>
                                <DropDown></DropDown>
							</Grid>

							<Grid item xs={2}>
								{!viewAll&&<Button variant="outlined" color="primary" onClick={onViewAll}>View All</Button>}
								{viewAll&&<Button variant="outlined" color="primary" onClick={onHideAll}>Hide All</Button>}
							</Grid>
					
					</Grid>

				</Paper>
			</Grid>
        </Grid>
    )
}

export default Eventbar
import React, {useState} from 'react';
import '../events.css';
import '../AppNavBar/AppNavbar.jsx'
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Eventbar from './Eventbar.jsx'


function Events(){

	const [result,setResult]= useState([]); 

	function fetchEvents(){
		const requestBody={
			query:`
				query {
					events{
						_id
						title
						description
						date
						price
					}
				}
			`
 		}
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
		}).then(resData =>{
			
			const events1= resData.data.events;
			setResult(events1);

		}).catch(err =>{
   			console.log(err);
		});
	};


	fetchEvents();
 	
	const eventlist = result.map(element =>{
		return <div key={element._id} className="events_list-item" > {element.title}</div>
	});
 	
    return (

    	<div>
			<AppNavbar />
			
			<Grid container spacing={1} direction="row">

				<Grid className="grid_vert-space" container justify="center">
				
					<h1>Join Our Events</h1>

				</Grid>

				<Grid container justify="center">
					<Grid item xs={4}>
						<p>We have hundreds of live events you can join, like hackathons, concerts, conventions, and art shows!</p>
					</Grid>
				</Grid>

			</Grid>
			

			<Eventbar />

   			<ul className="event_list">
   	
   				{eventlist}
   	
   			</ul>
   	
   		</div>
    );
}

export default Events;
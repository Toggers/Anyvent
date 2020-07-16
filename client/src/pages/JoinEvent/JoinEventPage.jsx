import React, {useState, useEffect} from 'react';
import '../events.css';
import '../AppNavBar/AppNavbar.jsx'
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Eventbar from './Eventbar.jsx';
import PageController from './PageController.jsx';
import EventItem from './EventItem.jsx';

function Events(){
	const [events, setEvents] = useState([])

	function fetchEvents(){
		const requestBody={
			query:`
				query {
					events{
						_id
						title
						description
						eventDate
						address_location
						address_city
						address_state
						address_zipcode
						capacity
						category
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
			setEvents(events1);

		}).catch(err =>{
   			console.log(err);
		});
	};

	useEffect(() => {
		fetchEvents()
	}, [])
 	
	const eventlist = events.map(element =>{
		return <EventItem key={element._id} event_id={element._id} title={element.title} description={element.description} date={element.eventDate} place={`${element.address_location} ${element.address_city} ${element.address_state} ${element.address_zipcode}`}> </EventItem>
	});


    const [totalEvents, setTotalEvents] = useState(100)

    return (

    	<div>
			<AppNavbar />
			
			<br></br>

			<Grid container spacing={1} direction="row">
				
				<Grid className="grid_vert-space" container justify="center">
				
					<h1>Join Our Events</h1>

				</Grid>

				<Grid container justify="center">
					<Grid item xs={4}>
						<div className="joinEventText">
							<p>We have hundreds of live events you can join, like hackathons, concerts, conventions, and art shows!</p>
						</div>
					</Grid>
				</Grid>

			</Grid>
			
			<br></br>

			<Eventbar />

			<br></br>

			<Grid item xs={12} container justify="center"> 
			<Grid item xs={8}> 
			
					<Grid item xs={12} className="event" container direction="row"> 			
							{eventlist}
                    </Grid> 
               
               </Grid> 

            </Grid>
   			
			<br></br>

			<Grid item xs={12} container justify="center" alignItems="center">
				<Paper>
					<PageController totalEvents={ totalEvents } />
				</Paper> 
            </Grid> 

			<br></br>
   	
   		</div>
    );
}

export default Events;

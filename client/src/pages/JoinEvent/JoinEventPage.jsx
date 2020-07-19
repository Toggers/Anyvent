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
						imageURL
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
			console.log(events1)
			setEvents(events1);

		}).catch(err =>{
   			console.log(err);
		});
	};

	useEffect(() => {
		fetchEvents()
	}, [])
 	
	const eventlist = events.map(element =>{
		return <EventItem key={element._id} event_id={element._id} title={element.title} imageURL ={element.imageURL} description={element.description} date={element.eventDate} place={`${element.address_location} ${element.address_city} ${element.address_state} ${element.address_zipcode}`}> </EventItem>
	});


    const [totalEvents, setTotalEvents] = useState(100)

 	
    return (

    	<div>
			<AppNavbar />
			
			<br></br>
			<br></br>
			<br></br>

			<Grid item xs={12} container justify="center">
              <div className="joinRectangle"></div>
            </Grid>

			<Grid container spacing={1} direction="row">
				
				<Grid className="joinEventTitle" container justify="center">

					<Grid item xs={12}>
						<br></br>
					</Grid>
					
					<h1>Our Upcoming Events</h1>
					
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
			<br></br>

			<Eventbar />

			<br></br>
			<br></br>


			<Grid item xs={12} container justify="center"> 
			<Grid item xs={8}> 
				
					<Grid item xs={12} container direction="row"> 
						
						
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

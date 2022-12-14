import React, {useState, useEffect} from 'react';
import '../events.css';
import '../AppNavBar/AppNavbar.jsx'
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Eventbar from './Eventbar.jsx';
import PageController from './PageController.jsx';
import EventItem from './EventItem.jsx';

import AuthContext from '../../context/auth-context';

function Events(){
	const [events, setEvents] = useState([])
	const [totalEvents, setTotalEvents] = useState(0)
	const [viewAll, setViewAll] = useState(false)
	//const [filter, setFilter] = useState("")

	var filter = ""
	var eventsPerPage = 5

	function fetchEvents(pageNum){
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
			const events1= resData.data.events

			const eventsOnPage = [];
			var firstEvent = (pageNum - 1) * eventsPerPage
			var lastEvent = firstEvent + eventsPerPage
		
			var i = firstEvent
			while (i < lastEvent) {
				if (i > events1.length - 1) {
					break
				}

				if (filter === "") {
					eventsOnPage[i] = events1[i]
				} else {
					if (events1[i].category === filter) {
						eventsOnPage[i] = events1[i]
					}
					lastEvent++
				}

				i++
			}
			setEvents(eventsOnPage);
			setTotalEvents(events1.length)
		
		}).catch(err =>{
   			console.log(err);
		});
	};

	useEffect(() => {
		fetchEvents(1)
	}, [])
 	

	function showAll() {
		eventsPerPage = totalEvents
		setViewAll(true)
		fetchEvents(1)
	}

	function hideAll() {
		eventsPerPage = 10
		if (filter != "") {
			
		} else {	
			setViewAll(false)
		}
		fetchEvents(1)
	}

	function filterEvents(type) {
		filter = type
		console.log(type)
		if (type === "") {
			setViewAll(false)
		} else {
			setViewAll(true)
		}
		fetchEvents(1)
	}

 	
    return (
    	<AuthContext.Consumer>

    	 {(context)=>{
          	return (

    	<div>
			<AppNavbar />
		
			<Grid item xs={12} container justify="center">
              <div className="joinRectangle"></div>
            </Grid>

			<Grid container spacing={1} direction="row">
				
				<Grid className="joinEventTitle" container justify="center">

					<Grid item xs={12}>
						<br></br>
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

			<Eventbar showAll={showAll} hideAll={hideAll} filterEvents={filterEvents}/>

			<br></br>

			<Grid item xs={12} container justify="center"> 
			<Grid item xs={8}> 
				
					<Grid item xs={12} container direction="row"> 
						
						
							{//eventlist

								events.map(element =>{
								return (<EventItem key={element._id} context={context} event_id={element._id} title={element.title} price={element.price} imageURL ={element.imageURL} description={element.description} date={element.eventDate} place={`${element.address_location} ${element.address_city} ${element.address_state} ${element.address_zipcode}`}> </EventItem>);
								})
							}
				
					
                    </Grid> 
               
               </Grid> 

            </Grid>
   			
			<br></br>

			<Grid item xs={12} container justify="center" alignItems="center">
				<Paper>
					{!viewAll&&<PageController totalEvents={totalEvents}  fetchEvents={fetchEvents} eventsPerPage={eventsPerPage}/>}
				</Paper> 
            </Grid> 

			<br></br>
   	
   		</div>
     );
        }}
    	
   		</AuthContext.Consumer>
    );
}

export default Events;

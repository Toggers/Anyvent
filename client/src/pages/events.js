import React, {useState} from 'react';
import './events.css';

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
		return <li key={element._id} className="events_list-item" > {element.title}</li>
	});
 	
    return (

    	<div>
   			<h1>Welcome to Event page</h1>

   			<ul className="event_list">
   	
   				{eventlist}
   	
   			</ul>
   	
   		</div>
    );
}

export default Events;
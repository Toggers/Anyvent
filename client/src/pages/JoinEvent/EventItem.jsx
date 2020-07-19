import React, {useState, useEffect} from 'react';
import '../events.css';
import '../AppNavBar/AppNavbar.jsx'
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageController from './PageController.jsx';
import Divider from '@material-ui/core/Divider';

function EventItem ({title, description, date, place, event_id, imageURL}) {

    var gapi = window.gapi
    var CLIENT_ID = "828540566167-q88jt3ch2bnineavqegae2t6volaqfeq.apps.googleusercontent.com"
    var API_KEY = "AIzaSyChVexDZG5Mtd5M6-Gsbf6wGP1Txb3mh50"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly"

    const handleClick = () => {
      gapi.load('client:auth2', () => {
        console.log('loaded client')

        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })

        gapi.client.load('calendar', 'v3', () => console.log('bam!'))

        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          var event = {
            'summary': 'Awesome Event!',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'Really great refreshments',
            'start': {
              'dateTime': '2020-07-28T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': '2020-07-28T17:00:00-09:00',
              'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }

          console.log(">>>0 " + gapi.client)
          console.log(">>>1 " + gapi.client.calendar)
          console.log(">>>2 " + gapi.client.calendar.events)

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })

          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
      

        })
      })
    }

    function buyTicketHandler(){
       console.log("click buy");

      const requestBody={
        query:`
          mutation{
            createTicket(eventID: "${event_id}"){
                _id
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
      }).then(resData =>{

        alert(`Purchased!! The default user with id: ${"5f0fbb9d33fd28024c74694f"} has purchased the event ${title}, event id: ${event_id}      ......  Check Database`);

      }).catch(err =>{
        console.log(err);
      });

    }

    return(
        <div>
            
            <Grid  item xs={12} container direction="row" alignItems="center" justify="space-evenly"> 
                    <Grid item xs={6}>
                        <img src ={imageURL} alt="image here" height="200px" width="300px"/>
                    </Grid>

                    <Grid item xs={6}>
                        <h2>{title}</h2>
                    </Grid>



                    <Grid item xs={6}>
                        
                    </Grid>

                    <Grid item xs={6}>
                        <p>{description}</p>
                    </Grid>


                    <Grid item xs={12}>
                        <br></br>
                    </Grid>


                    <Grid item xs={6}>
                        
                    </Grid>

                    <Grid item xs={6}>
                        <Divider></Divider>
                    </Grid>

              
                    <Grid item xs={6}>
                        
                    </Grid>

                    <Grid item xs={3}>
                        <p> {date}</p>
                    </Grid>

                    <Grid item xs={3}>
                        <p>{place}</p>
                    </Grid>


                  
                    <Grid item xs={6}>
                        
                    </Grid>

                    <Grid item xs={3}>
                        <button onClick={handleClick}>Add Event To Calendar</button>
                 
                    </Grid>

                    <Grid item xs={3}>
                        <button onClick={buyTicketHandler}>Buy Ticket</button>
                 
                    </Grid>
                  
            </Grid>

            <br></br>
            <br></br>

            <Divider></Divider>
        </div>
            
    )
}

export default EventItem
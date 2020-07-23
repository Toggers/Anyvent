import React, {useState, useEffect} from 'react';
import '../events.css';
import '../AppNavBar/AppNavbar.jsx'
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageController from './PageController.jsx';
import Divider from '@material-ui/core/Divider';
import Payment from './Payment.jsx'

function EventItem ({context, title, description, date, place, event_id, imageURL, price}) {

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
            'summary': title,
            'location': place,
            'description': description,
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

    const [buyTicket, setBuyTicket]=useState(false);

    function buyTicketHandler(){
       console.log("click buy");
       setBuyTicket(true);
    }

    function buyFreeHandler(){
      const requestBody={
        query:`
          mutation{
            createTicket(eventID: "${event_id}", userID: "${context.userId}"){
                _id
                ticketNum

            }
          }
        `
      };

      const token=context.token;

      fetch('http://localhost:8000/graphql',{
          method: 'POST',
          body:JSON.stringify(requestBody),

          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token

         }

      }).then(res =>{
        
        if(res.status !==200 &&res.status !==201){
          throw new Error('Failed!');
        }
        return res.json();
      }).then(resData =>{

        setBuyTicket(false);
        alert(`Purchased!! Ticket Number: ${resData.data.createTicket.ticketNum} The user with id: ${context.userId} has purchased the event ${title}, event id: ${event_id}      ......  Check Database`);

      }).catch(err =>{
        console.log(err);
      });
    }
    function notSigninHandler(){
      alert("Please sign in first");
    }

    const event = {
      title: title,
      price: price
    }

    return(
        <div>
          <Grid container direction="row" justify="center"> 
            <Grid item xs={12} container direction="row" alignItems="flex-start"> 
              <Grid item xs={5} container direction="row">
                <Grid item xs={12}>
                  <br></br>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <img className="eventPhoto" src ={imageURL} alt="image here" height="100%" width="100%"/>
                </Grid>
              </Grid>
              
              <Grid item xs={7} container> 
                      <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={11}>
                          <h2>{title}</h2>
                      </Grid>

                      <Grid item xs={1}>
                        
                      </Grid>
                      <Grid item xs={11}>
                          <p>{description}</p>
                      </Grid>


                      <Grid item xs={12}>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                      </Grid>

                      <Grid item xs={1}>
                        
                      </Grid>
                      <Grid item xs={11}>
                          <Divider></Divider>
                      </Grid>

              
                      <Grid item xs={6} container justify="center">
                          <p className="dateText"> &nbsp;&nbsp;&nbsp;&nbsp;{date}</p>
                      </Grid>

                      <Grid item xs={6} container justify="center">
                          <p>{place}</p>
                      </Grid>


                      <Grid item xs={6} container justify="center">
                          <button onClick={handleClick}>Add Event To Calendar</button>
                  
                      </Grid>

                      <Grid item xs={6} container justify="center">
                         {!context.token&&<button onClick={notSigninHandler}>Buy Ticket</button>}
                         {context.token&&!buyTicket&&<button onClick={buyTicketHandler}>Buy Ticket</button>}
                         {context.token&&buyTicket&&price===0&&<button onClick={buyFreeHandler}>Get Free</button>}
                        
                         {context.token&&buyTicket&&price!==0&&<Payment event={event} context={context} event_id={event_id}></Payment>}
                      </Grid>
                    
              </Grid>
            </Grid>
          </Grid>

            <br></br>
            <br></br>

            <Divider></Divider>

          
        </div>
            
    )
}

export default EventItem
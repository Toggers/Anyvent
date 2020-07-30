import React,{useState, useContext, useEffect} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import AuthContext from '../../context/auth-context';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


 function Refund() {
  
   const [tickets, setTickets] = useState([]);
   let contextValue = useContext(AuthContext);

    const token =contextValue.token;

    function fetchTickets(){

      const requestBody={
        query:`
          query {
            tickets{
              _id
              ticketNum
              user{
                _id
                email
                
              }
              event{
                _id
                title
                imageURL
                description
                eventDate
                address_location
                address_city
                address_state
                address_zipcode
                price

              }
              
            }
          }
        `
      }
      fetch('http://localhost:8000/graphql',{
          method: 'POST',
          body:JSON.stringify(requestBody),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          }
      }).then(res =>{
          if(res.status !==200 &&res.status !==201){
              throw new Error('Failed!');
          }
          return res.json();
      }).then(resData =>{
        const tickets= resData.data.tickets;
        const filteredList = tickets.filter(v => v.ticketNum.indexOf('CANCELEVENT') !== -1);
        
        setTickets(filteredList);




      }).catch(err =>{
          console.log(err);
      });
    };

    function confirmHandler(ticket_id){
      console.log(ticket_id);

      const requestBody={
            query:`
              mutation{
                cancelTicket(ticketID: "${ticket_id}"){
                    _id
                }
              }
            `
          };


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

           
            alert(`Refund Successfully`);



            

          }).catch(err =>{
            console.log(err);
          });

      
    }

    useEffect(() => {
      fetchTickets()
    });
  
  return (
      <div>
        <AppNavbar></AppNavbar>    


                  <h2 style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', fontSize: '30px', color:'blue' }}> Request Refund from Users</h2>

          {tickets.length===0 && <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', fontSize: '30px', color:'green' }}>No User request for refund</div>}

          <Grid container  style={{padding:24 }} spacing={3}>
            {tickets.length!==0 &&tickets.map (element=>(
                  <Grid item xs ={12} sm={6} lg={4} xl={3} key= {element._id}>

                      <Card>
                        <CardMedia title={element.event.title} />
                        <CardContent>
                          <Typography gutterBottom  variant="h4" component="h4"> 
                            <strong>{element.event.title}</strong>

                          </Typography>

                          <Typography  component ="p"> 
                            <strong>Ticket Id: </strong> {element._id}
                          </Typography>

                          <Typography  component ="p"> 
                            <strong>Price: </strong> {element.event.price}
                          </Typography>


                          <Typography  component ="p"> 
                            <strong>Reason to cancel : </strong> {element.ticketNum.substr(element.ticketNum.indexOf('CANCELEVENT')+12)}
                          </Typography>

                          <Typography  component ="p"> 
                            <strong>User : </strong> {element.user.email}
                          </Typography>

                          
                        </CardContent>

                       
                          <CardActions>
                            <Button size="small" color="primary" style={{ flex: 1 }} onClick={(e)=>confirmHandler(element._id)} > Give Permission to Refund </Button>
                          </CardActions>
                      </Card>
                  </Grid>
                ))}
             </Grid>
      
        
    </div>
  );
}

export default Refund;
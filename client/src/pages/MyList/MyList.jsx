import React,{useState, useContext, useEffect} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';


import CircularProgress from '@material-ui/core/CircularProgress';



import  EachTicket from './EachTicket';



import AuthContext from '../../context/auth-context';


function MyListPage(){
   
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] =useState(true);

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
        const filteredList = tickets.filter(v => v.user._id === contextValue.userId);
        
        setTickets(filteredList);

        setLoading(false);
        

      }).catch(err =>{
          console.log(err);
      });
    };

    useEffect(() => {
      fetchTickets()
    });
  
  

    return (
      
      <div>
      <AppNavbar></AppNavbar>    

          <h2 style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', fontSize: '30px' }}> My Lists</h2>


          {loading &&
              <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center'}}><CircularProgress disableShrink />
              </div>}  

          {!loading && 

            (tickets.length!==0  ? (
            <div >
              
              <Grid container  style={{padding:24 }} spacing={3}>
                {tickets.map (element=>(
                  <Grid item xs ={12} sm={6} lg={4} xl={3} key= {element._id}>
                    <EachTicket key= {element._id} ticket={element} context={contextValue} />
                  </Grid>
                ))}
                
              </Grid>
            </div>
          ) : (<div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center'}}> <h2>You did not buy any ticket yet</h2></div>))}
      </div>
    );
}

export default MyListPage;



  



import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogPage from './Dialog';

import RequestPage from './RequestRefund';


function EachTicket({ticket, context}){
	const [open, setOpen]=useState(false);
	const [price, setPrice]=useState(false);
	const [reason, setReason]= useState("");


	function handleCancel(){
		setOpen(true);

		if(ticket.event.price!==0){
			setPrice(true);
		}
	}

	function handleCancelYes(){
		setOpen(false);
		


			const requestBody={
		        query:`
		          mutation{
		            cancelTicket(ticketID: "${ticket._id}"){
		                _id
		                title
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

		       
		        alert(`Cancel Successfully`);

		      }).catch(err =>{
		        console.log(err);
		      });
		
	}
	function handleCancelNo(){
		setOpen(false);
	}

	function sumbitRequest(e){
		setOpen(false);
		const requestBody={
		        query:`
		        	mutation{
  						updateTicketRefund(ticketID:"${ticket._id}", cancelReason:"${" CANCELEVENT " + reason}"){
    						_id
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

		       
		        alert(`Sending Request...`);

		      }).catch(err =>{
		        console.log(err);
		      });
		
		
	}

	function handletextChange(e){
		console.log(e.target.value);
		setReason(e.target.value);
	}
	return(
		<div>

			{
				open && !price && <DialogPage ticket={ticket} context={context} cancelYes={handleCancelYes} cancelNo={handleCancelNo} open={open} ></DialogPage>
			}

			{
				open && price && <RequestPage ticket={ticket} context={context} onSumbit={sumbitRequest} cancelNo={handleCancelNo} open={open} reason={handletextChange}></RequestPage>
			}

			{ticket ? (
				<Card>
					<CardMedia style={{height:0, paddingTop:'56.25%'}} image={ticket.event.imageURL} title={ticket.event.title} />
					<CardContent>
						<Typography gutterBottom  variant="h4" component="h4"> 
							<strong>{ticket.event.title}</strong>

						</Typography>

						<Typography  component ="p"> 
							<strong>Description: </strong> {ticket.event.description}
						</Typography>

						<Typography  component ="p"> 
							<strong>Event Date: </strong> {ticket.event.eventDate}
						</Typography>

						<Typography  component ="p"> 
							<strong>Location: </strong> {ticket.event.address_location} {ticket.event.address_city} {ticket.event.address_state}{ticket.event.address_zipcode}
						</Typography>
					</CardContent>

					{ ticket.ticketNum.indexOf('CANCELEVENT')===-1 ? 
						(<CardActions>
							<Button size="small" color="primary" style={{ flex: 1 }} onClick={handleCancel} > Cancel </Button>
						</CardActions>): (
						<div><h3 style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', color:'green' }}>Sending Refund Request.....</h3></div>
						)}
				</Card>
			): null }

			

		</div>
	);
}

export default EachTicket;
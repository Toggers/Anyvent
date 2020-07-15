import React,{useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../events.css';
import imageFiller from '../../images/imageFiller.png';
import AddIcon from '@material-ui/icons/Add';


function CreateEvent(){

  const [title,setTitle]= useState(""); 
  const [description,setDescription]= useState(""); 
  const [price,setPrice]= useState(0); 
  const [date,setDate]= useState("2020-07-08T16:10:44.426Z"); 


  function handleTitleChange(e){                                                   //2. e is syntax event
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e){                                                   //2. e is syntax event
    setDescription(e.target.value);
  }

  function handlePriceChange(e){                                                   //2. e is syntax event
    setPrice(e.target.value);
  }

  function handleDateChange(e){                                                   //2. e is syntax event
    setDate(e.target.value);
  }


  function onSubmitHandle(e){                                                      //5. after sumbit, this function will trigger 
   
      e.preventDefault();                                                            //6. need to write this to use console.log() 
      console.log('state = ', title, description, price,date );

      const requestBody={
        query:`
          mutation{
            createEvent(eventInput:{title:"${title}", description:"${description}",price: ${price},date: "${date}"}){
                _id
                title
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
      }).catch(err =>{
        console.log(err);
      });




  };



    return (
      
      <div>
      <AppNavbar></AppNavbar>      
            
            <br></br>
            <br></br>

            
            <Grid container justify="center">
            <Grid item xs={7}>
              <Paper elevation={3}>
               <Grid item xs={12}>
                
                  <Grid container justify="center">
                    <h1>Create an Event</h1>
                  </Grid>
                
                </Grid> 
                </Paper>
            </Grid>
            </Grid>


            <br></br>
            <br></br>
            
            <Grid item xs={3} container justify="center">
              <div className="imageRectangle"></div>
            </Grid>

            <br></br>

            <Grid item xs={3} container justify="center">
              <div className="addPhoto">
                <button onclick="changeImage()">
                  <Grid container alignItems="center" justify="space-between">
                    <AddIcon></AddIcon> 
                    Add Event Photo
                  </Grid>
                </button>
              </div>
            </Grid>

            <Grid item xs={3} container justify="center">
              <img className="imageFiller" src={imageFiller} />
            </Grid>

            
                   
            <Grid container justify="center">
            <Grid item xs={7}>
              <Paper elevation={2} className="inputPaper">
               <Grid item xs={12}>
                
                  <Grid container justify="center" direction="row" spacing={6}>

                      <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Title: </span>

                       </Grid>

                       <Grid item xs={6}>
                          <input  type="text" style={{width: "120%"}} value ={title} onChange={handleTitleChange} required/>    
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>
                      

                      <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Description: </span>

                       </Grid>

                       <Grid item xs={6}>
                        <input type="text" style={{width: "120%"}} value ={description} onChange={handleDescriptionChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid> 

                       <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Price: </span>

                       </Grid>

                       <Grid item xs={6}>
                          <input type="number" style={{width: "120%"}} value ={price} onChange={handlePriceChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>

                       <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Date: </span>

                       </Grid>

                       <Grid item xs={6}>
                          <input type="text" style={{width: "120%"}} value ={date} onChange={handleDateChange} placeholder = "2020-07-08T16:10:44.426Z" required/> 
                       </Grid>

                       <Grid item xs={3}>
                          
                       </Grid>
                      

                      
                       <Grid item xs={12} container justify="center">
                          <Grid item xs={4} container justify="center">
                            <form onSubmit={onSubmitHandle}>  
                              <button>Sumbit</button>
                            </form>
                          </Grid>
                       </Grid>

                      
                  </Grid>
                
                </Grid> 
                </Paper>
            </Grid>
            </Grid>
        </div>
    );
}

export default CreateEvent;
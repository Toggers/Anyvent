import React,{useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../events.css';
import imageFiller from '../../images/imageFiller.png';
import AddIcon from '@material-ui/icons/Add';
import ReactFilestack from 'filestack-react';


function CreateEvent(){

  const [category, setCategory] = useState("Hackthon");
  const [capacity, setCapacity] =useState(0); 
  const [title,setTitle]= useState(""); 
  const [description,setDescription]= useState(""); 
  const [price,setPrice]= useState(0); 


  const [address_location,setAddress_location]= useState(""); 
  const [address_city,setAddress_city]= useState(""); 
  const [address_state,setAddress_state]= useState(""); 
  const [address_zipcode,setAddress_zipcode]= useState(11111); 

  const [time,setTime]=useState("00:00");
  const [eventDate,setEventDate]= useState(""); 

  const [imageURL, setImageURL] =useState("");
  const [imageName, setImageName]=useState("");


  
  function handleTitleChange(e){                                                   //2. e is syntax event
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e){                                                   //2. e is syntax event
    setDescription(e.target.value);
  }

  function handlePriceChange(e){                                                   //2. e is syntax event
    setPrice(e.target.value);
  }

  function handleAddress_locationChange(e){                                                   //2. e is syntax event
    setAddress_location(e.target.value);
  }

  function handleAddress_cityChange(e){                                                   //2. e is syntax event
    setAddress_city(e.target.value);
  }
  function handleAddress_stateChange(e){                                                   //2. e is syntax event
    setAddress_state(e.target.value);
  }
  function handleAddress_zipcodeChange(e){                                                   //2. e is syntax event
    setAddress_zipcode(e.target.value);
  }

  function handleTimeChange(e){
    console.log(e.target.value);
    setTime(e.target.value);
  }

  function handlEventDateChange(e){                                                   //2. e is syntax event
    setEventDate(e.target.value);
  }

  function handleCapacityChange(e){
    setCapacity(e.target.value);
  }

  function handleCategoryChange(e){
    setCategory(e.target.value);
  }

 



  function onSubmitHandle(e){                                                      //5. after sumbit, this function will trigger 
   
      e.preventDefault();                                                            //6. need to write this to use console.log() 
      const actual_time=eventDate+" "+time;
      console.log('state = ', title, description, price, e.target.name, actual_time, imageURL);

      const requestBody={
        query:`
          mutation{
            createEvent(eventInput:{category: "${category}", title:"${title}", description:"${description}", address_location: "${address_location}", address_city: "${address_city}", address_state: "${address_state}", address_zipcode: ${address_zipcode},capacity: ${capacity},price: ${price}, eventDate: "${actual_time}",date: "${new Date()+""}",  imageURL: "${imageURL}"}){
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
          alert("There is error!!! Make sure you upload the image and fill in all the fields!!!")
          throw new Error('Failed!');
        }
        return res.json();
      }).then(resData=>{
        console.log(resData);
        if(resData.errors){
          
          alert("There is an error!! Make sure you upload the image and fill in all the fields!!!")
        }else{
          setCategory("Hackthon");
          setCapacity(0); 
          setTitle(""); 
          setDescription(""); 
          setPrice(0); 


          setAddress_location(""); 
          setAddress_city(""); 
          setAddress_state(""); 
          setAddress_zipcode(11111); 

          setTime("00:00");
          setEventDate(""); 

          setImageURL("");
          setImageName("");

          alert("Successful!!");

        }





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

            <Grid item xs={3} container justify="center" alignItems="center">
                <div className="addPhoto">
              
                      <ReactFilestack
                        apikey={"AZwqWYMVLRYCOCtIQDBqAz"}
                        onSuccess={(res) => {
                          setImageURL(res.filesUploaded[0].url);
                          setImageName(res.filesUploaded[0].filename);
                        }

                      }
                        required/>
                      {imageName} 
                  
                  <br/>
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
                       
                          <span>   Category: </span>

                       </Grid>

                       <Grid item xs={6}>
                          <select value={category} onChange={handleCategoryChange} >
                             <option value="Hackthon">Hackthon</option>
                              <option value="Art Show">Art Show</option>
                                <option value="Convention">Convention</option>
                              <option value="Concert">Concert</option>
                          </select>
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>
                       

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
                       <textarea style={{width: "120%", height: "100px"}} value ={description} onChange={handleDescriptionChange} required> </textarea>
                       </Grid>

                       <Grid item xs={3}>

                       </Grid> 


                        <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Capacity: </span>

                       </Grid>

                       <Grid item xs={6}>
                           <input  type="number" style={{width: "120%"}} value ={capacity} onChange={handleCapacityChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>


                          <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Street: </span>

                       </Grid>

                       <Grid item xs={6}>
                           <input  type="text" style={{width: "120%"}} value ={address_location} onChange={handleAddress_locationChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>

                          <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>City: </span>

                       </Grid>

                       <Grid item xs={6}>
                            <input style={{width: "120%"}} type="text" value ={address_city} onChange={handleAddress_cityChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>


                          <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>State: </span>

                       </Grid>

                       <Grid item xs={6}>
                            <input style={{width: "120%"}} type="text" value ={address_state} onChange={handleAddress_stateChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>


                          <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Zipcode: </span>

                       </Grid>

                       <Grid item xs={6}>
                            <input className="text" type="text" value ={address_zipcode} onChange={handleAddress_zipcodeChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>
                      


                      <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Event Date: </span>

                       </Grid>

                       <Grid item xs={6}>
                         <input type="date" value ={eventDate} onChange={handlEventDateChange} required/> 
                       </Grid>

                       <Grid item xs={3}>

                       </Grid>

                       <Grid item xs={1}>

                      </Grid>
                      <Grid item xs={2} container justify="center">
                       
                          <span>Event Time: </span>

                       </Grid>

                       <Grid item xs={6}>
                          <input type="time"  value={time} required onChange={handleTimeChange}/>
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

            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default CreateEvent;

import React,{useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar.jsx';

function CreateEvent(){

  const [title,setTitle]= useState(""); 
  const [description,setDescription]= useState(""); 
  const [price,setPrice]= useState(0); 


  function handleTitleChange(e){                                                   //2. e is syntax event
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e){                                                   //2. e is syntax event
    setDescription(e.target.value);
  }

  function handlePriceChange(e){                                                   //2. e is syntax event
    setPrice(e.target.value);
  }

  


  function onSubmitHandle(e){                                                      //5. after sumbit, this function will trigger 
   
      e.preventDefault();                                                            //6. need to write this to use console.log() 
      console.log('state = ', title, description, price);

      const requestBody={
        query:`
          mutation{
            createEvent(eventInput:{title:"${title}", description:"${description}",price: ${price},date: "${new Date(Date.now()).toISOString()}"}){
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
      
    <form onSubmit={onSubmitHandle}>   
      <AppNavbar></AppNavbar>                                     
            <div>
               <span>Title: </span>
               <input  type="text" value ={title} onChange={handleTitleChange} required/>    
            </div>

            <div>
              <span>Description: </span>
               <input type="text" value ={description} onChange={handleDescriptionChange} required/> 
            </div>
            <div>
              <span>Price: </span>
               <input type="number" value ={price} onChange={handlePriceChange} required/> 
            </div>

           

            <button>sumbit</button>

         </form>
    );
}

export default CreateEvent;
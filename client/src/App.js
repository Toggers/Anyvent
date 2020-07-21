import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CreateEventsPage from './pages/CreateEvent/CreateEventPage';
import JoinEventsPage from './pages/JoinEvent/JoinEventPage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';


import './App.css';




function App() { 

  return (
    <BrowserRouter>
      
      	<Switch>
      		
      		 <Route path="/joinEvent" exact component={JoinEventsPage}/>
        		 <Route path="/" exact component={HomePage}/>
        	     <Route path="/createEvent" exact component={CreateEventsPage}/>
               <Route path="/login" exact component={LoginPage}/>
               <Route path="/signup" exact component={SignUpPage}/>

      	</Switch>
    </BrowserRouter>
  );
}

export default App;
import React, {useState} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CreateEventsPage from './pages/CreateEvent/CreateEventPage';
import JoinEventsPage from './pages/JoinEvent/JoinEventPage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';

import MyTickets from './pages/MyList/MyList';
import Refund from './pages/Admin/Refund';

import AuthContext from './context/auth-context';


import './App.css';




function App() { 

  const [variable, setVariable]=useState({
    token: null,
    userId: null
  });

  function login (token, userId, tokenExpiration){
    setVariable({token: token, userId: userId});
  }

  function logout(){
    setVariable({token:null, userId:null});
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{token: variable.token, userId: variable.userId, login: login, logout:logout}}>
      	<Switch>
      		      {variable.token && variable.userId!=="5f2304eb3cbc9b06c8450c29" &&<Redirect from="/login" to ="/joinEvent" exact />}
                {variable.token &&<Redirect from="/login" to ="/requestRefund" exact />}
      		      <Route path="/joinEvent" exact component={JoinEventsPage}/>
        		    <Route path="/" exact component={HomePage}/>
        	      {variable.token && <Route path="/createEvent" exact component={CreateEventsPage}/>}
               <Route path="/login" exact component={LoginPage}/>
               <Route path="/signup" exact component={SignUpPage}/>
                {variable.token && <Route path="/mytickets" exact component={MyTickets}/>}
                {variable.token && variable.userId==="5f2304eb3cbc9b06c8450c29" &&<Route path="/requestRefund" exact component={Refund}/>}

      	</Switch>
      </AuthContext.Provider>
    </BrowserRouter>

  );
}

export default App;
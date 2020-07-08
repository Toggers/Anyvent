import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import EventsPage from './pages/events';
import CreateEventsPage from './pages/createEventPage';
import './App.css';


function App() {
  return (
    <BrowserRouter>
    
      <Route path="/" exact component={EventsPage}/>
      <Route path="/createEvent" exact component={CreateEventsPage}/>
    
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import './App.css';
import {Login} from './components/Login';
import {TodoApp} from './components/TodoApp';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
function LoggedIn(login){
  if(!login){
    return(<Login></Login>);
  }else{
    return(<TodoApp></TodoApp>);
  }
}
function App() {
  if(localStorage.getItem('isLoggedIn')===undefined){
    localStorage.setItem('isLoggedIn',false);
  }
  const login=localStorage.getItem('isLoggedIn');
  return (
    <Router>
      <div className="App">
        {LoggedIn(login)}
      </div>
    </Router>
  );
}

export default App;

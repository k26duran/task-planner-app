import React from 'react';
import './App.css';
import {Login} from './components/Login';
import {TodoApp} from './components/TodoApp';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
function LoggedIn(login){
  const loginView =() =>(<Login></Login>);
  const todoAppView =() =>(<TodoApp></TodoApp>);
  if(!login){
    return(<div><Route exact path="/" component={loginView}></Route></div>);
  }else{
    return(<div><Route component={todoAppView}></Route></div>);
  }
}
function App() {
  if(localStorage.getItem('isLoggedIn')===undefined){
    localStorage.setItem('isLoggedIn',false);
  }
  const login=localStorage.getItem('isLoggedIn');
  return (
    <Router>
      <Switch>
      
        {LoggedIn(login)}
      
      </Switch>
    </Router>
  );
}

export default App;

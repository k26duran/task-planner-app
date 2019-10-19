import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Register} from "./Register/Register";
import {TaskPlanner} from "./TaskPlanner/TaskPlanner";
import {Profile} from "./Profile/Profile";
import {NewTask} from "./Task/NewTask";
import {UpdateTask} from "./Task/UpdateTask";
import {Login} from "./Login/Login";
import {Filter} from "./Task/Filter"

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <div>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/taskPlanner" component={TaskPlanner}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/filter" component={Filter}/>
                        <Route exact path="/taskPlanner/newTask" component={NewTask}/>
                        <Route exact path="/taskPlanner/updateTask" component={UpdateTask}/>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;

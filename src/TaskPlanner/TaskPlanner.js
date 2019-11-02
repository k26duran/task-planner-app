import React from "react";
import "./TaskPlanner.css";
import AppBar from "./AppBar";
import {TaskList} from "../Task/TaskList";
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";

export class TaskPlanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user:"",
            tasks: [ ]
        };
        this.axios = axios.create({
            baseURL: 'http://localhost:8081/taskPlanner/v1/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenAuthentication")}
        });
    }

    componentDidMount() {
        const self = this;
        this.axios.get("http://localhost:8081/taskPlanner/v1/users/usernameEmail/" + localStorage.getItem("user"))
            .then(function (response) {
                self.setState({user: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
        this.axios.get("http://localhost:8081/taskPlanner/v1/tasks")
            .then(function (response) {
                let tasksList = [];
                response.data.forEach(function (task) {
                    tasksList.push(
                        task
                    )
                });
                self.setState({tasks: tasksList});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <AppBar/>
                
                <div id="todoList">
                    <TaskList task={this.state.tasks}/>
                    <Link to={{pathname: "/taskPlanner/newTask"}}>
                        <Fab color="primary" aria-label="add" id="addButton">
                            <AddIcon />
                        </Fab>
                        </Link>
                </div>
                
            </div>
        );
    }
}
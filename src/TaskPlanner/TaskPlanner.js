import React from "react";
import "./TaskPlanner.css";
import AppBar from "./AppBar";
import {TaskList} from "../Task/TaskList";
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

export class TaskPlanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [ ]
        };
    }

    componentDidMount() {
        fetch("http://localhost:8081/taskPlanner/v1/tasks")
            .then(response => response.json())
            .then(data => {
                let tasksList = [];
                data.forEach(function (task) {
                    tasksList.push(
                       task
                    )
                });
                this.setState({tasks: tasksList});
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
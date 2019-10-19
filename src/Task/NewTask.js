import React from "react";
import "./Task.css";
import {Link, Redirect} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";

export class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.location.state,
            newTask: {
                title: "",
                description: "",
                status: "",
                dueDate:  moment(),
                responsible: {
                    name: "",
                    email: ""
                },
                priority:0
            },
            isCreated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handlePriority= this.handlePriority.bind(this);
    }

    handleTitle(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: e.target.value,
                description: prevState.newTask.description,
                status: prevState.newTask.status,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                },
                priority:prevState.newTask.priority
            }
        }));
    }

    handleDescription(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: e.target.value,
                status: prevState.newTask.status,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                },
                priority:prevState.newTask.priority
            }
        }));
    }

    handleStatus(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: prevState.newTask.description,
                status: e.target.value,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                },
                priority:prevState.newTask.priority
            }
        }));
    }

    handleDueDate(date) {
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: prevState.newTask.description,
                status: prevState.newTask.status,
                dueDate: date,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                },
                priority:prevState.newTask.priority
            }
        }));
    
    }
    handlePriority(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: prevState.newTask.description,
                status: prevState.newTask.status,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                },
                priority:e.target.value
            }
        }));
    }

    handleResponsible(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: prevState.newTask.description,
                status: prevState.newTask.status,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: e.target.value,
                    email: e.target.value + "@mail.com"
                },
                priority:prevState.newTask.priority
            }
        }));
    }

    handleCreate(e) {
        e.preventDefault();
        const title = this.state.newTask.title;
        const description = this.state.newTask.description;
        const status = this.state.newTask.status;
        const dueDate = this.state.newTask.dueDate;
        const responsible = this.state.newTask.responsible.name;
        
        if (!title.length || !description.length || !status.length || !dueDate || !responsible.length) {
            alert("You must enter all fields to create a task.");
            return;
        }
        fetch("http://localhost:8081/taskPlanner/v1/tasks", {
          method: 'POST',
          body: JSON.stringify(this.state.newTask),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert("Success: you have created a new task!");
            this.setState({isCreated: true});
        });
    }

    render() {
        const estados = [
            { value: "COMPLETE"}, { value: "IN_PROGRESS" }, { value: "READY"}
          ]
        if (this.state.isCreated)
            return <Redirect to={{pathname: "/taskPlanner"}}/>;
        return (
            <React.Fragment>
             <main className="layout">
                <div style={{textAlign: "left",marginTop:"5%"}}>
                    <Link to="/taskPlanner" className="btnBack"><ArrowBackIcon style={{color:"#f44336"}}/></Link>
                </div>
                <div id="newTodo">    
                    <Card className="Todo">
                        <div style={{textAlign: "center", marginTop:"8%",marginBottom: "5%"}}>
                            <h1>New Task </h1>
                        </div>
                        <Divider/>
                        <form noValidate autoComplete="off" onSubmit={this.handleCreate} className="form">
                            <TextField
                                id="title"
                                label="Title"                  
                                onChange={this.handleTitle}
                                value={this.state.newTask.title}
                                margin="normal"
                            ></TextField>
                            <br></br>
                            <TextField
                                id="description"
                                label="Description"                  
                                onChange={this.handleDescription}
                                value={this.state.newTask.description}
                                margin="normal"
                            >
                            </TextField>
                            <br></br>
                            <TextField
                                id="priority"
                                label="Priority"
                                type="number"
                                onChange={this.handlePriority}
                                value={this.state.newTask.priority}
                                margin="normal"
                            >
                            </TextField>
                            <br></br>
                            <TextField
                                id="status"
                                select
                                label="Status"
                                value={this.state.newTask.status}
                                onChange={this.handleStatus}
                                margin="normal"
                                helperText="Please select a status"
                            >{estados.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.value}
                                </MenuItem>
                            ))}
                            </TextField>
                            <p></p>
                            <DatePicker
                                id="due-date"
                                selected={this.state.newTask.dueDate}
                                placeholderText="Due date"
                                onChange={this.handleDueDate}>
                            </DatePicker>
                            <br></br>
                            <TextField
                                id="responsible"
                                label="Responsable"                  
                                onChange={this.handleResponsible}
                                value={this.state.newTask.responsible.name}
                                margin="normal"
                            >
                            </TextField>
                            <br></br>
                            <div style={{textAlign: "right"}}>
                                <div className="btnCreateTask">
                                    <Fab style={{backgroundColor:"#f44336", marginRight:"15px"}}>
                                        <button id="createTask" type={"submit"}>
                                            <CheckIcon/>
                                        </button>
                                    </Fab>
                                </div>
                            </div>
                        </form>
                    </Card>    
                </div>
             </main>
            </React.Fragment>
        );
    }
}
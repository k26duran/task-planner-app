import React from "react";
import "./Task.css";
import Divider from "@material-ui/core/Divider";
import {Link, Redirect} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import Card from '@material-ui/core/Card';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import moment from "moment";

export class UpdateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updatedTask: {
                id: this.props.location.state,
                title: "",
                description: "",
                status: "",
                dueDate: moment(),
                responsible: {
                    name: "",
                    email: ""
                },
                priority:0
            },
            isUpdated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handlePriority = this.handlePriority.bind(this);
    }

    handleTitle(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: e.target.value,
                description: prevState.updatedTask.description,
                status: prevState.updatedTask.status,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                }
            }
        }));
    }

    handleDescription(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: e.target.value,
                status: prevState.updatedTask.status,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                },
                priority: prevState.updatedTask.priority
            }
        }));
    }
    handlePriority(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: prevState.updatedTask.description,
                status: prevState.updatedTask.status,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                },
                priority:e.target.value
            }
        }));
    }
    handleStatus(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: prevState.updatedTask.description,
                status: e.target.value,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                },
                priority: prevState.updatedTask.priority
            }
        }));
    }

    handleDueDate(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: prevState.updatedTask.description,
                status: prevState.updatedTask.status,
                dueDate: e.target.value,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                },
                priority: prevState.updatedTask.priority
            }
        }));
    }

    handleResponsible(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: prevState.updatedTask.description,
                status: prevState.updatedTask.status,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: e.target.value,
                    email: e.target.value + "@mail.com"
                },
                priority: prevState.updatedTask.priority
            }
        }));
    }

    handleUpdate(e) {
        e.preventDefault();
        const self = this;
        axios.put("http://localhost:8081/taskPlanner/v1/tasks", self.state.updatedTask)
            .then(function (response) {
                alert("Success: you have updated the task!");
                self.setState({isUpdated: true});
            })
            .catch(function (error) {
                console.log("Error: it could not update the task. --> " + error);
            });
    }

    componentDidMount() {
        fetch("http://localhost:8081/taskPlanner/v1/tasks/" + this.state.updatedTask.id)
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => ({
                    updatedTask: {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        status: data.status,
                        dueDate: data.dueDate,
                        responsible: {
                            name: data.responsible.name,
                            email: data.responsible.email
                        },
                        priority: data.priority
                    }
                }));
            });
    }

    render() {
        const estados = [
            { value: "COMPLETE"}, { value: "IN_PROGRESS" }, { value: "READY"}
          ]

        if (this.state.isUpdated)
            return <Redirect to={{pathname: "/taskPlanner"}}/>;
        return (
            <React.Fragment>
            <main className="layout">
               <div style={{textAlign: "left",marginTop:"5%"}}>
                   <Link to="/taskPlanner" className="btnBack"><ArrowBackIcon style={{color:"#f44336"}}/></Link>
               </div>
               <div id="newTodo">    
                <Card className="Todo">   
                <div style={{textAlign: "center", marginTop:"3%",marginBottom: "3%"}}>
                    <h1>Update Task </h1>
                </div>
                <Divider/>
                <form onSubmit={this.handleUpdate}>
                    <div>
                    <br></br>
                    <TextField
                        id="title"
                        label="Title"                  
                        onChange={this.handleTitle}
                        value={this.state.updatedTask.title}
                        margin="normal"
                    ></TextField>
                    <br></br>
                    <TextField
                        id="description"
                        label="Description"                  
                        onChange={this.handleDescription}
                        value={this.state.updatedTask.description}
                        margin="normal"
                    >
                    </TextField>
                    <br></br>
                    <TextField
                        id="priority"
                        label="Priority"
                        type="number"
                        onChange={this.handlePriority}
                        value={this.state.updatedTask.priority}
                        margin="normal"
                    >
                    </TextField>
                    <br></br>
                    <TextField
                        id="status"
                        select
                        label="Status"
                        value={this.state.updatedTask.status}
                        onChange={this.handleStatus}
                        margin="normal"
                        helperText="Please select a status"
                    >{estados.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.value}
                        </MenuItem>
                    ))}
                    </TextField>
                <br></br>
                <TextField style={{}}
                    id="dueDate"
                    type="date"
                    label="DueDate"
                    value={this.state.updatedTask.dueDate}
                    onChange={this.handleDueDate}
                />
                <br></br>
                <TextField
                    id="responsible"
                    label="Responsable"                  
                    onChange={this.handleResponsible}
                    value={this.state.updatedTask.responsible.name}
                    margin="normal"
                >
                </TextField>
                <br></br>    
                </div>
                <div style={{textAlign: "right"}}>
                    <div className="btnUpdateTask">
                        <Fab style={{backgroundColor:"#f44336", marginRight:"10%",marginBottom: "10%"}}>
                            <button id="updateTask" type={"submit"}>
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
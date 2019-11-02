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
            id: this.props.location.state,
            title: "",
            description: "",
            status: "",
            dueDate: moment(),
            responsible:"",
            priority:0,
            isUpdated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handlePriority = this.handlePriority.bind(this);
        this.axios = axios.create({
            baseURL: 'http://localhost:8081/taskPlanner/v1/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenAuthentication")}
        });
    }

    handleTitle(e) {
        this.setState({title: e.target.value});
    }

    handleDescription(e) {
        this.setState({description: e.target.value});
    }
    handlePriority(e) {
        this.setState({priority: e.target.value});
    }
    handleStatus(e) {
        this.setState({status: e.target.value});
    }

    handleDueDate(e) {
        this.setState({dueDate: e.target.value});
    }

    handleResponsible(e) {
        this.setState({responsible: e.target.value});
    }

    async handleUpdate(e) {
        e.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        const dueDate = this.state.dueDate;
        const responsible = this.state.responsible;
        const priority = this.state.priority;
        let ok = true;
        const self = this;
        await this.axios.put("http://localhost:8081/taskPlanner/v1/tasks", {
            id: this.state.id,
            title: title,
            description: description,
            status: status,
            dueDate: dueDate,
            responsible: null,
            priority:priority
        })
            .then(function (response) {
                alert("Success updated task!");
            })
            .catch(function (error) {
                console.log("Error!!=" + error);
                ok = ok && false;
            });
        if (responsible.length) {
            await this.axios.get("http://localhost:8081/taskPlanner/v1/users/usernameEmail/" + this.state.responsible)
                .then(function (response) {
                    self.setState({responsible: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                    ok = ok && false;
                });
            await this.axios.put("http://localhost:8081/taskPlanner/v1/users/tasks/" + this.state.id, this.state.responsible)
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                    ok = ok && false;
                });
        }
        if (ok) {
            this.setState({isUpdated: true});
        }
    }

    componentDidMount() {
        const self = this;
        this.axios.get("http://localhost:8081/taskPlanner/v1/tasks/" + this.state.id)
            .then(function (response) {
                self.setState({
                    title: response.data.title,
                    description: response.data.description,
                    status: response.data.status,
                    dueDate: response.data.dueDate,
                    responsible: response.data.responsible !== null ? response.data.responsible.email : "",
                    priority: response.data.priority,
                });
            })
            .catch(function (error) {
                console.log(error);
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
                        value={this.state.title}
                        margin="normal"
                    ></TextField>
                    <br></br>
                    <TextField
                        id="description"
                        label="Description"                  
                        onChange={this.handleDescription}
                        value={this.state.description}
                        margin="normal"
                    >
                    </TextField>
                    <br></br>
                    <TextField
                        id="priority"
                        label="Priority"
                        type="number"
                        onChange={this.handlePriority}
                        value={this.state.priority}
                        margin="normal"
                    >
                    </TextField>
                    <br></br>
                    <TextField
                        id="status"
                        select
                        label="Status"
                        value={this.state.status}
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
                    value={this.state.dueDate}
                    onChange={this.handleDueDate}
                />
                <br></br>
                <TextField
                    id="responsible"
                    label="Responsable"                  
                    onChange={this.handleResponsible}
                    value={this.state.responsible.name}
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
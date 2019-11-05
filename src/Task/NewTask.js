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
import axios from "axios";

export class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            title: "",
            description: "",
            status: "",
            dueDate:  moment(),
            responsible: "",
            priority:0,
            file:"",
            isCreated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handlePriority= this.handlePriority.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.axios = axios.create({
            baseURL: 'http://localhost:8081/taskPlanner/v1/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenAuthentication")}
        });
    }
    handleFile(e){
        this.setState({file : e.target.files[0]});
    }
    handleTitle(e) {
        this.setState({title: e.target.value});
    }

    handleDescription(e) {
        this.setState({description: e.target.value});
    }

    handleStatus(e) {
        this.setState({status: e.target.value});
    }

    handleDueDate(date) {
        this.setState({dueDate: date.target.value});
    
    }
    handlePriority(e) {
        this.setState({priority: e.target.value});    }

    handleResponsible(e) {
        this.setState({responsible: e.target.value});
    }

    async handleCreate(e) {

        e.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        const dueDate = this.state.dueDate;
        const responsible = this.state.responsible;
        const priority = this.state.priority;
        
        if (!title.length || !description.length || !status.length || !dueDate) {
            alert("Fill all the spaces!");
            return;
        }
        const self = this;
        let data = new FormData();
        data.append('file', this.state.file);
        let file=null;
        await this.axios.post('http://localhost:8081/taskPlanner/v1/files', data)
            .then(function (response) {
                console.log("file uploaded!", data);
                file= response.data;
               // alert("File Uploaded!");
        })
        .catch(function (error) {
            console.log("failed file upload", error);
            alert("Error failes to uploaded file");
        });

        let ok = true;
        
        await this.axios.post('http://localhost:8081/taskPlanner/v1/tasks',{
            title: title,
            description: description,
            status: status,
            dueDate: dueDate,
            priority: priority,
            responsible: null,
            fileURL:file
        })
            .then(function (response) {
                alert("Success creation!");
                self.setState({id: response.data.id});
            })
            .catch(function (error) {
                alert("Oh oh, something happen! Try again.");
                console.log(error);
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
            this.setState({isCreated: true});
        }
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
                    <Card className="Todo" style={{marginBottom: "10%"}}>
                        <div style={{textAlign: "center", marginTop:"8%",marginBottom: "5%"}}>
                            <h1>New Task </h1>
                        </div>
                        <Divider/>
                        <form noValidate autoComplete="off" onSubmit={this.handleCreate} className="form">
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
                            <p></p>
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
                                value={this.state.responsible}
                                margin="normal"
                            >
                            </TextField>
                            <br></br>
                            <input style={{marginTop:"7%", marginLeft:"2%"}}
                                type="file" 
                                id="file"
                                onChange={this.handleFile}
                            />
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
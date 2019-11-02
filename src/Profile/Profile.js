import React from "react";
import "./Profile.css";
import Avatar from '@material-ui/core/Avatar';
import avatar from "../imgs/avatar.png";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from "@material-ui/core/Divider";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name:  "",
            username: "",
            email:  "",
            pwd:  "",
            isUpdated: false
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.axios = axios.create({
            baseURL: 'http://localhost:8081/taskPlanner/v1/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("tokenAuthentication")}
        });
    }

    handleNameInput(e) {
        this.setState({name: e.target.value});
    }

    handleUsernameInput(e) {
        this.setState({username: e.target.value});
    }

    handleEmailInput(e) {
        this.setState({email: e.target.value});
    }

    handlePwdInput(e) {
        this.setState({pwd: e.target.value});
    }

    handleUpdate(e) {
        e.preventDefault();
        const name = this.state.name;
        const username = this.state.username;
        const email = this.state.email;
        const pwd = this.state.pwd;
        localStorage.setItem("name", name);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("pwd", pwd);
        
        localStorage.setItem("user", email);
        const self = this;
        this.axios.put("http://localhost:8081/taskPlanner/v1/users", {
            id: this.state.id,
            name: name,
            username: username,
            email: email,
            password: pwd
        })
            .then(function (response) {
                alert("Success update profile!");
                self.setState({isUpdated: true});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount() {
        const self = this;
        this.axios.get("http://localhost:8081/taskPlanner/v1/users/usernameEmail/" + localStorage.getItem("user"))
            .then(function (response) {
                self.setState({
                    id: response.data.id,
                    name: response.data.name,
                    username: response.data.username,
                    email: response.data.email,
                    pwd: response.data.password,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (this.state.isUpdated) return <Redirect to="/taskPlanner"/>;
        return (
            <React.Fragment>
            <CssBaseline />
            <main className="layout">
                <div style={{textAlign: "left",marginTop:"5%"}}>
                   <Link to="/taskPlanner" className="btnBack"><ArrowBackIcon style={{color:"#f44336"}}/></Link>
                </div>
                <Paper className="paper">
                    <Avatar id="avatar" className="avatar" src={avatar}  />
                    <div style={{textAlign: "center",marginBottom: "3%"}}>
                        <h1>My Profile </h1>
                    </div>
                    <Divider/>
                    <form id="form" onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <Input 
                                id="name" 
                                name="name" 
                                onChange={(e)=>this.handleNameInput(e)} 
                                autoComplete="Name" 
                                autoFocus 
                                value={this.state.name}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Username</InputLabel>
                            <Input 
                                id="username" 
                                name="username" 
                                onChange={(e)=>this.handleUsernameInput(e)} 
                                autoComplete="Username" 
                                autoFocus 
                                value={this.state.username}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                onChange={(e)=>this.handleEmailInput(e)} 
                                autoComplete="email" 
                                autoFocus 
                                value={this.state.email}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.pwd}
                                onChange={(e)=>this.handlePwdInput(e)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Confirm Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.pwd}
                                onChange={(e)=>this.handlePwdInput(e)}
                            />
                        </FormControl>
                        <div style={{textAlign: "center"}}>
                        <Button
                            id="submit"
                            type="submit"
                            variant="raised"
                            className="submit"
                            onClick={this.handleUpdate}                     
                        >
                            SAVE
                        </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
        );
    }
}
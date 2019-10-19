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

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
            username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
            email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
            pwd: localStorage.getItem("pwd") ? localStorage.getItem("pwd") : "",
            isUpdated: false
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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
        alert("Success: you have updated your profile!");
        this.setState({
            name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
            username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
            email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
            pwd: localStorage.getItem("pwd") ? localStorage.getItem("pwd") : "",
            isUpdated: true
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
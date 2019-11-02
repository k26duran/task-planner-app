import React from "react";
import "./Register.css";
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

export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            pwd: "",
            pwdVerify: "",
            isRegistered: false
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handlePwdVerifyInput = this.handlePwdVerifyInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handlePwdVerifyInput(e) {
        this.setState({pwdVerify: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const name = this.state.name;
        const username = this.state.username;
        const email = this.state.email;
        const pwd = this.state.pwd;
        const pwdVerify = this.state.pwdVerify;
        if (!name.length || !username.length || !email.length || !pwd.length || !pwdVerify.length) {
            alert("Complete de spaces, try again!");
            return;
        }
        if (pwd !== pwdVerify) {
            alert("Verify password. Try again!");
            return;
        }
        const self = this;
        axios.post('http://localhost:8081/taskPlanner/v1/user/register', {
            name: self.state.name,
            username: self.state.username,
            email: self.state.email,
            password: self.state.pwd
        })
            .then(function (response) {
                alert("Success registration!");
                self.setState({isRegistered: true});
            })
            .catch(function (error) {
                console.log(error);
                alert("Error... Try again!");
            });
    }

    render() {
        if (this.state.isRegistered) return <Redirect to="/taskPlanner"/>;
        return (
        <React.Fragment>
            <CssBaseline />
            <main className="layout">
                <div style={{textAlign: "left",marginTop:"5%"}}>
                   <Link to="/" className="btnBack"><ArrowBackIcon style={{color:"#f44336"}}/></Link>
                </div>
                <Paper className="paper">
                    <Avatar id="avatar" className="avatar" src={avatar}  />
                    <div style={{textAlign: "center", marginTop:"8%",marginBottom: "5%"}}>
                        <h2>Register </h2>
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
                                value={this.state.pwdVerify}
                                onChange={(e)=>this.handlePwdVerifyInput(e)}
                            />
                        </FormControl>
                        <Button
                            id="submit"
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            className="submit"
                            onClick={this.handleSubmit}                     
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
        );
    }

}
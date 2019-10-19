import React from "react";
import "./Login.css";
import {Link, Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pwd: "",
            isLoggedIn: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserInput(e) {
        this.setState({user: e.target.value});
    }

    handlePwdInput(e) {
        this.setState({pwd: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = this.state.user;
        const pwd = this.state.pwd;
        if (!user.length || !pwd.length) {
            alert("You must enter your email or username and password.");
            return;
        }
        const localUsername = localStorage.getItem("username");
        const localEmail = localStorage.getItem("email");
        const localPwd = localStorage.getItem("pwd");
        if ((localUsername !== user || localEmail !== user) && localPwd !== pwd) {
            alert("Incorrect credentials. Try again!");
            return;
        } else {
            this.setState({isLoggedIn: true});
            localStorage.setItem("isLoggedIn", "true");
        }
    }

    render() {
        if (this.state.isLoggedIn) return <Redirect to="/taskPlanner"/>;
        return (
            <React.Fragment>
            <CssBaseline />
            <main className="layout">
                <Paper className="paper">
                    <Avatar id="avatar" className="avatar" src="/logo.png"  />
                    <Typography variant="headline">SIGN IN</Typography>
                    <form id="form" onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                onChange={(e)=>this.handleUserInput(e)} 
                                autoComplete="email" 
                                autoFocus 
                                value={this.state.user}/>
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
                        <Button
                            id="submit"
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            className="submit"
                            onClick={this.handleSubmit}                     
                        >
                            Sign in
                        </Button>
                        <InputLabel htmlFor="link"> Don't have an account? <Link to="/register">Create one!</Link></InputLabel>
            
                    </form>
                </Paper>
            </main>
        </React.Fragment>
        );
    }
}

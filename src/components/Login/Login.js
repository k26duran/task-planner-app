import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css'

export class Login extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {email:"", password: ""};    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswdChange = this.handlePasswdChange.bind(this);
    }

    loggedIn(e){
        e.preventDefault();
        const email = document.getElementById("email").value; 
        const password = document.getElementById("password").value;
        if(email!=="" && password!==""){
            localStorage.setItem('name', 'Karen Duran');
            localStorage.setItem('email', email);
            localStorage.setItem('password',password);
            localStorage.setItem('isLoggedIn', true);
            window.location.href = "/home";
        }
    }
    
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    handlePasswdChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    render(){
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
                                    onChange={(e)=>this.handleEmailChange(e)} 
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
                                    value={this.state.password}
                                    onChange={(e)=>this.handlePasswdChange(e)}
                                />
                            </FormControl>
                            <Button
                                id="submit"
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className="submit"
                                onClick={this.loggedIn}                     
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

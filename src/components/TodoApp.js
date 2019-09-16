import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {TodoList} from './TodoList'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';
import { TextField} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationDrawer from './NavigationDrawer';
import './TodoApp.css';

export class TodoApp extends React.Component {
constructor(props) {

    super(props);
    this.state = {items: [], text: '', priority: 0, dueDate: moment(), status:'',checked: true};
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStatusChange= this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
}

render() {
    const estados = [
        { value: "Completed"}, { value: "In Progress" }, { value: "Ready"}
      ]    
    return (
    <React.Fragment>
     <CssBaseline />
     <NavigationDrawer></NavigationDrawer>
     <main className="layout"> 
      <div>
        {this.state.checked ? (
            <div id="todoList">
                <TodoList todoList={this.state.items}/> 
                <Fab color="primary" aria-label="add" id="addButtom">
                    <AddIcon onClick={() => this.handleChange(false)}/>
                </Fab>
            </div>
        
        ) : (
        <div id="newTodo">    
        <Card className="Todo">
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit} className="form">
                <Typography variant="headline">New Task</Typography>
                <TextField
                    id="text"
                    label="Description"                  
                    onChange={this.handleTextChange}
                    value={this.state.text}
                    margin="normal"
                >
                </TextField>
                <br></br>
                <TextField
                    id="priority"
                    label="Priority"
                    type="number"
                    onChange={this.handlePriorityChange}
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
                    onChange={this.handleStatusChange}
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
                    selected={this.state.dueDate}
                    placeholderText="Due date"
                    onChange={this.handleDateChange}>
                </DatePicker>
                <br></br>
                <br></br>
                <Button type="submit" variant="raised" color="primary" className="submit">
                    Add #{this.state.items.length + 1}
                </Button>
            </form>
            <p />
        </Card>    
        </div>
        )}
     </div>
     </main>
    </React.Fragment>
    );
}

handleTextChange(e) {
    this.setState({
        text: e.target.value
    });
}

handleChange(checked) {
    this.setState({ checked: checked });
}

handleStatusChange(e) {
    this.setState({
        status: e.target.value
    });
}

handlePriorityChange(e) {
    this.setState({
        priority: e.target.value
    });
}

handleDateChange(date) {
    this.setState({
        dueDate: date
    });
}

handleSubmit(e) {

    e.preventDefault();

    if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate || !this.state.status)
        return;

    const newItem = {
        text: this.state.text,
        priority: this.state.priority,
        dueDate: this.state.dueDate,
        status: this.state.status,

    };
    this.setState(prevState => ({
        items: prevState.items.concat(newItem),
        text: '',
        priority: '',
        dueDate: '',
        status:''
    }));
    this.handleChange(true);
}

}
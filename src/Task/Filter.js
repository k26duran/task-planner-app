import React from "react";
import "./Task.css";
import {Link, Redirect} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dueDate: moment(),
            priority: 0,
            status: "",
        };
        this.handleDueDateFilter = this.handleDueDateFilter.bind(this);
        this.handlePriorityFilter = this.handlePriorityFilter.bind(this);
        this.handleStatusFilter = this.handleStatusFilter.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleDueDateFilter(e) {
        this.setState({dueDate: e.target.value});
    }

    handlePriorityFilter(e) {
        this.setState({priority: e.target.value});
    }

    handleStatusFilter(e) {
        this.setState({status: e.target.value});
    }

    handleClear(e) {
        this.setState({
            dueDate: "",
            responsible: "",
            status: ""
        });
    }
    handleFilter(e){

    }

    render() {
        const estados = [
            { value: "COMPLETE"}, { value: "IN_PROGRESS" }, { value: "READY"}
          ]
       
        return (
            <React.Fragment>
             <main className="layout">
                <div style={{textAlign: "left",marginTop:"5%"}}>
                    <Link to="/taskPlanner" className="btnBack"><ArrowBackIcon style={{color:"#f44336"}}/></Link>
                </div>
                <div id="newTodo">    
                    <Card className="Todo">
                        <div style={{textAlign: "center", marginTop:"8%",marginBottom: "5%"}}>
                            <h1>Filter Task </h1>
                        </div>
                        <Divider/>
                        <form noValidate autoComplete="off" className="form">
                            <TextField
                                id="priority"
                                label="Priority"
                                type="number"
                                onChange={this.handlePriorityFilter}
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
                                onChange={this.handleStatusFilter}
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
                                onChange={this.handleDueDateFilter}
                            />
                            <br></br>
                            <br></br>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                            <Button style={{backgroundColor:"#f44336",marginRight:"10px", marginBottom:"25px"}} type="submit" variant="raised" color="primary" className="submit" onClick={this.handleFilter}>
                                Apply
                            </Button>
                            <Button style={{backgroundColor:"#f44336", marginBottom:"25px"}} type="submit" variant="raised" color="primary" className="submit" onClick={this.handleClear}>
                                Clear
                            </Button>
                            </Grid>
                        </form>
                    </Card>    
                </div>
             </main>
            </React.Fragment>
        );
    }
}
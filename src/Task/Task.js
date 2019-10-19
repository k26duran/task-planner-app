import React from "react";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import './Todo.css';
import {Redirect} from "react-router-dom";

export class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {
                id: this.props.id,
                title: this.props.title,
                description: this.props.description,
                status: this.props.status,
                dueDate: this.props.dueDate,
                responsible: {
                    name: this.props.responsible.name,
                    email: this.props.responsible.email
                },
                priority:this.props.priority
            },
            update: false
        }
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
    }

    handleOnUpdate(e) {
        e.preventDefault();
        this.setState({update: true});
    }
    getIcon(item) {
        if(item === "COMPLETE") {
          return "/done.png";
        } else if(item==="READY"){
            return "/ready.png";
        } else {
          return "/inprogress.png";
        }
    }

    render() {
        
        if (this.state.update) {
            return <Redirect to={{pathname: "/taskPlanner/updateTask", state: this.state.task.id}}/>
        }
        return (
            <button className="cardTask" onClick={this.handleOnUpdate}>
                <Card id="card">
                    <CardHeader id="cardHeader" avatar={<Avatar id="avatar" style={{width:"50px", height:"50px"}} src={this.getIcon(this.state.task.status)}> </Avatar>}
                    title={"Responsible: "+ this.state.task.responsible.name}
                    subheader={"Task: "+this.state.task.title}> </CardHeader> 
                    <CardContent>
                        < Typography variant="body2" component="p" id="cardHeader" >
                            <strong>Description :</strong> {this.state.task.description}
                        </Typography >
                        < Typography variant="body2" component="p"  >
                            <i>{this.state.task.status} - {this.state.task.dueDate}</i>
                        </Typography >
                    </CardContent>
                </Card>
            </button>
        );
    }
}
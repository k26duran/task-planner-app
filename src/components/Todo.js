import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import './Todo.css';

export class Todo extends React.Component {
    constructor(props) {
        super(props);
    }
    getIcon(item) {
        if(item === "Completed") {
          return "/done.png";
        } else if(item==="Ready"){
            return "/ready.png";
        } else {
          return "/inprogress.png";
        }
    };
    render() {
        return (
            <Card id="card">
                <CardHeader id="cardHeader" avatar={<Avatar id="avatar" src={this.getIcon(this.props.status)}> </Avatar>}
                title={"Autor: "+localStorage.getItem("email")}
                subheader={"Priority: "+this.props.priority}> </CardHeader> 
                <CardContent>
                    < Typography variant="body2" component="p" id="cardHeader" >
                        <strong>Description :</strong> {this.props.text}
                    </Typography >
                    < Typography variant="body2" component="p"  >
                        <i>{this.props.status} - {this.props.dueDate.format('DD-MM-YYYY')}</i>
                    </Typography >
                </CardContent>
            </Card>

        );
    }


}
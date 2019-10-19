import React from "react";
import {Task} from "./Task";

export class TaskList extends React.Component {

    render() {
        const taskList = this.props.task;
        const tasks = taskList.map((task, i) => (
                <div style={{marginRight: "15%", marginLeft:"15%"}} key={"task_" + task.id} >
                    <Task key={"task_" + task.id} id={task.id} title={task.title} description={task.description} status={task.status}
                          priority={task.priority} dueDate={task.dueDate} responsible={task.responsible}/>
                </div>
            )
        );
        return (
            <div >
                {tasks}
            </div>
        );
    }
}
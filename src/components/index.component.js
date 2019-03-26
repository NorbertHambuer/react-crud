// index.component.js

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class TasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {tasks: []};
    }

    componentDidMount(prevProps) {
        axios.get(`https://flask-todo-rest-api.herokuapp.com/tasks`).then(response => this.setState({tasks: response.data.tasks}));
    }

    deleteTask = async (taskId, taskIndex) => {
        axios.delete(`https://flask-todo-rest-api.herokuapp.com/tasks?id=${taskId}`).then(response => {
            let tasks = [...this.state.tasks];
            tasks.splice(taskIndex, 1);
            this.setState({tasks});
        });
    };

    render() {
        return (
            <div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Completed</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    {this.state.tasks.map((task, index) => <Task key={task.id} index={index}
                                                                 removeTaskHandler={(taskId, taskIndex) => this.deleteTask(taskId, taskIndex)} {...task}/>)}
                    </tbody>
                </table>
            </div>)
    }
}

class Task extends React.Component {
    render() {
        const taskDetails = this.props;
        return (
            <tr>
                <td>{taskDetails.description}</td>
                <td>{taskDetails.deadline}</td>
                <td>{taskDetails.completed ? 'Completed' : 'Incompleted'}</td>
                <td><Link to={"/edit/"+taskDetails.id} className="btn btn-primary"><i className="fa fa-edit fa-2x"></i></Link></td>
                <td><i className="fa fa-trash fa-2x" style={{color: 'red'}}
                       onClick={() => this.props.removeTaskHandler(taskDetails.id, taskDetails.index)}></i></td>
            </tr>
        );
    }
}

export default class Index extends Component {

    render() {
        return (
            <div>
                <h2>To do list</h2> <br/>
                <TasksList/>
            </div>
        )
    }
}
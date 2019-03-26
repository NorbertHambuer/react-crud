import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            deadline: '',
            completed: 0,
            toIndex: false
        };
        this.createTaskHandler = this.createTaskHandler.bind(this);
    }

    createTaskHandler() {
        /*Bind needed?*/

        var bodyFormData = new FormData();
        bodyFormData.set('description', this.state.description);
        bodyFormData.set('deadline', this.state.deadline);
        bodyFormData.set('completed', this.state.completed);

        axios.post(`https://flask-todo-rest-api.herokuapp.com/tasks`, bodyFormData)
            .then(res =>  this.setState(() => ({
                toIndex: true
            })));
    };

    render() {
        if (this.state.toIndex === true) {
            return <Redirect to='/index' />;
        }
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Task</h3>
                <form>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" id="description" value={this.state.description}
                               onChange={event => this.setState({description: event.target.value})}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="text" id="deadline" value={this.state.deadline}
                               onChange={event => this.setState({deadline: event.target.value})}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Completed: </label>
                        <input type="checkbox" id="completed" value={this.state.completed}
                               onChange={event => this.setState({completed: !this.state.completed})}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Add" className="btn btn-primary" onClick={this.createTaskHandler}/>
                    </div>
                </form>
            </div>
        )
    }
}
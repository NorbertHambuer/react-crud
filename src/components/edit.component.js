import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from "axios";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            description: '',
            deadline: '',
            completed: 0,
            toIndex: false
        };
        this.updateTaskHandler = this.updateTaskHandler.bind(this);
    }

    setTaskFields(fields){
        let deadlineDate = new Date(fields.deadline);

        var dd = deadlineDate.getDate();
        var mm = deadlineDate.getMonth() + 1; //January is 0!

        var yyyy = deadlineDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var deadlineFormatedDate = dd + '/' + mm + '/' + yyyy;

        this.setState({description: fields.description});
        this.setState({deadline: deadlineFormatedDate});
        this.setState({completed: fields.completed});
    }

    componentDidMount(prevProps) {
        axios.get(`https://flask-todo-rest-api.herokuapp.com/tasks?id=${this.state.id}`).then(response => this.setTaskFields(response.data));
    }

    async updateTaskHandler() {
        /*Bind needed?*/
        var bodyFormData = new FormData();
        bodyFormData.set('id', this.state.id);
        bodyFormData.set('description', this.state.description);
        bodyFormData.set('deadline', this.state.deadline);
        bodyFormData.set('completed', this.state.completed);

        await axios.put(`https://flask-todo-rest-api.herokuapp.com/tasks?id=${this.state.id}`, bodyFormData)
            .then(res => this.setState(() => ({
                toIndex: true
            })));

    };

    render() {
        if (this.state.toIndex === true) {
            return <Redirect to='/index' />;
        }

        return (
            <div style={{marginTop: 10}}>
                <h3>Edit Task</h3>
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
                        <input type="button" value="Update" className="btn btn-primary" onClick={this.updateTaskHandler}/>
                    </div>
                </form>
            </div>
        )
    }
}
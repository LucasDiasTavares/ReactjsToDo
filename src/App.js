import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            activeItem: {
                id: null,
                title: '',
                completed: false
            },
            editing: false,
        }
        this.fetchTasks = this.fetchTasks.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.startEditing = this.startEditing.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    };

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    componentWillMount() {
        this.fetchTasks()
    }

    fetchTasks() {
        fetch('https://lucas-to-do-api.herokuapp.com/api/task-list/')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    todoList: data
                })
            )
    }

    handleChange(event) {
        const value = event.target.value

        this.setState({
            activeItem: {
                ...this.state.activeItem,
                title: value
            }
        })
    }

    startEditing(task) {
        this.setState({
            activeItem: task,
            editing: true
        })
    }

    deleteTask(task) {
        const crsftoken = this.getCookie('crsftoken')

        fetch(`https://lucas-to-do-api.herokuapp.com/api/task-delete/${task.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': crsftoken,
            },
        }).then((response) => {
            this.fetchTasks()
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        var url = ''

        if (this.state.editing === true) {
            var url = `https://lucas-to-do-api.herokuapp.com/api/task-update/${this.state.activeItem.id}/`
            this.setState({ editing: false })
        } else {
            var url = 'https://lucas-to-do-api.herokuapp.com/api/task-create/'
        }

        const crsftoken = this.getCookie('crsftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': crsftoken,
            },
            body: JSON.stringify(this.state.activeItem)
        }).then((response) => {
            this.fetchTasks()
            this.setState({
                activeItem: {
                    id: null,
                    title: '',
                    completed: false
                }
            })
        }).catch((err) => console.log(err)
        )

    }

    render() {

        var tasks = this.state.todoList
        var this2 = this

        return (
            <div className="container">
                <div id="task-container">
                    <div id="form-wrapper">
                        <form id="form" onSubmit={this.handleSubmit}>
                            <div className="d-flex">
                                <div style={{ flex: 6 }}>
                                    <input onChange={this.handleChange}
                                        className="form-control"
                                        id="title" type="text"
                                        name="title"
                                        placeholder="Adicionar tarefa"
                                        value={this.state.activeItem.title}
                                    />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <input id="submit"
                                        className="btn btn-warning"
                                        type="submit"
                                        name="Add" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="list-wrapper">
                        {tasks.map((task, index) =>
                            <div key={index} className="task-wrapper d-flex">

                                <div style={{ flex: 7 }}>
                                    <span>{task.title}</span>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <button onClick={() => this2.startEditing(task)} className='btn btn-sm btn-outline-primary'>Editar</button>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <button onClick={() => this2.deleteTask(task)} className='btn btn-sm btn-outline-danger'>X</button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

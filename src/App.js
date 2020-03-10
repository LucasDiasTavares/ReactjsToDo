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
    };

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

    render() {

        var tasks = this.state.todoList
        console.log(tasks);


        return (
            <div className="container">
                <div id="task-container">
                    <div id="form-wrapper">
                        <form id="form">
                            <div className="d-flex">
                                <div style={{ flex: 6 }}>
                                    <input className="form-control" id="title" type="text" name="title" placeholder="Adicionar tarefa" />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <input id="submit" className="btn btn-warning" type="submit" name="Add" />
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
                                    <button className='btn btn-sm btn-outline-primary'>Editar</button>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <button className='btn btn-sm btn-outline-danger'>Excluir</button>
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

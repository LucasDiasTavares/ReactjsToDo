import React, { Component } from 'react';
import './App.css';

class App extends Component {

    render() {
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

                    </div>
                </div>
            </div>
        );
    }
}

export default App;

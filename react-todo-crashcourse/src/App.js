import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from "./components/Todos";
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';

class App extends Component {
  state = {
    todos: [
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => {
        this.setState({ todos: res.data })
      })
      .catch(err => {
        console.error(err)
      });
  }


  // Toggle Complete
  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => {
        this.setState({
          todos: [...this.state.todos, res.data]
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== id)
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} toggleComplete={this.toggleComplete}></Todos>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

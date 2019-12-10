import React, { Component } from 'react';
import Todo from './Todo';
import PropTypes from 'prop-types'

class Todos extends Component {

    render() {
        return this.props.todos.map((todo) => (
            <Todo key={todo.id} todo={todo} deleteTodo={this.props.deleteTodo} toggleComplete={this.props.toggleComplete}></Todo>
        ));
    }
}

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
}

export default Todos;

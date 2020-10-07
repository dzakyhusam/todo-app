import React from 'react';

class TodoItem extends React.Component {
  render() {
    let statusColor = "";

    switch(this.props.todo.status) {
      case "Approved":
        statusColor = "todo-status green-color";
        break;
      case "In Progress":
        statusColor = "todo-status blue-color";
        break;
      case "In Review":
        statusColor = "todo-status orange-color";
        break;
      case "Waiting":
        statusColor = "todo-status gray-color";
        break;
      default:
        statusColor = "todo-status gray-color";
        break;
    }

    return (
      <div className="today-body-container">
        <label className="todo-list">
          <input type="checkbox"></input>
          <span className="checkmark"></span>
          <p>{ this.props.todo.desc }</p>
        </label>
        <div className={ statusColor }>
          <p>{ this.props.todo.status }</p>
        </div>
      </div>
    )
  }
}

export default TodoItem;
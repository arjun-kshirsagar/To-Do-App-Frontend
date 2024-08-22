import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, deleteTodo, updateTodo }) {
  return (
    <div className="todo-list">
      <div className="todo-header">
        <span className="header-title">Title</span>
        <span className="header-description">Description</span>
        <span className="header-due-date">Due Date</span>
        <span className="header-actions">Actions</span>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
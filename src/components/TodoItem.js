import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const getItemStyle = () => {
    if (todo.completed) {
      return { backgroundColor: '#90EE90' }; // Light green for completed tasks
    } else if (new Date(todo.due_date) < new Date()) {
      return { backgroundColor: '#FFCCCB' }; // Light red for expired tasks
    }
    return { backgroundColor: 'white' }; // White for pending tasks
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo(todo.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <li style={getItemStyle()}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span>{todo.title}</span>
          <p>{todo.description}</p>
          <p>Due Date: {todo.due_date}</p>
          <button onClick={handleEdit}><Pencil size={16} /></button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
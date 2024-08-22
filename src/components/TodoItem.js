import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import TodoDetail from './TodoDetail';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    updateTodo(todo.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setIsEditing(false);
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(todo.due_date);
    return dueDate < today && !todo.completed;
  };

  const getItemClass = () => {
    if (todo.completed) return 'completed-task';
    if (isOverdue()) return 'overdue';
    return '';
  };

  return (
    <>
      <li className={`todo-item ${getItemClass()}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="edit-input"
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="edit-input"
            />
            <span>{todo.due_date}</span>
            <div className="action-buttons">
              <button className="save-button" onClick={handleSave}><Check size={16} /> Save</button>
              <button className="cancel-button" onClick={handleCancel}><X size={16} /> Cancel</button>
            </div>
          </>
        ) : (
          <>
            <span className="todo-title">{todo.title}</span>
            <span className="todo-description" onClick={() => setShowModal(true)}>{todo.description}</span>
            <span className="todo-due-date">{todo.due_date}</span>
            <div className="action-buttons">
              <button className="edit-button" onClick={() => setIsEditing(true)}><Pencil size={16} /> Edit</button>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}><Trash2 size={16} /> Delete</button>
            </div>
          </>
        )}
      </li>
      {showModal && (
        <TodoDetail todo={todo} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default TodoItem;
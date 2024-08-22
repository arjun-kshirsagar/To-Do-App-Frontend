import React from 'react';
import { X } from 'lucide-react';

function TodoDetail({ todo, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>{todo.title}</h2>
        <p><strong>Description:</strong> {todo.description}</p>
        <p><strong>Due Date:</strong> {todo.due_date}</p>
        <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
      </div>
    </div>
  );
}

export default TodoDetail;
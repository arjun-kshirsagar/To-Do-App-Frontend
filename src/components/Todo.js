import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './Todo.css';

const API_URL = 'http://localhost:8000/api/todos/';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [todos, searchQuery]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch todos', error);
      setError(`Failed to fetch todos: ${error.message}`);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  const filterTodos = () => {
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { title, description, completed: false, due_date: dueDate });
      setTitle('');
      setDescription('');
      setDueDate('');
      fetchTodos();
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add todo', error);
      setError(`Failed to add todo: ${error.message}`);
    }
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));

    try {
      await axios.put(`${API_URL}${id}/`, updatedTodo);
    } catch (error) {
      setTodos(todos);
      console.error('Failed to update todo', error);
      setError(`Failed to update todo: ${error.message}`);
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    try {
      await axios.delete(`${API_URL}${id}/`);
    } catch (error) {
      fetchTodos();
      console.error('Failed to delete todo', error);
      setError(`Failed to delete todo: ${error.message}`);
    }
  };

  const updateTodo = async (id, newTitle, newDescription) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, title: newTitle, description: newDescription };

    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));

    try {
      await axios.put(`${API_URL}${id}/`, updatedTodo);
    } catch (error) {
      setTodos(todos);
      console.error('Failed to update todo', error);
      setError(`Failed to update todo: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={() => setShowAddForm(!showAddForm)} className="toggle-add-form">
        {showAddForm ? 'Cancel' : 'Add Todo'}
      </button>
      {showAddForm && (
        <TodoForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          dueDate={dueDate}
          setDueDate={setDueDate}
          addTodo={addTodo}
        />
      )}
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default Todo;
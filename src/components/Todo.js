import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './Todo.css';

const API_URL = 'http://localhost:8000/api/todos/';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { title, description, completed: false, due_date: dueDate });
      setTitle('');
      setDescription('');
      setDueDate('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo', error);
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
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        addTodo={addTodo}
      />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default Todo;
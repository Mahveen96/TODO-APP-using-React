import React, { useState, useEffect, Fragment } from 'react'
import { FaExclamationCircle, FaCheckCircle, FaTrash } from 'react-icons/fa'

const TodoList = () => {
  // Retrieve todos from local storage
  const storedTodos = localStorage.getItem('todos')
  const initialTodos = storedTodos ? JSON.parse(storedTodos) : []

  // Set initial todos state
  const [todos, setTodos] = useState(initialTodos)

  // Update todos state and store in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Setting up a way to keep track of user input by initializing its value to empty string
  const [newTodos, setNewTodos] = useState('')

  // Setting it to an array that will store a boolean value for each todo,
  // indicating whether it has been completed or not.
  const [completed, setCompleted] = useState(Array(todos.length).fill(false))

  // Creates new todos from the user input
  const addTodo = () => {
    if (newTodos.trim() !== '') {
      const newTodo = {
        text: newTodos,
        completed: false,
      }
      setTodos((prevTodos) => [...prevTodos, newTodo])
      setNewTodos('')
    }
  }

  // Bugs Fixed: All the buttons acting same
  // Mark todos as completed or not completed status
  const markTodoCompleted = (index) => {
    // Update the todos array with the completed status of the todo item based on index
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index] = {
        ...updatedTodos[index],
        completed: !updatedTodos[index].completed,
      }
      return updatedTodos
    })

    // Update the completed array with the completed status of the todo item based on index
    setCompleted((prevCompleted) => {
      const updatedCompleted = [...prevCompleted]
      updatedCompleted[index] = !updatedCompleted[index]
      return updatedCompleted
    })
  }

  // Filter through todos array and
  // return the new array after the item removed at the specified index
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
  }

  // Rest of the component code...
  return (
    <>
      <div className="card">
        <div className="main-container">
          <div className="background">
            <h1> TodoList</h1>
            <div className="input">
              <div className="content">
                <input
                  type="text"
                  name="text"
                  className="input-text"
                  value={newTodos}
                  onChange={(e) => setNewTodos(e.target.value)}
                  placeholder="What would you like to add?"
                />
                <span></span>
              </div>
              <button className="add-btn" onClick={addTodo}>
                Add{' '}
              </button>
            </div>
          </div>
          <br />
          <div className="todo-container">
            <h2>TodoList</h2>
            <ul className="todo-list">
              <li className="todos">
                <h3>List</h3>
                <h3 className='status'>Status</h3>
                <h3 className='close'>Close</h3>
              </li>
              <hr />
              {todos.map((todo, index) => {
                const isCompleted = todo.completed
                const statusIcon = isCompleted ? (
                  <FaCheckCircle
                    style={{ fontSize: '.6rem', marginRight: '5px' }}
                  />
                ) : (
                  <FaExclamationCircle
                    style={{ fontSize: '.6rem', marginRight: '5px' }}
                  />
                )
                const statusText = isCompleted ? 'Completed' : 'Pending'
                return (
                    <React.Fragment key={index}>
                  <li className="todos">
                    {todo.text}
                    <button
                      className="status-btn"
                      onClick={() => markTodoCompleted(index)}
                    >
                      {statusIcon}
                      {statusText}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(index)}
                    >
                      <FaTrash
                        style={{ fontSize: '.6rem', marginRight: '5px' }}
                      />
                      Delete
                    </button>
                  </li>
                  <hr/>
                  </React.Fragment>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList

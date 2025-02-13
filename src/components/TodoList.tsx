import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  title: string;
  date: string;
  complete: boolean;
}

const LOCAL_STORAGE_KEY = "todoList";

const getInitialTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedTodos ? JSON.parse(savedTodos) : []; //Load from storage on first render
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos); //Load initial Todos from local storage
  const [task, setTask] = useState<string>("");

  //Sync local storage when todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return alert("Please enter a task!");

    const newTodo: Todo = {
      title: task,
      date: new Date().toLocaleString(),
      complete: false,
    };

    setTodos([...todos, newTodo]); 
    setTask("");
  };

  const toggleComplete = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const deleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };
  
  const editTodo = (index: number, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index
          ? { ...todo, title: newTitle, date: new Date().toLocaleString() }
          : todo
      )
    );
  };
  
  return (
    <div className="container">
      <div className="input-section">
        <input 
          type="text" 
          placeholder="Enter a task..." 
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>+ Add Task</button>
      </div>
      <div id="todoContainer">
        {todos.map((todo, index) => (
          <TodoItem 
            key={index} 
            todo={todo} 
            onToggleComplete={() => toggleComplete(index)} 
            onDelete={() => deleteTodo(index)} 
            onEdit={(newTitle) => editTodo(index, newTitle)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

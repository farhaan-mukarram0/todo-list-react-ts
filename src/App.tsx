import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <header>
        <div className="header-content">
          <h1>To Do List</h1>
          <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
          </nav>
        </div>
      </header>
      <TodoList />
    </div>
  );
}

export default App;

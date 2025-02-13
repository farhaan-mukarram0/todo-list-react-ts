
interface TodoItemProps {
  todo: {
    title: string;
    date: string;
    complete: boolean;
  };
  onToggleComplete: () => void;
  onDelete: () => void;
}

const TodoItem = ({ todo, onToggleComplete, onDelete }: TodoItemProps) => { 
    return (
        <div className={`todo-item ${todo.complete ? "complete" : ""}`}>
          <div className="todo-header">
            <span className="todo-title">{todo.title}</span>
            <span className="timestamp">{todo.date}</span>
          </div>
          <div className="todo-footer">
            {!todo.complete && <button className="tick" onClick={onToggleComplete}>✔</button>}
            <button className="delete" onClick={onDelete}>✖</button>
          </div>
        </div>
      );
  };
  
export default TodoItem;

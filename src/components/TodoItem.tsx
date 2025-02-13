import { useState } from "react";

interface TodoItemProps {
  todo: {
    title: string;
    date: string;
    complete: boolean;
  };
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
}

const TodoItem = ({ todo, onToggleComplete, onDelete, onEdit }: TodoItemProps) => { 
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = () => {
    if (newTitle.trim()) {
      onEdit(newTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.complete ? "complete" : ""}`}>
      <div className="todo-header">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSave} // Save on blur
            onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter key
          />
        ) : (
          <span className="todo-title">{todo.title}</span>
        )}
        <span className="timestamp">{todo.date}</span>
      </div>
      <div className="todo-footer">
        <button className="edit" onClick={() => setIsEditing(true)}>✎</button>
        {!todo.complete && <button className="tick" onClick={onToggleComplete}>✔</button>}
        <button className="delete" onClick={onDelete}>✖</button>
      </div>
    </div>
  );
};

export default TodoItem;

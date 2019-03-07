import React from "react";

export default function ToDoItem({item, toggleItem, deleteItem }) {
  return (
    <div className="item">
      <div className="itemInner">
        <span className="item">
          <input
            className="checkTodo"
            onChange={() => toggleItem(item)}
            type="checkbox"
            checked={item.status}
          />
          <label className="text">{item.text}</label>
        </span>
      </div>
      <div className="delete" onClick={() => deleteItem(item)}>
        x
      </div>
    </div>
  );
}

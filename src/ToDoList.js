import React from "react";

import ToDoItem from "./ToDoItem";

export default function ToDoList({ list, toggleItem, deleteItem }) {

  const item = list.map(item => {
    return (
      <ToDoItem
        item={item}
        key={item.id}
        toggleItem={toggleItem}
        deleteItem={deleteItem}
      />
    );
  });

  return (
    <div className="list-wrapper">
      <div className="list">{item}</div>
    </div>
  );
}

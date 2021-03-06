import React from "react";

import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList.js";
import ToDoFooter from "./ToDoFooter.js";
import useToDo from '../useToDo';
import useInput from './useInput';

export default function Box() {
  const [list, addItem, deleteItem, toggleItem, total, done] = useToDo();
  const [value, onChange] = useInput('hooks');

  return (
    <>
      <div className="wapper">
        <h2 className="title">to do list use hooks</h2>
        <ToDoForm addItem={addItem} />
        <ToDoList list={list} deleteItem={deleteItem} toggleItem={toggleItem} />
        <ToDoFooter total={total} done={done} />
      </div>
      <hr/>
      <input value={value} onChange={onChange} />
    </>
  );
}

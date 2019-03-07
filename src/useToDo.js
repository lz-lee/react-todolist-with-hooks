import { useState } from 'react';

export default function useToDo() {
  const [list, setList] = useState([]);

  const deleteItem = item => {
    const newList = list.filter(v => v.id !== item.id);

    setList(newList);
  };
  const toggleItem = item => {
    const newList = list.map(v => {
      return v !== item ? v : Object.assign({}, item, { status: !item.status });
    });

    setList(newList);
  };
  const addItem = value => {
    setList([
      ...list,
      {
        id: Date.now() | 16,
        text: value,
        status: false
      }
    ]);
  };

  const total = list.length;
  const done = list.filter(item => item.status).length;

  return [list, addItem, deleteItem, toggleItem, total, done]
}
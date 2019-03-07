import React, { useState } from "react";

export default function ToDoForm({ addItem }) {
  const [value, setValue] = useState("");

  const onChange = e => {
    if (e.target.value) {
      setValue(e.target.value);
    }
  };

  const onKeyUp = e => {
    if (e.target.value) {
      if(e.keyCode === 13) {
        addItem(e.target.value);
        setValue('')
      }
    }
  }
  return (
    <div className="form">
      <input type="text" onChange={onChange} onKeyUp={onKeyUp} value={value} />
    </div>
  );
}

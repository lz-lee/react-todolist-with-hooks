import React, { useState, useEffect } from 'react';

function Counter(props) {
  const { count } = props;

  useEffect(() => {
    console.log('count render effect', count);

    return () => console.log('count clean up effect', count);
  }, [count])
  console.log('render UI', count);
  return (
    <h1> count {count}</h1>
  );
}

export function CleanEffectOderWrapper() {
  const [count, setCount] = useState(0);

  const handleSetCount = e => {
    setCount(e.target.value);
  }

  return (
    <div>
      <select name="" id="" onChange={handleSetCount}>
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <Counter count={count} />
    </div>
  );
}
import React, { useState, useEffect, useLayoutEffect } from 'react';

function Counter(props) {
  const { count } = props;

  useEffect(() => {
    console.log('count render effect', count);

    return () => console.log('count clean up effect', count);
  }, [count])

  useLayoutEffect(() => {
    console.log('count render layout effect', count);

    return () => console.log('count clean up layout effect', count);
  }, [count]);
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
  console.log('will unmount Counter', count == 20);
  return (
    <div>
      <select name="" id="" onChange={handleSetCount}>
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      {count != 20 ? <Counter count={count} /> : null}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import useInterval from './useInterval';


export function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // will render every count when count change
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  }, [count]);
  return (
    <div>Count, {count}</div>
  );
}

export function RenderOnceEffectCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // will render once when count change
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  }, []);
  return (
    <div>Count, {count}</div>
  );
}

export function CustomCount() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setRun] = useState(true);

  useInterval(() => {
    setCount(count + 1)
  }, isRunning ? delay : null);

  useInterval(() => {
    if(delay > 10) {
      setDelay(delay / 2);
    }
  }, 1000);

  const handleSetDelay = (e) => {
    setDelay(e.target.value);
  }

  const hanleStopInterval = (e) => {
    setRun(e.target.checked);
  }
  const handleReset = () => {
    setDelay(1000);
  }

  return (
    <React.Fragment>
      <input type="checkbox" checked={isRunning} onClick={hanleStopInterval} />run
      <br/>
      <input type="number" value={delay} onChange={handleSetDelay} />
      <div>Count {count}</div>
      <p>delay, {delay}</p>
      <button onClick={handleReset}>reset delay</button>
    </React.Fragment>
  );
}



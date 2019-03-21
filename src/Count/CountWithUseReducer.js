import React, { useEffect, useReducer } from 'react';

const reducer = (state, action) => {
  const { count, step } = state;

  switch (action.type) {
    case 'tick':
      return { count: count + step, step };
    case 'step':
      return { step: action.step, count }
    default:
      break;
  }
}

const initialState = {
  count: 0,
  step: 1
}

export function Count() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    // only render once
    console.log('render effect');
    const timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const handleChangeStep = e => {
    dispatch({
      type: 'step',
      step: Number(e.target.value)
    });
  }
  return (
    <React.Fragment>
      <h1>count, {count}</h1>
      <input type="number" value={step} onChange={handleChangeStep} />
    </React.Fragment>
  );
}
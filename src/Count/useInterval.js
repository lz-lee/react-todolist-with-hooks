import { useRef, useEffect } from 'react';

export default function useInterval(fn, delay) {
  const saveCallback = useRef();

  useEffect(() => {
    saveCallback.current = fn;
  }, [fn])

  useEffect(() => {
    function tick() {
      saveCallback.current();
    }

    if(delay !== null) {
      const timer = setInterval(tick, delay);

      return () => clearInterval(timer);
    }
  }, [delay]);
}

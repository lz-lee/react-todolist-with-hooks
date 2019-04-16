- effects会在每次渲染（浏览器绘制）之后运行，概念上它是组件输出的一部分，每一次渲染都有属于它所有的props和state。

- 每一个函数式组件内的函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获定义它们那次渲染中的props和state。

  - 在函数式组件中不存在 this.props 的语法， 所以props 是不可变的； 而 Class component 中 this 是可变的，如果父组件 reRender, this.props 永远拿到的是最新的，不是props变了，而是 this.props 指向了新的props。

- 使用 useRef 可以规避捕获值，使用最新的值。

- effects 清除流程：由于effects执行会在每次渲染之后，当 `props` 的 `{count: 10}` 改变成 `{count: 20}` 时， effects的执行顺序：
  - 渲染 `{count: 20}` 的UI；

  - 浏览器绘制UI

  - 清除 `{count: 10}` 的 effect;

    - effect 的清除并不会读取最新的props，只能读取定义它的那次渲染的props的值。

  - 执行 `{count: 20}` 的 effect;

- [`useEffect` vs `useLayoutEffect`](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect)

  - `useEffect`：执行在react渲染组件之后，并确保effect的callback不会阻塞浏览的绘制，
与`componentDidMount`和`componentDidUpdate` 在 render之后同步运行不同。如果effect是想要改变 dom 或者 dom 的展示 ，使用 `useLayoutEffect`。

  - `useLayoutEffect`: 在 DOM 更新后会立即运行，如果需要进行 dom 的操作（获取样式等），通过更新状态进行 DOM 改变或触发同步重新渲染。与`componentDidMount`和`componentDidUpdate`的工作方式相同。

  - `useLayoutEffect`的清除 > `useLayoutEffect`的下一次执行 > `useEffect` 的清除 > `useEffect` 的下一次执行， 在组件卸载时， `useEffect`的清除在`useLayoutEffect`的清除之前。

    ```jsx
    render UI 10
    count clean up layout effect 0
    count render layout effect 10
    count clean up effect 0
    count render effect 10

    will unmount Counter true
    count clean up effect 10
    count clean up layout effect 10
    ```
- 依赖数组：React 不能区分 effects 的不同，提供给 `useEffect` 一个依赖数组参数（deps），可以避免effects不必要的重复调用。即使依赖数组中只有一个值在两次渲染中不一样，也会同步所有，执行effects。

  - 设置错误的依赖数组（空数组），新的effect函数不会运行，需要给effect所有需要使用的渲染中值作为依赖。

    - 方案一： 在依赖中包含所有effect中用到的组件内的值，这样每次 `count` 修改都会重新运行 effect，但这样带来的问题是定时器会在每一次 `count` 改变后清除和重新设定。

      ```jsx
        useEffect(() => {
          const id = setInterval(() => {
            setCount(count + 1);
          }, 1000);
          return () => clearInterval(id);
        }, [count]);
      ```
    - 方案二： 移除依赖，让 effect 自给自足。当需要根据前一个状态更新状态时，可以使用`setState` 的函数形式。依赖没有变 effect 只会运行一次。

      ```jsx
        useEffect(() => {
          const id = setInterval(() => {
            setCount(c => c + 1);
          }, 1000);
          return () => clearInterval(id);
        }, []);
      ```
  - 当需要更新一个状态，并且这个状态更新依赖于另一个状态的值时，可以用 `useReducer` 代替。

    - 用 `dispatch` 做 effect 的依赖，React 会保证 dispatch 在组件的生命周期内保持不变，所以 effect 只会运行一次，定时器也只订阅一次。

    ```jsx
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

    // 可以从依赖中去掉 dispatch
    ```

    - 需要依赖 `props` 去计算下一个状态， 将 reducer 函数放到组件内去读取 `props`，依旧可以避免 Effect 依赖 `props.step`。在这个例子中 React 也保证dispatch在每次渲染中都是一样的，可以在依赖中去掉它。

    ```jsx
    function Counter({ step }) {
      const [count, dispatch] = useReducer(reducer, 0);

      // reducer 函数访问 props
      function reducer(state, action) {
        switch (action.type) {
          case 'tick':
            return state + step;
          default:
            break;
        }
      }

      useEffect(() => {
        const timer = setInterval(() => {
          dispatch({ type: 'tick' });
        }, 1000);

        return () => clearInterval(timer);
      }, [dispatch])

      return <h1>{count}</h1>
    }
    ```

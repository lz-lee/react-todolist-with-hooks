import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Box from './ToDo';
import { Count, CustomCount} from './Count/index';
import { Count as CountWithReducer } from './Count/CountWithUseReducer';

import { CleanEffectOderWrapper } from './Demo/cleanEffect';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CleanEffectOderWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

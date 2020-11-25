import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as registerServiceWorker from './registerServiceWorker';

// render App component on the root element
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker.unregister();

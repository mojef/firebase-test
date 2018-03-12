import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Component/Main';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'react-table/react-table.css'

ReactDOM.render(
        <Main />,
        document.getElementById('root')
);
registerServiceWorker();
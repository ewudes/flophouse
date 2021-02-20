import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {cards, comments} from './mock';

ReactDOM.render(
    <App cards={cards} comments={comments} />, document.querySelector(`#root`)
);

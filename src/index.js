import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const CARD_COUNT = 5;

ReactDOM.render(
    <App cardCount={CARD_COUNT} />, document.querySelector(`#root`)
);

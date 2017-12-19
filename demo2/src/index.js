import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function NumberList(props) {
    const numbers = props.number;
}

const list = [1,2,3,4,5];
ReactDOM.render(<NumberList numbers={list}/>, document.getElementById('root'));

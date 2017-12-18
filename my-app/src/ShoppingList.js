import React from 'react';
import ReactDOM from 'react-dom';
class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatApp</li>
                </ul>
            </div>
        );
    }
}
ReactDOM.render(
    <ShoppingList />,
    document.getElementById('root')
);
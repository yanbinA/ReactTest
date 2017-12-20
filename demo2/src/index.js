import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ListItem(props) {
    return (
        //key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，请将其作为属性传递：
        <li key={props.key}>{props.value}</li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    let listItems = numbers.map((number) => (
        <ListItem key={number.toString()} value={number}/>
    ))
    return (<ul>{listItems}</ul>);
}

function Blog(props) {
    const posts = props.posts;
    return (
        <div>
            {
                posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))
            }
            <hr/>
            {
                posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
                ))
            }
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'},
    {id: 3, title: 'Running', content: 'You can running React from npm.'}
];
const numbers = [1,2,3,4,5];
//ReactDOM.render(<NumberList numbers={numbers}/>, document.getElementById('root'));
ReactDOM.render(<Blog posts={posts}/>, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ActionClick extends React.Component {

    handleClick(e) {
        //preventDefault()
        e.preventDefault();
        console.log("click it123" + this);
    }
    render(){
        const number = [1,2,3,4,5];
        let map = number.map((number) => (<li>{number}</li>));
        return (
            <a href="http://www.baidu.com" target="_blank" onClick={(e)=>this.handleClick(e)}>{map}</a>
        );
    }

}


ReactDOM.render(<ActionClick />, document.getElementById('root'))


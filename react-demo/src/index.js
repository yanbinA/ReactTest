import React from 'react';
import ReactDOM from 'react-dom';


//let createReactClass = require('create-react-class');
class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {date:new Date()};
        //this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        //生命周期函数，当组件输出到DOM后执行componentDidMount()
        setInterval(this.tick, 1000);
    }

    componentWillUpdate(nextProps,nextState) {
        //alert("将要更新为" + nextState.date.toLocaleTimeString())
    }
    componentDidUpdate(prevProps,prevState) {

    }

    tick = ()=> {
        const currentDate = new Date();
        this.setState({date:currentDate});
    }


    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
                <h1>It is {this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}
ReactDOM.render(<Clock/>,document.getElementById('root'));

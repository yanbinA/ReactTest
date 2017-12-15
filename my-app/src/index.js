
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*class Square extends React.Component {

    render() {
        return (
			<button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
			</button>
        );
    }
}*/
function Square(props) {
    if (props.highLight) {
        return (
            <button className="square" onClick={props.onClick} style={{color:"red"}}>
                {props.value}
            </button>
        );
    } else {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }

}

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i[1] - 1][i[0] - 1]} onClick={() => this.props.onClick(i)} highLight={this.props.winnerLine.find(function (n, index) {
                return (n[0] === (i[1] - 1) && n[1] === (i[0] - 1) );

            }
        )}/>;
    }

    render() {
        var rows = [];
        for (let i=1; i <= 3 ; i++){
            let row = [];
            for (let j=1; j <= 3;j++){
                row.push(this.renderSquare([j, i]));
            }
            rows.push(<div className="board=row" key={i}>{row}</div>)
        }
        return (
			<div>
                {rows}
			</div>
        );
    }


}

function calculatewinner(squares) {
	const lines = [
		[[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[0,2],[1,1],[2,0]],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a[0]][a[1]] && squares[a[0]][a[1]] === squares[b[0]][b[1]] && squares[a[0]][a[1]] === squares[c[0]][c[1]]) {
			return {winner:squares[a[0]][a[1]], winnerLine:lines[i]};
		}
	}
	return {winner:null, winnerLine:[]};
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history:[{
                squares:Array(3).fill(Array(3).fill(null)),
                lastStep:Array(2).fill(null)
            }],
            xIsNext:true,
            stepNum:0,
            sort:false,
        };
    }
    render() {
        let history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[this.state.stepNum];
        const winner = calculatewinner(current.squares).winner;
        const winnerLine = calculatewinner(current.squares).winnerLine;


        if (this.state.sort) {
            history = history.reverse();
        }

        const moves = history.map((step, move) => {
           const desc = step.lastStep[0] ? 'Move (' + step.lastStep[0] + ", " + step.lastStep[1] + ")" : 'Game start';
           if (move === this.state.sort) {
               return (
                   <li>
                       <a href="#" onClick={() => this.jumpTo(this.state.sort?history.length - move - 1: move)} style={{fontWeight:"bold"}}>{desc}</a>
                   </li>
               );
           } else {
               return (
                   <li>
                       <a href="#" onClick={() => this.jumpTo(this.state.sort?history.length - move - 1: move)}>{desc}</a>
                   </li>
               );
           }

        });
        let status;
        if (winner) {
            status = 'Winner:' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
			<div className="game">
				<div className="game-board">
					<Board squares={current.squares}
                    onClick={(i) => this.handleClick(i)} winnerLine={winnerLine}/>
				</div>
				<div className="game-info">
					<div>{status}</div>
                    <button onClick={() => {this.setState({sort:!this.state.sort})}}>SORT</button>
					<ol>{moves}</ol>
				</div>
			</div>
        );
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[history.length - 1];
        let squares = current.squares.slice();
        const squaresLine = squares[i[1] - 1].slice();
        if (calculatewinner(squares).winner || squaresLine[i[0] - 1]) {
            return;
        }
        if (this.state.xIsNext) {
            squaresLine[i[0] - 1] = 'X';
        } else {
            squaresLine[i[0] - 1] = 'O';
        }
        squares[i[1] - 1] = squaresLine;
        this.setState({
            history:history.concat({squares:squares,lastStep:i}),
            xIsNext:!this.state.xIsNext,
            stepNum:this.state.stepNum + 1,
        })
    }

    jumpTo(move) {

        this.setState({

            xIsNext:!(move%2),
            stepNum:move,
        })
    }
}

// ========================================

ReactDOM.render(
	<Game />,
    document.getElementById('root')
);


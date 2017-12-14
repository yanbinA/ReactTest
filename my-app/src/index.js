
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
    return (
		<button className="square" onClick={props.onClick}>
            {props.value}
		</button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        
        return (
			<div>

				<div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
				</div>
				<div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
				</div>
				<div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
				</div>
			</div>
        );
    }


}

function calculatewinner(squares) {
	const lines = [
		[0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history:[{
               squares:Array(9).fill(null),
            }],
            xIsNext:true,
            stepNum:0,
        };
    }
    render() {
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[this.state.stepNum];
        const winner = calculatewinner(current.squares);
        
        const moves = history.map((step, move) => {
           const desc = move ? 'Move #' + move : 'Game start';
           return (
               <li>
                   <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
               </li>
           );
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
                    onClick={(i) => this.handleClick(i)}/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
        );
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculatewinner(squares) || squares[i]) {
            return;
        }
        if (this.state.xIsNext) {
            squares[i] = 'X';
        } else {
            squares[i] = 'O';
        }
        this.setState({
            history:history.concat({squares:squares,}),
            xIsNext:!this.state.xIsNext,
            stepNum:this.state.stepNum + 1,
        })
    }

    jumpTo(move) {

        this.setState({

            xIsNext:!move%2,
            stepNum:move,
        })
    }
}

// ========================================

ReactDOM.render(
	<Game />,
    document.getElementById('root')
);


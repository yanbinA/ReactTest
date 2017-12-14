
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
        return <Square value={this.props.squares[i[1] - 1][i[0] - 1]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        
        return (
			<div>

				<div className="board-row">
                    {this.renderSquare([1,1])}
                    {this.renderSquare([2,1])}
                    {this.renderSquare([3,1])}
				</div>
				<div className="board-row">
                    {this.renderSquare([1,2])}
                    {this.renderSquare([2,2])}
                    {this.renderSquare([3,2])}
				</div>
				<div className="board-row">
                    {this.renderSquare([1,3])}
                    {this.renderSquare([2,3])}
                    {this.renderSquare([3,3])}
				</div>
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
			return squares[a[0]][a[1]];
		}
	}
	return null;
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history:[{
               squares:Array(3).fill(Array(3).fill(null))
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
        let squares = current.squares.slice();
        const squaresLine = squares[i[1] - 1].slice();
        if (calculatewinner(squares) || squaresLine[i[0] - 1]) {
            return;
        }
        if (this.state.xIsNext) {
            squaresLine[i[0] - 1] = 'X';
        } else {
            squaresLine[i[0] - 1] = 'O';
        }
        squares[i[1] - 1] = squaresLine;
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


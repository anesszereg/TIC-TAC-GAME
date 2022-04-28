import React, {useEffect} from 'react'
import './Page1.css'
import {useState} from 'react'
import Squares from '../Components/Squares/Squares'


const defaultSquares = () => (new Array(9)).fill(null)
const lines = [
    [
        0, 1, 2
    ],
    [
        3, 4, 5
    ],
    [
        6, 7, 8
    ],
    [
        0, 3, 6
    ],
    [
        1, 4, 7
    ],
    [
        2, 5, 8
    ],
    [
        0, 4, 8
    ],
    [
        2, 4, 6
    ]
]
 function Page1() {
    const [squares, setSquares] = useState(defaultSquares())
    const [winner,setWinner] = useState(null);

    
        useEffect(() => {

        const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1


        const linesAreFull = (a, b, c) => {
            return lines.filter(squareIndex => {
                const squareValue = squareIndex.map(index => squares[index])
                return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValue.sort())
            })
        }


        const emptyIndex = squares.map((square, index) => square === null ? index : null).filter(index => index !== null)

        const playerWon = linesAreFull('x', 'x', 'x').length > 0
        const computerWin = linesAreFull('o', 'o', 'o').length > 0

        if (playerWon) {
            setWinner('x');
        }

        if (computerWin) {
            setWinner('o');
        }


        const putComputerAt = index => {
            let newSquares = squares
            newSquares[index] = 'o'
            setSquares([... newSquares])
        }


        if (isComputerTurn) {

                const winingLines = linesAreFull('o', 'o', null)

              if (winingLines.length > 0) {
                    const WonIndex = winingLines[0].filter(index => squares[index] === null)[0];
                    putComputerAt(WonIndex)
                return
            }

            const linesToBlock = linesAreFull('x', 'x', null)

              if (linesToBlock.length > 0) {
                  const BlockIndex = linesToBlock[0].filter(index => squares[index] === null)[0]

                  putComputerAt(BlockIndex)
                     return
               }


            const linesToContinue = linesAreFull('o', null, null)
                if (linesToContinue.length > 0) {
                    putComputerAt( linesToContinue[0].filter(index => squares[index] === null)[0])
                    return
                }



           

            const randomIndex = emptyIndex[Math.ceil(Math.random() * emptyIndex.length) ]
            putComputerAt(randomIndex)

        }
    }, [squares])






    function handleClick(index) {
        const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0
        if (isPlayerTurn) {

            let newSquare = squares
            newSquare[index] = 'x'
            setSquares([... newSquare])
        }

        // console.log(handleClick);
    }
    return (
        <div className='page'>

      

            {
            squares.map((square, index) => 
            <Squares key={index}
                x={
                    square === 'x' ? 1 : 0
                }
                o={
                    square === 'o' ? 1 : 0
                }
                onClick={
                    () => handleClick(index)
                }/>)
            }
            {!!winner && winner === 'x' && (
        <div className="result green">
          You WON!🥰😆
        </div>
      )}
      {!!winner && winner === 'o' && (
        <div className="result red">
          You LOSE!😥😭
        </div>
      )}
        </div>
    )
}
export default Page1

import "./chessboard.css";
import Tile from "../tile/tile";
import {useEffect, useRef, useState} from "react";

const h_axis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const v_axis = ["1", "2", "3", "4", "5", "6", "7", "8"];


interface Piece{
    image: string
    x : number
    y : number
}

const pieces: Piece[] = [];

const initialBoardState: Piece[] = [];


for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    let y = p === 0 ? 7 : 0;

    initialBoardState.push({image: `assets/images/${type}R.svg`, x: 0, y})
    initialBoardState.push({image: `assets/images/${type}R.svg`, x: 7, y})
    initialBoardState.push({image: `assets/images/${type}N.svg`, x: 1, y})
    initialBoardState.push({image: `assets/images/${type}N.svg`, x: 6, y})
    initialBoardState.push({image: `assets/images/${type}B.svg`, x: 2, y})
    initialBoardState.push({image: `assets/images/${type}B.svg`, x: 5, y})
    initialBoardState.push({image: `assets/images/${type}Q.svg`, x: 3, y})
    initialBoardState.push({image: `assets/images/${type}K.svg`, x: 4, y})
    for (let i = 0; i < 8; i++) {
        const temp = y === 0 ? 1 : 6
        initialBoardState.push({image: `assets/images/${type}P.svg`, x: i, y: temp})
    }
}





export default function Chessboard(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null);




    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessBoard = chessboardRef.current;
        if(element.classList.contains("chess-piece") && chessBoard){
            setGridX(Math.floor((e.clientX - chessBoard.offsetLeft)/ 100))
            setGridY(Math.floor((-1)*(e.clientY - chessBoard.offsetTop - 800) / 100))
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent){
        const chessBoard = chessboardRef.current;

        if(activePiece && chessBoard){
            const minX = chessBoard.offsetLeft - 25;
            const maxY = chessBoard.offsetTop - 25;
            const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
            const minY = chessBoard.offsetTop + chessBoard.clientHeight - 85;

            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";

            if (x < minX){
                activePiece.style.left = `${minX}px`;

            }
            else if (x > maxX){
                activePiece.style.left = `${maxX}px`;
            }
            else{
                activePiece.style.left = `${x}px`;
            }

            if (y > minY){
                activePiece.style.top = `${minY}px`;
            }
            else if (y < maxY){
                activePiece.style.top = `${maxY}px`;
            }
            else{
                activePiece.style.top = `${y}px`;
            }
        }
    }

    function dropPiece(e: React.MouseEvent){
        const chessBoard = chessboardRef.current;
        if(activePiece &&chessBoard){
            const x = Math.floor((e.clientX - chessBoard.offsetLeft)/ 100);
            const y = Math.floor((-1)*(e.clientY - chessBoard.offsetTop - 800) / 100);

            setPieces((value) => {
                const pieces = value.map((p) =>{
                    if (p.x === gridX && p.y === gridY){
                        p.x = x;
                        p.y = y;
                    }

                    return p;
                })

                return pieces;
            })
        }
    }



    let board = [];
    for (let j = 7; j >= 0; j--){
        for (let i = 0;  i < 8; i++) {
            const temp = i + j + 2;
            let image = undefined;

            pieces.forEach(p =>{
                if(p.x === i && p.y === j){
                    image = p.image
                }
            })

            board.push(<Tile key = {`${j},${i}`} image={image} number={temp}/>);

        }
    }
    return <div onMouseUp = {e => dropPiece(e)}
                onMouseMove={e => movePiece(e)}
                onMouseDown={e =>grabPiece(e)}
                id="chessboard"
                ref={chessboardRef}
    >{board}
    </div>;
}
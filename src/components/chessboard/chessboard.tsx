// MAKE SURE THAT MOVING PIECE IS ALWAYS ON TOP

import "./chessboard.css";
import Tile from "../tile/tile";
import React, {useEffect, useRef, useState} from "react";
import {GRIDSIZE} from "../../Constants";
import {Piece, Position} from "../../models";



interface Props {
    playMove: (piece: Piece, position: Position) => boolean;
    pieces: Piece[];
}


export default function Chessboard({playMove, pieces} : Props) {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridPosition, setGridPosition] = useState<Position>(new Position(-1, -1));
    const chessboardRef = useRef<HTMLDivElement>(null);





    function grabPiece(e: React.MouseEvent) {

        const element = e.target as HTMLElement;
        const chessBoard = chessboardRef.current;
        if (element.classList.contains("chess-piece") && chessBoard) {
            const setX = (Math.floor((e.clientX - chessBoard.offsetLeft) / GRIDSIZE));
            const setY = Math.abs((Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRIDSIZE)));
            setGridPosition(new Position(setX, setY));

            const x = e.clientX - GRIDSIZE / 2;
            const y = e.clientY - GRIDSIZE / 2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }



    }

    function movePiece(e: React.MouseEvent) {
        const chessBoard = chessboardRef.current;

        if (activePiece && chessBoard) {
            const minX = chessBoard.offsetLeft - 25;
            const maxY = chessBoard.offsetTop - 25;
            const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
            const minY = chessBoard.offsetTop + chessBoard.clientHeight - 85;

            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";

            // if (x < minX) { // allow user to drag piece off board but snap back if value is negative
            //     activePiece.style.left = `${minX}px`;
            //
            // } else if (x > maxX) {
            //     activePiece.style.left = `${maxX}px`;
            // } else {
                activePiece.style.left = `${x}px`;
            //}

            // if (y > minY) {
            //     activePiece.style.top = `${minY}px`;
            // } else if (y < maxY) {
            //     activePiece.style.top = `${maxY}px`;
            // } else {
                activePiece.style.top = `${y}px`;
            //}
        }
    }

    function dropPiece(e: React.MouseEvent) {

        const chessBoard = chessboardRef.current;
        if (activePiece && chessBoard) {

            const x = Math.floor((e.clientX - chessBoard.offsetLeft) / GRIDSIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRIDSIZE));

            const currentPiece = pieces.find(p => p.samePosition(gridPosition));

            if (currentPiece) {
                var success = playMove(currentPiece.clone(), new Position(x, y));

                if(!success){
                    activePiece.style.position = "relative";
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }

            }
            setActivePiece(null);
        }
    }





    let board = [];

    for (let j = 7; j >= 0; j--) {
        for (let i = 0; i < 8; i++) {
            const temp = i + j + 2;
            const piece = pieces.find((p) => p.samePosition(new Position(i , j)));
            let image = piece ? piece.image : undefined;

            let currentPiece = activePiece != null ? pieces.find(p => p.samePosition(gridPosition)) : undefined;
            let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => p.samePosition(new Position(i, j))) : false;


            board.push(<Tile key={`${j},${i}`} image={image} number={temp} highlight={highlight}/>);

        }
    }

    return ( // fix promotion UI later
        <>
            <div
            onMouseUp={e => dropPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseDown={e => grabPiece(e)}
            id="chessboard"
            ref={chessboardRef}
            >
                {board}
            </div>;
    </>);
}
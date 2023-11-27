// Importing necessary modules and components
import "./chessboard.css";
import Tile from "../tile/tile";
import React, {useEffect, useRef, useState} from "react";
import {GRIDSIZE} from "../../Constants";
import {Piece, Position} from "../../models";

// Props interface for the Chessboard component
interface Props {
    // playMove function prop that takes a piece and a position and returns a boolean
    playMove: (piece: Piece, position: Position) => boolean;
    // pieces prop that is an array of Piece objects
    pieces: Piece[];
}

// Chessboard component
export default function Chessboard({playMove, pieces} : Props) {
    //useStates hook provide state variables and functions to update them (including rerendering the component)
    // State for the currently active piece
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    // State for the current grid position
    const [gridPosition, setGridPosition] = useState<Position>(new Position(-1, -1));
    // Ref for the chessboard. Provides access to chessboard div element
    const chessboardRef = useRef<HTMLDivElement>(null);

    // Function to handle grabbing a piece
    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessBoard = chessboardRef.current;
        // If the clicked element is a chess piece and the chessboard exists
        if (element.classList.contains("chess-piece") && chessBoard) {
            // Calculate the grid position
            const setX = (Math.floor((e.clientX - chessBoard.offsetLeft) / GRIDSIZE));
            const setY = Math.abs((Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRIDSIZE)));
            setGridPosition(new Position(setX, setY));

            // Set the piece's position and make it absolute
            const x = e.clientX - GRIDSIZE / 2;
            const y = e.clientY - GRIDSIZE / 2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            // Set the active piece
            setActivePiece(element);
        }
    }

    // Function to handle moving a piece
    function movePiece(e: React.MouseEvent) {
        const chessBoard = chessboardRef.current;

        // If there is an active piece and the chessboard exists
        if (activePiece && chessBoard) {
            // Calculate the boundaries for the piece's movement
            const minX = chessBoard.offsetLeft - 25;
            const maxY = chessBoard.offsetTop - 25;
            const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
            const minY = chessBoard.offsetTop + chessBoard.clientHeight - 85;

            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";

            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }
    }


    // Function to handle dropping a piece
    function dropPiece(e: React.MouseEvent) {
        // Calculate the new grid position
        const chessBoard = chessboardRef.current;
        if (activePiece && chessBoard) {

            const x = Math.floor((e.clientX - chessBoard.offsetLeft) / GRIDSIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRIDSIZE));

            // Finds the piece that was being moved
            const currentPiece = pieces.find(p => p.samePosition(gridPosition));

            // If the piece exists, play the move by cloning the board
            if (currentPiece) {
                var success = playMove(currentPiece.clone(), new Position(x, y));

                // resets the piece to its original position if the move was invalid by removing the styling done in movePiece
                if(!success){
                    activePiece.style.position = "relative";
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }
            // clear the active piece
            setActivePiece(null);
        }
    }


    let board = [];
    //recreates the board and pieces
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
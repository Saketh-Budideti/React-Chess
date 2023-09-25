import "./chessboard.css";
import Tile from "../tile/tile";
import React, {useRef, useState} from "react";
import Referee from "../../referee/Referee";
import {
    V_AXIS,
    H_AXIS,
    GRIDSIZE,
    Piece,
    Sides,
    PieceType,
    initialBoardState,
    Position,
    samePosition
} from "../../Constants";


export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridPosition, setGridPosition] = useState<Position>({x: -1, y: -1});
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();


    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessBoard = chessboardRef.current;
        if (element.classList.contains("chess-piece") && chessBoard) {
            const setX = (Math.floor((e.clientX - chessBoard.offsetLeft) / GRIDSIZE));
            const setY = Math.abs((Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRIDSIZE)));
            setGridPosition({x: setX, y: setY});

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

            const currentPiece = pieces.find(p => samePosition(p.position, gridPosition));

            if (currentPiece) {
                const validMove = referee.isValidMove(gridPosition, {
                    x,
                    y
                }, currentPiece.type, currentPiece.side, pieces);
                const isEnpassantable = referee.isEnpassantable(gridPosition, {
                    x,
                    y
                }, currentPiece.type, currentPiece.side, pieces);
                const direction = (currentPiece.side === Sides.PLAYER) ? 1 : -1;

                if (isEnpassantable) {
                    const updatedPieces = pieces.reduce((results, piece) => { // adds pieces to array and updates position

                        if (samePosition(piece.position, gridPosition)) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if (!samePosition(piece.position, {x, y: y - direction})) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }
                        return results;
                    }, [] as Piece[]);

                    setPieces(updatedPieces);
                } else if (validMove) {
                    const updatedPieces = pieces.reduce((results, piece) => { // adds pieces to array and updates position
                        if (samePosition(piece.position, gridPosition)) {
                            piece.enPassant = Math.abs(gridPosition.y - y) === 2 && piece.type === PieceType.PAWN
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if (!(samePosition(piece.position, {x, y}))) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }
                        return results
                    }, [] as Piece[]);

                    setPieces(updatedPieces);
                } else {
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
            const piece = pieces.find((p) => samePosition(p.position, {x: i, y: j}));
            let image = piece ? piece.image : undefined;


            board.push(<Tile key={`${j},${i}`} image={image} number={temp}/>);

        }
    }
    return <div onMouseUp={e => dropPiece(e)}
                onMouseMove={e => movePiece(e)}
                onMouseDown={e => grabPiece(e)}
                id="chessboard"
                ref={chessboardRef}
    >{board}
    </div>;
}
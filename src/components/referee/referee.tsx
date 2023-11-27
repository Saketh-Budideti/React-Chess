import React, {useEffect, useRef, useState} from "react";
import {Piece, Position} from "../../models";
import {PieceType, Sides} from "../../Types";
import {PawnC} from "../../models/PawnC";
import {initialBoard} from "../../Constants";
import {Board} from "../../models/Board";
import Chessboard from "../chessboard/chessboard";

export default function Referee(){
    // useState used to render and update the board (beginning from a clone of the inital board)
    const [board, setBoard] = useState<Board>(initialBoard.clone());
    // useState used to render and update the promotion pawn
    const [promotionPawn, setPromotionPawn] = useState<Piece>();

    // useRef used to access the model and checkmate div element
    const modelRef = useRef<HTMLDivElement>(null);
    const checkMateModelRef = useRef<HTMLDivElement>(null);


    // playMove function that takes a piece and a position and returns true if the move is valid and plays the move
    function playMove(playedPiece: Piece, destination: Position) : boolean{
        if(playedPiece.possibleMoves === undefined){
            return false;
        }
        if(playedPiece.side === Sides.PLAYER && board.totalTurns % 2 !== 1){
            return false;
        }

        if(playedPiece.side === Sides.OPPONENT && board.totalTurns % 2 !== 0){
            return false;
        }


        let playedMoveIsValid = false;



        const validMove = playedPiece.possibleMoves?.some(m => m.samePosition(destination));

        if(!validMove){
            return false;
        }

        const enpassantable = isEnpassantable(playedPiece.position, destination, playedPiece.type, playedPiece.side);

        // Creates a new board if the move is valid
        setBoard((previousBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.totalTurns += 1;
            playedMoveIsValid = clonedBoard.playMove(enpassantable, destination, playedPiece, validMove);

            // If someone won, show the checkmate model
            if(clonedBoard.winningTeam !== undefined){
                checkMateModelRef.current?.classList.remove("hide");
            }

            return clonedBoard;
        })




        // promotion prompts
        let pRow = (playedPiece.side === Sides.PLAYER) ? 7 : 0
        if (destination.y === pRow && playedPiece.isPawn){
            modelRef.current?.classList.remove("hide");
            
            // creates a new pieece to replace the pawn and places it in the correct position
            setPromotionPawn((previousPromotionPawn) => {
                const clonedPlayedPiece = playedPiece.clone();
                clonedPlayedPiece.position = destination.clone();
                return clonedPlayedPiece;
            });
        }

        return playedMoveIsValid;

    }

    function isEnpassantable(initialPos: Position, desiredPos: Position, pieceType: PieceType, side: Sides): boolean {
        const direction = (side === Sides.PLAYER) ? 1 : -1;
        if (pieceType === PieceType.PAWN) {
            if ((Math.abs(desiredPos.x - initialPos.x) === 1) && desiredPos.y - initialPos.y === direction) {
                const piece = board.pieces.find((p) => p.position.x === desiredPos.x && p.position.y === desiredPos.y - direction && p.isPawn && (p as PawnC).enPassant
                );
                if (piece) {
                    return true;
                }
            }

        }
        return false;
    }


    // removes the checkmate div and clones the intial board
    function restartGame() {
        checkMateModelRef.current?.classList.add("hide");
        setBoard(initialBoard.clone());
    }



    // promotion handling
    function promotePawn(pieceType: PieceType){
        if(promotionPawn === undefined){
            return;
        } 

        // creates a new board with a new piece (a promoted pawn) in the correct position
        setBoard((previousBoard) => {
            const clonedBoard = board.clone()
            clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
                if(piece.samePiecePosition(promotionPawn)){
                    results.push(new Piece(piece.position.clone(), pieceType, piece.side, true))
                } else {
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);

            // recalculates all possible moves to ensure promoted piece displays possible moves
            clonedBoard.calculateAllMoves();
            return clonedBoard;
        })
    
        // hides the promotion model
        modelRef.current?.classList.add("hide");
    }

    const imagePromoSide = promotionPawn?.side === Sides.PLAYER ? "w" : "b";

    return (
        <>
            <div className = "model hide" ref={modelRef}>
                <div id = "pawn-promotion" className = "container">
                    <p><img onClick={() => promotePawn(PieceType.QUEEN)} src = {`/assets/images/${imagePromoSide}Q.svg`} alt = ""></img></p>
                    <p><img onClick={() => promotePawn(PieceType.KNIGHT)} src = {`/assets/images/${imagePromoSide}N.svg`} alt = ""></img></p>
                    <p><img onClick={() => promotePawn(PieceType.ROOK)} src = {`/assets/images/${imagePromoSide}R.svg`} alt = ""></img></p>
                    <p><img onClick={() => promotePawn(PieceType.BISHOP)} src = {`/assets/images/${imagePromoSide}B.svg`} alt = ""></img></p>
                </div>
            </div>
            <div className ="model hide" ref={checkMateModelRef}>
                <div className = "model-body">
                    <div className = "checkmate-body">
                        <span>{board.winningTeam === Sides.PLAYER ? "White" : "Black"} won</span>
                        <button onClick={restartGame}>Play again!</button>
                    </div>

                </div>
            </div>
                <Chessboard playMove={playMove} pieces={board.pieces}/>
        </>
    );
}
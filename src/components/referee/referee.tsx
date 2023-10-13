import React, {useEffect, useRef, useState} from "react";
import {
    bishopMove,
    getPossibleBishopMoves, getPossibleKingMoves,
    getPossibleKnightMoves,
    getPossiblePawnMoves, getPossibleQueenMoves,
    getPossibleRookMoves, kingMove, knightMove, pawnMove, queenMove, rookMove
} from "../../referee/pieces";
import {Piece, Position} from "../../models";
import {PieceType, Sides} from "../../Types";
import {PawnC} from "../../models/PawnC";
import {initialBoard} from "../../Constants";
import {Board} from "../../models/Board";
import Chessboard from "../chessboard/chessboard";

export default function Referee(){
    const [board, setBoard] = useState<Board>(initialBoard.clone());
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const modelRef = useRef<HTMLDivElement>(null);
    const checkMateModelRef = useRef<HTMLDivElement>(null);



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

        setBoard((previousBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.totalTurns += 1;
            playedMoveIsValid = clonedBoard.playMove(enpassantable, destination, playedPiece, validMove);


            if(clonedBoard.winningTeam !== undefined){
                checkMateModelRef.current?.classList.remove("hide");
            }

            return clonedBoard;
        })



        let pRow = (playedPiece.side === Sides.PLAYER) ? 7 : 0
        if (destination.y === pRow && playedPiece.isPawn){
            modelRef.current?.classList.remove("hide");
            setPromotionPawn((previousPromotionPawn) => {
                const clonedPlayedPiece = playedPiece.clone();
                clonedPlayedPiece.position = destination.clone();
                return clonedPlayedPiece;
            });
        }

        return playedMoveIsValid;

    }

    function isValidMove(initialPos: Position, desiredPos: Position, pieceType: PieceType, side: Sides) {
        if (desiredPos.x < 0 || desiredPos.y < 0 || desiredPos.x > 7 || desiredPos.y > 7 || desiredPos.samePosition(initialPos)) {
            return false;
        }

        switch (pieceType) {
            case PieceType.PAWN:
                return pawnMove(initialPos, desiredPos, side, board.pieces);
            case PieceType.KNIGHT:
                return knightMove(initialPos, desiredPos, side, board.pieces);
            case PieceType.BISHOP:
                return bishopMove(initialPos, desiredPos, side, board.pieces);
            case PieceType.ROOK:
                return rookMove(initialPos, desiredPos, side, board.pieces);
            case PieceType.QUEEN:
                return queenMove(initialPos, desiredPos, side, board.pieces);
            case PieceType.KING:
                return kingMove(initialPos, desiredPos, side, board.pieces);
        }

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

    function restartGame() {
        checkMateModelRef.current?.classList.add("hide");
        setBoard(initialBoard.clone());
    }




    function promotePawn(pieceType: PieceType){
        if(promotionPawn === undefined){
            return;
        } // remove later

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

            clonedBoard.calculateAllMoves();
            return clonedBoard;
        })

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
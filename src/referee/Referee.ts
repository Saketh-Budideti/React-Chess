import {Piece, PieceType, Position, samePosition, Sides} from "../Constants"
import {pawnMove, knightMove, bishopMove, rookMove, queenMove, kingMove} from "./pieces/";


export default class referee {




    isEnpassantable(initialPos: Position, desiredPos: Position, pieceType: PieceType, side: Sides, boardState: Piece[]): boolean {
        const direction = (side === Sides.PLAYER) ? 1 : -1;
        if (pieceType === PieceType.PAWN) {
            if ((Math.abs(desiredPos.x - initialPos.x) === 1) && desiredPos.y - initialPos.y === direction) {
                const piece = boardState.find((p) => p.position.x === desiredPos.x && p.position.y === desiredPos.y - direction && p.enPassant
                );
                if (piece) {
                    return true;
                }
            }

        }
        return false;
    }




    isValidMove(initialPos: Position, desiredPos: Position, pieceType: PieceType, side: Sides, boardState: Piece[]) {
        if (desiredPos.x < 0 || desiredPos.y < 0 || desiredPos.x > 7 || desiredPos.y > 7 || samePosition(desiredPos, initialPos)) {
            return false;
        }

        switch (pieceType) {
            case PieceType.PAWN:
                return pawnMove(initialPos, desiredPos, side, boardState);
            case PieceType.KNIGHT:
                return knightMove(initialPos, desiredPos, side, boardState);
            case PieceType.BISHOP:
                return bishopMove(initialPos, desiredPos, side, boardState);
            case PieceType.ROOK:
                return rookMove(initialPos, desiredPos, side, boardState);
            case PieceType.QUEEN:
                return queenMove(initialPos, desiredPos, side, boardState);
            case PieceType.KING:
                return kingMove(initialPos, desiredPos, side, boardState);
        }

    }
}
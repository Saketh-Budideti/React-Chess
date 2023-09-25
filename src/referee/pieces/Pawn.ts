import {Piece, Position, Sides} from "../../Constants";
import {isOccupied, isOccupiedbyOpponent} from "./States"

export const pawnMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]): boolean => {
    //movement
    const startingRow = (side === Sides.PLAYER) ? 1 : 6;
    const direction = (side === Sides.PLAYER) ? 1 : -1;

    if (initialPos.x === desiredPos.x) {
        if (initialPos.y === startingRow && (desiredPos.y - initialPos.y) === direction * 2) {
            if (!isOccupied(desiredPos, boardState) && (!isOccupied({
                x: desiredPos.x,
                y: desiredPos.y - direction
            }, boardState))) {
                return true;
            }
        } else if (desiredPos.y - initialPos.y === direction) {
            if (!isOccupied(desiredPos, boardState)) {
                return true;
            }
        }
    }
    //capture
    else if (Math.abs(desiredPos.x - initialPos.x) === 1 && (desiredPos.y - initialPos.y) === direction) {
        if (isOccupiedbyOpponent(desiredPos, boardState, side)) {
            return true;
        }
    }
    return false;
}


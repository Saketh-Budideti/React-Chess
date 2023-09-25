import {Piece, Position, Sides} from "../../Constants";
import {isFreeOrOccByOpp} from "./States";

export const knightMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]): boolean => {
    if ((Math.abs(desiredPos.x - initialPos.x) === 1 && Math.abs(desiredPos.y - initialPos.y) === 2) ||
        (Math.abs(desiredPos.y - initialPos.y) === 1 && Math.abs(desiredPos.x - initialPos.x) === 2)) {
        if (isFreeOrOccByOpp(desiredPos, boardState, side)) {
            return true;
        }
    }
    return false;
}
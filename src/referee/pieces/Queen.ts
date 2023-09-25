import {Piece, Position, samePosition, Sides} from "../../Constants";
import {isFreeOrOccByOpp, isOccupied} from "./States";

export const queenMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]) => {
    for (let i = 1; i < 8; i++) {
        let dirX = (initialPos.x > desiredPos.x) ? -1 : (initialPos.x < desiredPos.x) ? 1 : 0;
        let dirY = (initialPos.y > desiredPos.y) ? -1 : (initialPos.y < desiredPos.y) ? 1 : 0;
        let passedPosition: Position = {x: initialPos.x + (i * dirX), y: initialPos.y + (i * dirY)};

        if (isFreeOrOccByOpp(passedPosition, boardState, side) && samePosition(passedPosition, desiredPos)) {
            return true;
        } else {
            if (isOccupied(passedPosition, boardState)) {
                break;
            }
        }
    }
    return false;
}
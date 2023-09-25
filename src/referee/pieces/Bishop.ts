import {Piece, Position, samePosition, Sides} from "../../Constants";
import {isFreeOrOccByOpp, isOccupied} from "./States";

export const bishopMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]) => {
    for (let i = 1; i < 8; i++) {
        let dirY = (initialPos.y < desiredPos.y) ? 1 : -1;
        let dirX = (initialPos.x < desiredPos.x) ? 1 : -1;
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
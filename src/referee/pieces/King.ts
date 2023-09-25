import {Piece, Position, samePosition, Sides} from "../../Constants";
import {isFreeOrOccByOpp} from "./States";

export const kingMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]) => {
    let dirX = (initialPos.x > desiredPos.x) ? -1 : (initialPos.x < desiredPos.x) ? 1 : 0;
    let dirY = (initialPos.y > desiredPos.y) ? -1 : (initialPos.y < desiredPos.y) ? 1 : 0;
    let passedPosition: Position = {x: initialPos.x + (dirX), y: initialPos.y + (dirY)};

    if (isFreeOrOccByOpp(passedPosition, boardState, side) && samePosition(passedPosition, desiredPos)) {
        return true;
    }
    return false;
}
import {Piece, Position} from "../../models";
import {Sides} from "../../Types";

// methods that check if squares are free or occupied by opponent
export const isFreeOrOccByOpp = ((position: Position, boardState: Piece[], side: Sides): boolean => {

    return !isOccupied(position, boardState) || isOccupiedbyOpponent(position, boardState, side);
});

export const isOccupied = (position: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find((p) => p.samePosition(position));

    return !!piece;
}

export const isOccupiedbyOpponent = (position: Position, boardState: Piece[], side: Sides): boolean => {

    const piece = boardState.find(p => p.samePosition(position) && p.side != side);

    return !!piece;
}

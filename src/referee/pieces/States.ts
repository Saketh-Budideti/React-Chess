import {Piece, PieceType, Position, samePosition, Sides} from "../../Constants";

export const isFreeOrOccByOpp = ((position: Position, boardState: Piece[], side: Sides): boolean => {

    return !isOccupied(position, boardState) || isOccupiedbyOpponent(position, boardState, side);
});

export const isOccupied = (position: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find((p) => samePosition(p.position, position));

    return !!piece;
}

export const isOccupiedbyOpponent = (position: Position, boardState: Piece[], side: Sides): boolean => {

    const piece = boardState.find(p => samePosition(p.position, position) && p.side != side);

    return !!piece;
}

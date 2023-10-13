import {isFreeOrOccByOpp, isOccupied, isOccupiedbyOpponent} from "./States";
import {Piece, Position} from "../../models";
import {Sides} from "../../Types";

export const kingMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]) => {
    let dirX = (initialPos.x > desiredPos.x) ? -1 : (initialPos.x < desiredPos.x) ? 1 : 0;
    let dirY = (initialPos.y > desiredPos.y) ? -1 : (initialPos.y < desiredPos.y) ? 1 : 0;
    let passedPosition: Position = new Position(initialPos.x + (dirX), initialPos.y + (dirY));

    if (isFreeOrOccByOpp(passedPosition, boardState, side) && passedPosition.samePosition(desiredPos)) {
        return true;
    }
    return false;
}

export const getPossibleKingMoves = (piece: Piece, boardState: Piece[]) : Position[] => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 2; i++) {

        const destination= new Position(piece.position.x, piece.position.y + i);

        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom movement
    for(let i = 1; i < 2; i++) {
        const destination= new Position(piece.position.x, piece.position.y - i);
        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Left movement
    for(let i = 1; i < 2; i++) {
        const destination= new Position(piece.position.x - i, piece.position.y);
        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Right movement
    for(let i = 1; i < 2; i++) {
        const destination= new Position(piece.position.x + i, piece.position.y);
        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Upper right movement
    for(let i = 1; i < 2; i++) {
        const destination= new Position(piece.position.x + i, piece.position.y + i);
        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom right movement
    for(let i = 1; i < 2; i++) {
        const destination= new Position(piece.position.x + i, piece.position.y - i);
        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom left movement
    for(let i = 1; i < 2; i++) {
        const destination= new Position(piece.position.x - i, piece.position.y - i);
        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Top left movement
    for(let i = 1; i < 2; i++) {
        const destination= new Position(piece.position.x - i, piece.position.y + i);
        if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7){
            break;
        }

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}

// needs to be fixed: king can castle in check, certain castling being prevented, if n on f2 is attaching rh1, no castling
// add ui so that king can move two squares over and castle instead

export const getCastlingMoves = (piece: Piece, boardState: Piece[]): Position[] => {

    const possibleMoves: Position[] = [];

    if(piece.hasMoved){
        return possibleMoves;
    }

    const rooks = boardState.filter(p => p.isRook && p.side == piece.side && !p.hasMoved);

    for(const rook of rooks){
        const direction = (rook.position.x - piece.position.x > 0) ? 1 : -1;

        const adjacentPosition = piece.position.clone();
        adjacentPosition.x += direction;


        if(!rook.possibleMoves?.some(m => m.samePosition(adjacentPosition))){
            continue;
        }

        const concerningTiles = rook.possibleMoves.filter(m => m.y === piece.position.y);

        const enemyPieces = boardState.filter(p => p.side !== piece.side);

        let valid = true;

        for(const enemy of enemyPieces) {
            if (enemy.possibleMoves === undefined) {
                continue;
            }
            for (const move of enemy.possibleMoves) {
                if (concerningTiles.some(t => t.samePosition(move))) {
                    valid = false;
                }
                if (!valid) {
                    break;
                }
            }

            if (!valid) {
                break;
            }
        }

        if(!valid){
            continue;
        }


        possibleMoves.push(rook.position.clone());


        // if(enemyPieces.some(p => p.possibleMoves?.some(m => concerningTiles.some(t => t.samePosition(m))))){
        //     continue;
        // }
    }


    return possibleMoves;
}

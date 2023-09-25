export const H_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const V_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const GRIDSIZE = 100;

export function samePosition(p1: Position, p2: Position){
    return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
    x: number,
    y: number,
}
export interface Piece{
    image: string;
    position : Position
    type: PieceType;
    side : Sides;
    enPassant? : boolean;
}


export enum Sides{
    OPPONENT,
    PLAYER
}

export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING,
}


export const initialBoardState: Piece[] = [
    {image: `assets/images/bR.svg`, position :{x: 0, y: 7}, type: PieceType.ROOK, side: Sides.OPPONENT},
    {image: `assets/images/bR.svg`, position :{x: 7, y: 7}, type: PieceType.ROOK, side: Sides.OPPONENT},
    {image: `assets/images/bN.svg`, position :{x: 1, y: 7}, type: PieceType.KNIGHT, side: Sides.OPPONENT},
    {image: `assets/images/bN.svg`, position :{x: 6, y: 7}, type: PieceType.KNIGHT, side: Sides.OPPONENT},
    {image: `assets/images/bB.svg`, position :{x: 2, y: 7}, type: PieceType.BISHOP, side: Sides.OPPONENT},
    {image: `assets/images/bB.svg`, position :{x: 5, y: 7}, type: PieceType.BISHOP, side: Sides.OPPONENT},
    {image: `assets/images/bK.svg`, position :{x: 4, y: 7}, type: PieceType.KING, side: Sides.OPPONENT},
    {image: `assets/images/bQ.svg`, position :{x: 3, y: 7}, type: PieceType.QUEEN, side: Sides.OPPONENT},

    {image: `assets/images/bP.svg`, position :{x: 0, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},
    {image: `assets/images/bP.svg`, position :{x: 1, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},
    {image: `assets/images/bP.svg`, position :{x: 2, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},
    {image: `assets/images/bP.svg`, position :{x: 3, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},
    {image: `assets/images/bP.svg`, position :{x: 4, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},
    {image: `assets/images/bP.svg`, position :{x: 5, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},
    {image: `assets/images/bP.svg`, position :{x: 6, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},
    {image: `assets/images/bP.svg`, position :{x: 7, y: 6}, type: PieceType.PAWN, side: Sides.OPPONENT},

    {image: `assets/images/wR.svg`, position :{x: 0, y: 0}, type: PieceType.ROOK, side: Sides.PLAYER},
    {image: `assets/images/wR.svg`, position :{x: 7, y: 0}, type: PieceType.ROOK, side: Sides.PLAYER},
    {image: `assets/images/wN.svg`, position :{x: 1, y: 0}, type: PieceType.KNIGHT, side: Sides.PLAYER},
    {image: `assets/images/wN.svg`, position :{x: 6, y: 0}, type: PieceType.KNIGHT, side: Sides.PLAYER},
    {image: `assets/images/wB.svg`, position :{x: 2, y: 0}, type: PieceType.BISHOP, side: Sides.PLAYER},
    {image: `assets/images/wB.svg`, position :{x: 5, y: 0}, type: PieceType.BISHOP, side: Sides.PLAYER},
    {image: `assets/images/wK.svg`, position :{x: 3, y: 3}, type: PieceType.KING, side: Sides.PLAYER},
    {image: `assets/images/wQ.svg`, position :{x: 3, y: 0}, type: PieceType.QUEEN, side: Sides.PLAYER},

    {image: `assets/images/wP.svg`, position :{x: 0, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
    {image: `assets/images/wP.svg`, position :{x: 1, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
    {image: `assets/images/wP.svg`, position :{x: 2, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
    {image: `assets/images/wP.svg`, position :{x: 3, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
    {image: `assets/images/wP.svg`, position :{x: 4, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
    {image: `assets/images/wP.svg`, position :{x: 5, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
    {image: `assets/images/wP.svg`, position :{x: 6, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
    {image: `assets/images/wP.svg`, position :{x: 7, y: 1}, type: PieceType.PAWN, side: Sides.PLAYER},
];
import {Piece, Position} from "./models/";
import {PieceType, Sides} from "./Types";
import {PawnC} from "./models/PawnC";
import {Board} from "./models/Board";

export const H_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const V_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const GRIDSIZE = 100;




export const initialBoard: Board = new Board([

    new Piece(new Position(0, 7), PieceType.ROOK, Sides.OPPONENT, false),
    new Piece(new Position(7, 7), PieceType.ROOK, Sides.OPPONENT, false),
    new Piece(new Position(1, 7), PieceType.KNIGHT, Sides.OPPONENT, false),
    new Piece(new Position(6, 7), PieceType.KNIGHT, Sides.OPPONENT, false),
    new Piece(new Position(2, 7), PieceType.BISHOP, Sides.OPPONENT, false),
    new Piece(new Position(5, 7), PieceType.BISHOP, Sides.OPPONENT, false),
    new Piece(new Position(4, 7), PieceType.KING, Sides.OPPONENT, false),
    new Piece(new Position(3, 7), PieceType.QUEEN, Sides.OPPONENT, false),



    new Piece(new Position(0, 0), PieceType.ROOK, Sides.PLAYER, false),
    new Piece(new Position(7, 0), PieceType.ROOK, Sides.PLAYER, false),
    new Piece(new Position(1, 0), PieceType.KNIGHT, Sides.PLAYER, false),
    new Piece(new Position(6, 0), PieceType.KNIGHT, Sides.PLAYER, false),
    new Piece(new Position(2, 0), PieceType.BISHOP, Sides.PLAYER, false),
    new Piece(new Position(5, 0), PieceType.BISHOP, Sides.PLAYER, false),
    new Piece(new Position(4, 0), PieceType.KING, Sides.PLAYER, false),
    new Piece(new Position(3, 0), PieceType.QUEEN, Sides.PLAYER, false),

    new PawnC(new Position(0, 6), Sides.OPPONENT, false),
    new PawnC(new Position(1, 6), Sides.OPPONENT, false),
    new PawnC(new Position(2, 6), Sides.OPPONENT, false),
    new PawnC(new Position(3, 6), Sides.OPPONENT, false),
    new PawnC(new Position(4, 6), Sides.OPPONENT, false),
    new PawnC(new Position(5, 6), Sides.OPPONENT, false),
    new PawnC(new Position(6, 6), Sides.OPPONENT, false),
    new PawnC(new Position(7, 6), Sides.OPPONENT, false),
    new PawnC(new Position(0, 1), Sides.PLAYER, false),
    new PawnC(new Position(1, 1), Sides.PLAYER, false),
    new PawnC(new Position(2, 1), Sides.PLAYER, false),
    new PawnC(new Position(3, 1), Sides.PLAYER, false),
    new PawnC(new Position(4, 1), Sides.PLAYER, false),
    new PawnC(new Position(5, 1), Sides.PLAYER, false),
    new PawnC(new Position(6, 1), Sides.PLAYER, false),
    new PawnC(new Position(7, 1), Sides.PLAYER, false)



], 1);

initialBoard.calculateAllMoves();
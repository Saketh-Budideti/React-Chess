import {Piece} from "./Piece";
import {PawnC} from "./PawnC";
import {Position} from "./Position";
import {PieceType, Sides} from "../Types";
import {
    getCastlingMoves,
    getPossibleBishopMoves,
    getPossibleKingMoves,
    getPossibleKnightMoves,
    getPossiblePawnMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves
} from "../referee/pieces";
import {Simulate} from "react-dom/test-utils";

export class Board {
    pieces: Piece[];
    totalTurns: number;
    winningTeam?: Sides;

    constructor(pieces: Piece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    calculateAllMoves() {
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }


        for (const king of this.pieces.filter(p => p.isKing)) {
            if (king.possibleMoves === undefined) {
                continue;
            }

            king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, this.pieces)];
        }

        this.checkCurrentTeamMoves();


        for (const piece of this.pieces.filter(p => p.side !== this.currentSide)) {
            piece.possibleMoves = [];
        }


        if(this.pieces.filter(p => p.side === this.currentSide).some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0)){
            return;
        }

        this.winningTeam = (this.currentSide === Sides.PLAYER) ? Sides.OPPONENT : Sides.PLAYER;


    }

    get currentSide(): Sides {
        return this.totalTurns % 2 === 0 ? Sides.OPPONENT : Sides.PLAYER;
    }

    checkCurrentTeamMoves() {
        for (const piece of this.pieces.filter(p => p.side === this.currentSide)) {
            if (piece.possibleMoves === undefined) {
                continue;
            }
            for (const move of piece.possibleMoves) {
                const simulatedBoard = this.clone();

                const pieceAtDestination = simulatedBoard.pieces.find(p => p.samePosition(move));
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));


                const clonedPiece = simulatedBoard.pieces.find(p => p.samePiecePosition((piece)))!;

                clonedPiece.position = move.clone();

                const clonedKing = simulatedBoard.pieces.find(p => p.isKing && p.side === simulatedBoard.currentSide)!;


                let safe = true;
                for (const enemy of simulatedBoard.pieces.filter(p => p.side !== simulatedBoard.currentSide)) {
                    enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);

                    if (enemy.isPawn) {
                        if (enemy.possibleMoves.some(m => m.x !== enemy.position.x && m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition((move)));

                        }
                    } else {
                        if (enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition((move)));
                        }
                    }
                }
            }
        }
    }

    checkKingMoves() {
        const king = this.pieces.find(p => p.isKing && p.side == this.currentSide);

        if (king?.possibleMoves === undefined) {
            return;
        }

        for (const move of king?.possibleMoves) {

            const simulatedBoard = this.clone();


            const pieceAtDestination = simulatedBoard.pieces.find(p => p.samePosition(move));

            if (pieceAtDestination !== undefined) {
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));
            }

            const simulatedKing = simulatedBoard.pieces.find(p => p.isKing && p.side === simulatedBoard.currentSide);

            simulatedKing!.position = move;

            for (const enemy of simulatedBoard.pieces.filter(p => p.side !== simulatedBoard.currentSide)) {
                enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);
            }


            let safe = true;

            for (const p of simulatedBoard.pieces) {
                if (p.side === simulatedBoard.currentSide) {
                    continue;
                }
                if (p.isPawn) {
                    const possiblePawnMoves = simulatedBoard.getValidMoves(p, simulatedBoard.pieces);
                    if (possiblePawnMoves?.some(ppm => ppm.x !== p.position.x && ppm.samePosition(move))) {
                        safe = false;
                        break;
                    }
                } else if (p.possibleMoves?.some(p => p.samePosition(move))) {
                    safe = false;
                    break;
                }
            }

            if (!safe) {
                king.possibleMoves = king.possibleMoves?.filter(m => !m.samePosition(move))

            }
        }
    }

    getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
        switch (piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, boardState);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, boardState);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, boardState);
            case PieceType.KING:
                return getPossibleKingMoves(piece, boardState);
            default:
                return [];
        }
    }

    playMove(enpassantable: boolean, destination: Position, playedPiece: Piece, validMove: boolean): boolean {
        const direction = (playedPiece.side === Sides.PLAYER) ? 1 : -1;
        const destinationPiece = this.pieces.find(p => p.samePosition(destination));


        if(playedPiece.isKing && destinationPiece?.isRook && destinationPiece.side === playedPiece.side){
            const direction = (destinationPiece.position.x - playedPiece.position.x > 0) ? 1 : -1;
            const newKingXPosition = playedPiece.position.x + direction * 2;

            this.pieces = this.pieces.map(p => {
                if(p.samePiecePosition(playedPiece)){
                    p.position.x = newKingXPosition;
                } else if(p.samePiecePosition(destinationPiece)){
                    p.position.x = newKingXPosition - direction;
                }

                return p;
            });

            this.calculateAllMoves();
            return true;
        }



        if (enpassantable) {
        this.pieces = this.pieces.reduce((results, piece) => { // adds pieces to array and updates position

            if (piece.samePiecePosition(playedPiece)) {
                if (piece.isPawn) {
                    (piece as PawnC).enPassant = false;
                }
                piece.position.x = destination.x;
                piece.position.y = destination.y;

                piece.hasMoved = true;

                results.push(piece);
            } else if (!piece.samePosition(new Position(destination.x, destination.y - direction))) {
                if (piece.isPawn) {
                    (piece as PawnC).enPassant = false;
                }
                results.push(piece);
            }
            return results;
        }, [] as Piece[]);

        this.calculateAllMoves();
        } else if (validMove) {
            this.pieces = this.pieces.reduce((results, piece) => { // adds pieces to array and updates position
                if (piece.samePiecePosition(playedPiece)) {
                    if (piece.isPawn)
                        (piece as PawnC).enPassant = Math.abs(playedPiece.position.y - destination.y) === 2 && piece.type === PieceType.PAWN;

                    piece.position.x = destination.x;
                    piece.position.y = destination.y;

                    piece.hasMoved = true;


                    results.push(piece);
                } else if (!piece.samePosition(destination)) {
                    if (piece.isPawn) {
                        (piece as PawnC).enPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);

            this.calculateAllMoves();
        } else {
            return false;
        }
        return true;
    }

    clone(): Board {
        return new Board(this.pieces.map(p => p.clone()), this.totalTurns);
    }


}
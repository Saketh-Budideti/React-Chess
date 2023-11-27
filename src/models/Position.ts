export class Position{

    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // compares positions
    samePosition(otherPosition: Position): boolean{
        return this.x === otherPosition.x && this.y === otherPosition.y;
    }

    // clones position
    clone(): Position {
        return new Position(this.x, this.y);
    }
}
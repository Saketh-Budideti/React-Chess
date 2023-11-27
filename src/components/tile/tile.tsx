import './tile.css'
import React from "react";

interface Props {
    image?: string;
    number: number;
    highlight: boolean;
}
export default function Tile({image, number, highlight}: Props){

    const className: string = [
        "tile",
        number % 2  === 0 && "black-tile", number % 2 !== 0 && "white-tile", // if number is even, black tile, else white tile
        highlight && "tile-highlight", // highlighting to indicate check
        image && "chess-piece-tile" // renders the image of the piece if it exists on a tile
    ].filter(Boolean).join(' ');

    return <div className={className}>{image && <div style={{backgroundImage: `url(${image})`}} className = "chess-piece"></div>}</div>
}
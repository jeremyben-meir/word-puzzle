import * as Styles from "../assets/Styles";
import React, { useState, useEffect } from "react";

const Game = (params) => {

    const [wordgrid,setWordGrid] = useState([...Array(params["numtries"])].map(e => [...Array(params["wordlen"])].map(f => "")));
    const [xLoc,setXLoc] = useState(0);
    const [yLoc,setYLoc] = useState(0);
    const [change,setChange] = useState(0);

    useEffect(() => { document.addEventListener("keydown", detectKeypress)},[])
    useEffect(() => () => { document.removeEventListener("keydown", detectKeypress)},[])

    function update(keyCode){
        if (keyCode >= 65 && keyCode <= 90 && xLoc < params["wordlen"]){     
            wordgrid[yLoc][xLoc] = String.fromCharCode(keyCode);
            setXLoc(xLoc+1)
        } else if (keyCode == 13 && xLoc == params["wordlen"]){
            console.log(xLoc)
            if (true){
                setYLoc(yLoc+1)
                setXLoc(0)
            }
        } else if (keyCode == 8 && xLoc > 0){
            setXLoc(xLoc-1)
            wordgrid[yLoc][xLoc] = null;
        }
        setWordGrid(wordgrid)
        console.log(xLoc, yLoc)
    }

    function detectKeypress(event){
        setChange(change+1)
        update(event.keyCode)
    }

    useEffect(() => {
        console.log("UPDATE")
    }, [change])
    
    useEffect(() => {
        console.log("UPDATE")
    }, [xLoc])

    useEffect(() => {
        console.log("UPDATE")
    }, [yLoc])

    const letterbox = (letter,key) => (
        <p key={key} style={Styles.boxStyle}>
            {letter ? letter.toUpperCase() : ""}
        </p>
    )

    const wordbox = (word,key) => (
        <div key={key} style={Styles.wordStyle}>
            {Object.entries(word).map((link, index) =>
                (letterbox(word[index],index)))
            }
        </div>
    )

    const gridbox = (grid) => (
        <div style={Styles.gridStyle}>
            {Object.entries(grid).map((link, index) =>
                (wordbox(grid[index],index)))
            }
        </div>
    )

    return (
        <div>
            <button onClick={() => {setChange(change+1)}}>
                toggle dark mode
            </button>
            {gridbox(wordgrid)}
        </div>
    );
}

export default Game;
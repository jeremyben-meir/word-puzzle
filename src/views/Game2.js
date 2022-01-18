import * as Styles from "../assets/Styles";
import React, { useState, useEffect } from "react";
import Retry from '../images/retry.png';
import Backspace from '../images/backspace.png';
import Return from '../images/return.png';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.detectKeypress = this.detectKeypress.bind(this);
        this.keyStroke = this.keyStroke.bind(this);
        this.selectLetter = this.selectLetter.bind(this);
        this.handleRetry = this.handleRetry.bind(this);
        this.allowType = true;
        this.splits = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],["EN", 'Z', 'X', 'C', 'V', 'B', 'N', 'M', "BK"]];


        if (false){
            this.state = this.originalState()
            localStorage.setItem('state', JSON.stringify(this.state))
        } else {
            this.state = JSON.parse(localStorage.getItem('state')) || this.originalState()
            const dimensions = [
                this.state.wordgrid.length,
                this.state.wordgrid.reduce((x, y) => Math.max(x, y.length), 0)
            ];
            if (this.state.losses == null){
                this.state = this.originalState()
            } else if (this.props.wordlen != dimensions[1] || this.props.numtries != dimensions[0]) {
                this.state = {...this.originalState(), wins:this.state.wins, losses:this.state.losses, points:this.state.points}
            } else if (this.state.retryHidden == null){
                this.state = {...this.state, retryHidden:"hidden"}
            }
            this.handleRetry()
        }
    }

    originalState(){
        var alphabet = {};

        for (var i = 65; i <= 90; i++){
            alphabet[String.fromCharCode(i)]="white"
        }

        return({
            wordgrid: [...Array(this.props.numtries)].map(e => [...Array(this.props.wordlen)].map(f => "")),
            stylegrid: [...Array(this.props.numtries)].map(e => [...Array(this.props.wordlen)].map(f => "white")),
            xLoc: 0,
            yLoc: 0,
            alphabet: alphabet,
            status:"ongoing",
            word: this.get_word(),
            wins: 0,
            losses: 0,
            points: 0,
            retryHidden: "hidden",
        })
    }

    get_word(){
        var randomWords = require('random-words');
        var word = ""
        while (word.length < this.props.wordlen){
            word = (randomWords({exactly: 1, maxLength: this.props.wordlen}))[0]
        }
        return word.toUpperCase()
    }
    
    writeState(){
        localStorage.setItem('state', JSON.stringify(this.state))
        if(this.state.status == "fail" || this.state.status == "success"){
            this.props.ReactGa.event({
                category:this.state.yLoc+1,
                action:this.state.status
            })
        } 
    }

    componentDidMount(){
        document.addEventListener("keydown", this.detectKeypress, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.detectKeypress, false);
    }

    async update_style(guess){
        if (this.state.wordgrid[this.state.yLoc][this.state.xLoc]=="") return;
        var tempstylegrid = this.state.stylegrid;
        var tempword = this.state.word.split("");
        var tempalpha = this.state.alphabet;
        var correctNum = 0
        for (var i = 0; i < tempstylegrid[this.state.yLoc].length; i++) {
            if (guess[i] == this.state.word[i]){
                tempstylegrid[this.state.yLoc][i]=Styles.gameSettings.correct
                tempword[i] = "";
                tempalpha[guess[i]]=Styles.gameSettings.correct
                correctNum = correctNum + 1
            }
        }
        if (correctNum == this.props.wordlen){
            return({
                ...this.state,
                status:"success",
                wins: this.state.wins+1,
                points: this.state.points+this.state.yLoc+1,
                retryHidden: "visible",
            })
        } else {
            for (var i = 0; i < tempstylegrid[this.state.yLoc].length; i++) {
                const index = tempword.indexOf(guess[i]);
                if (tempstylegrid[this.state.yLoc][i]=="white"){
                    if (index > -1){
                        tempstylegrid[this.state.yLoc][i]=Styles.gameSettings.misplace
                        tempword.splice(index, 1);
                        if (tempalpha[guess[i]]=="white")
                            tempalpha[guess[i]]=Styles.gameSettings.misplace
                    } else {
                        tempstylegrid[this.state.yLoc][i]=Styles.gameSettings.error
                        if (tempalpha[guess[i]]=="white")
                            tempalpha[guess[i]]=Styles.gameSettings.error
                    }
                }
            }
            if (this.state.yLoc < this.props.numtries-1){
                return({
                    ...this.state,
                    xLoc: 0,
                    yLoc: this.state.yLoc+1,
                    stylegrid: tempstylegrid,
                    alphabet: tempalpha,
                })
            } else {
                return({
                    ...this.state,
                    status:"fail",
                    losses: this.state.losses+1,
                    retryHidden: "visible",
                })
            }
        }
    }

    statText(){
        if (this.state.status == "fail"){
            return(
            <div style={Styles.statsBox}>
                <p style={Styles.statsBoxDiv}>The word was </p>
                <p style={{...Styles.statsBoxDiv, fontWeight: "bold"}}>{this.state.word.toUpperCase()}</p>
            </div> 
            )
        }
        return(
            <div style={Styles.statsBox}>
                <p style={Styles.statsBoxDiv}>Wins </p>
                <p style={{...Styles.statsBoxDiv, fontWeight: "bold"}}>{this.state.wins}</p>
                <p style={Styles.statsBoxDiv}>Losses </p>
                <p style={{...Styles.statsBoxDiv, fontWeight: "bold"}}>{this.state.losses}</p>
                <p style={Styles.statsBoxDiv}>Average Score </p>
                <p style={{...Styles.statsBoxDiv, fontWeight: "bold"}}>{this.state.wins == 0 ? 0 : Math.round((this.state.points/this.state.wins) * 100) / 100}</p>
            </div> 
        )
    }

    async selectLetter(keyCode){            
        if(this.state.status == "ongoing"){
            var tempgrid = this.state.wordgrid;
            var tempXLoc = this.state.xLoc

            var is_key = keyCode >= 65 && keyCode <= 90 && tempXLoc < this.props.wordlen
            var is_bksp = keyCode == 8 && tempXLoc > 0
            
            if (is_key || is_bksp){    
                if (is_key){ 
                    tempgrid[this.state.yLoc][tempXLoc] = String.fromCharCode(keyCode);
                    tempXLoc += 1
                } else if (is_bksp){
                    tempXLoc -=1
                    tempgrid[this.state.yLoc][tempXLoc] = null;
                }
                this.setState({
                    ...this.state,
                    wordgrid: tempgrid,
                    xLoc: tempXLoc,
                },() => {
                    this.writeState()
                })
            } else if (keyCode == 13 && tempXLoc == this.props.wordlen){
                const word = this.state.wordgrid[this.state.yLoc]
                const url = "https://wordsapiv1.p.rapidapi.com/words/"+word.join("")+"/definitions"
                const response = await fetch(url, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                        "x-rapidapi-key": "4fa7dfd9c1msh7772640164c9952p1a4bbdjsne0d8086365d2"
                    }
                })
                if (response.ok || word == this.state.word.toLowerCase()) {
                    const result_state = await this.update_style(word)
                    this.setState(result_state,() => {
                        this.writeState()
                    })
                }
            }
        }    
        return
    }

    async detectKeypress(event){
        await this.triggerSelect(event.keyCode)
    }

    async triggerSelect(keyCode){
        if (keyCode == 13 && this.state.retryHidden == "visible"){
            this.handleRetry()
        } else if (this.allowType){
            this.allowType = false
            await this.selectLetter(keyCode)
            this.allowType = true
        }
    }

    letterbox (letter,color,key){
        return(
            <div key={"letterbox"+key} style={{
                ...Styles.boxStyle,
                backgroundColor:color
                }}>
                <p key={"letter"+key} style={Styles.fontStyle}>
                    {letter ? letter.toUpperCase() : ""}
                </p>
            </div>
        )
    } 

    async keyStroke (letter,e) {
        e.preventDefault();
        var keyCode = 0
        if (letter == "BK")
            keyCode = 8;
        else if (letter == "EN")
            keyCode = 13;
        else
            keyCode = letter.charCodeAt(0)
                
        await this.triggerSelect(keyCode)
    }

    keyboard (letter,color,key){
        const is_special = (letter=="BK") || (letter=="EN")
        const special_view =(<img src={(letter=="BK") ? Backspace : Return} style={Styles.specialKeyFontStyle} />)
        const regular_view = <p style={Styles.keyFontStyle}> {letter ? letter.toUpperCase() : ""} </p>
        
        return(
            <div key={"keyboard"+key} onClick={(e) => this.keyStroke(letter, e)} style={{
                ...(is_special ? Styles.specialKeyStyle : Styles.keyStyle),
                backgroundColor:color
                }}>
                {is_special ? special_view : regular_view}
            </div>
        )
    } 

    wordbox (word,stylerow,key) {
        return(
            <div key={"wordbox"+key} style={Styles.wordStyle}>
                {Object.entries(word).map((link, index) =>
                    (this.letterbox(word[index],stylerow[index],index)))
                }
            </div>
        )
    }

    gridbox (wordgrid,stylegrid) {
        return (
            <div style={Styles.gridStyle}>
                {Object.entries(wordgrid).map((link, index) =>
                    (this.wordbox(wordgrid[index],stylegrid[index],index)))
                }
            </div>
        )
    }

    handleRetry(){
        this.setState({
            ...this.originalState(), wins:this.state.wins, losses:this.state.losses, points:this.state.points
        },() => {
            this.writeState()
        })

    }

    render() {
        return (
            <div>
            

            <div style={Styles.mainDivStyle}>

                <div style={Styles.retryDivStyle} >
                    <img src={Retry} onClick={(e) => this.handleRetry(e)} alt="Retry" style={{...Styles.retryStyle, visibility: this.state.retryHidden}} />
                </div>
                
                {this.statText()}
                
                <div>
                    {this.gridbox(this.state.wordgrid,this.state.stylegrid)}
                </div>
                <div style={Styles.bankStyle}>
                {Object.entries(this.splits).map((key_val, index0) => (
                    <div key={index0} style={Styles.subBankStyle}>
                    {Object.entries(key_val[1]).map((link, index) =>
                        (this.keyboard(link[1],this.state.alphabet[link[1]],index)))}
                    </div>
                ))}
                </div>
            </div>
            </div>
        )
    }
}

export default Game;
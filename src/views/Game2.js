import * as Styles from "../assets/Styles";
import React, { useState, useEffect } from "react";

class Game extends React.Component {
    constructor(props){
        super(props);
        this.detectKeypress = this.detectKeypress.bind(this);
        this.keyStroke = this.keyStroke.bind(this);
        this.selectLetter = this.selectLetter.bind(this);
        if (false){
            this.state = this.originalState()
            localStorage.setItem('state', JSON.stringify(this.state))
        } else {
            this.state = JSON.parse(localStorage.getItem('state')) || this.originalState()
            if (this.state.losses == null){
                this.state = this.originalState()
            }
        }
        console.log(this.state.word)
    }

    originalState(){
        var alphabet = {};
        var splits = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],["BK", 'Z', 'X', 'C', 'V', 'B', 'N', 'M', "EN"]];

        for (var i = 65; i <= 90; i++){
            alphabet[String.fromCharCode(i)]="white"
        }

        return({
            wordgrid: [...Array(this.props.numtries)].map(e => [...Array(this.props.wordlen)].map(f => "")),
            stylegrid: [...Array(this.props.numtries)].map(e => [...Array(this.props.wordlen)].map(f => "white")),
            xLoc: 0,
            yLoc: 0,
            alphabet: alphabet,
            splits: splits,
            status:"ongoing",
            word: this.props.word,
            wins: 0,
            losses: 0,
            points: 0,
        })
    }
    
    writeState(){
        if (this.state.status=="ongoing"){
            localStorage.setItem('state', JSON.stringify(this.state))
        } else if (this.state.status=="success"){
            localStorage.setItem('state', JSON.stringify({...this.originalState(), wins:this.state.wins, losses:this.state.losses, points:this.state.points}))
        } else if (this.state.status=="fail"){
            localStorage.setItem('state', JSON.stringify({...this.originalState(), wins:this.state.wins, losses:this.state.losses, points:this.state.points}))
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.detectKeypress, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.detectKeypress, false);
    }

    update_style(guess){
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
            this.setState({
                ...this.state,
                status:"success",
                wins: this.state.wins+1,
                points: this.state.points+this.state.yLoc+1
            },() => this.writeState())
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
        }
        if (this.state.yLoc < this.props.numtries-1){
            this.setState({
                ...this.state,
                xLoc: 0,
                yLoc: this.state.yLoc+1,
                stylegrid: tempstylegrid,
                alphabet: tempalpha
            },() => this.writeState())
        } else {
            this.setState({
                ...this.state,
                status:"fail",
                losses: this.state.losses+1,
            },() => this.writeState())
        }
    }

    check_if_word_exists(word) {
        const url = "https://api.wordnik.com/v4/word.json/" + word.join("").toLowerCase() + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        var res = {}
        fetch(url)
            .then(res => {
                if (res.ok || word == this.state.word.toLowerCase()) {
                    this.update_style(word)
                }
            }
            )
    }

    selectLetter(keyCode, setting=false){
        if(this.state.status == "ongoing"){
            var tempgrid = this.state.wordgrid;
            
            if (keyCode >= 65 && keyCode <= 90 && this.state.xLoc < this.props.wordlen){     
                tempgrid[this.state.yLoc][this.state.xLoc] = String.fromCharCode(keyCode);
                if (setting){
                    this.setState({
                        ...this.state,
                        xLoc: this.state.xLoc+1
                    },() => this.writeState())
                } else {
                    this.state.xLoc = this.state.xLoc+1
                }
            } else if (keyCode == 13 && this.state.xLoc == this.props.wordlen){
                this.check_if_word_exists(this.state.wordgrid[this.state.yLoc])
            } else if (keyCode == 8 && this.state.xLoc > 0){
                if (setting) {
                    this.setState({
                        ...this.state,
                        xLoc: this.state.xLoc-1
                    },() => this.writeState())
                } else {
                    this.state.xLoc = this.state.xLoc-1
                }
                tempgrid[this.state.yLoc][this.state.xLoc] = null;
            }
            this.setState({
                ...this.state,
                wordgrid: tempgrid,
            },() => this.writeState())
        }
    }

    detectKeypress(event){
        this.selectLetter(event.keyCode)
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

    keyStroke (letter,e) {
        e.preventDefault();
        var keyCode = 0
        if (letter == "BK")
            keyCode = 8;
        else if (letter == "EN")
            keyCode = 13;
        else
            keyCode = letter.charCodeAt(0)
                
        this.selectLetter(keyCode)
        this.state.xLoc = this.state.xLoc+1
    }

    keyboard (letter,color,key){
        return(
            <div key={"keyboard"+key} onClick={(e) => this.keyStroke(letter, e)} style={{
                ...Styles.keyStyle,
                backgroundColor:color
                }}>
                <p style={Styles.keyFontStyle}>
                    {letter ? letter.toUpperCase() : ""}
                </p>
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
    render() {
        return (
            <div style={Styles.mainDivStyle}>
                <div style={Styles.statsBox}>
                    <p style={Styles.statsBoxDiv}>Wins </p>
                    <p style={{...Styles.statsBoxDiv, fontWeight: "bold"}}>{this.state.wins}</p>
                    <p style={Styles.statsBoxDiv}>Losses </p>
                    <p style={{...Styles.statsBoxDiv, fontWeight: "bold"}}>{this.state.losses}</p>
                    <p style={Styles.statsBoxDiv}>Average Score </p>
                    <p style={{...Styles.statsBoxDiv, fontWeight: "bold"}}>{this.state.wins == 0 ? 0 : Math.round((this.state.points/this.state.wins) * 100) / 100}</p>
                </div>
                
                <div>
                    {this.gridbox(this.state.wordgrid,this.state.stylegrid)}
                </div>
                <div style={Styles.bankStyle}>
                {Object.entries(this.state.splits).map((key_val, index0) => (
                    <div key={index0} style={Styles.subBankStyle}>
                    {Object.entries(key_val[1]).map((link, index) =>
                        (this.keyboard(link[1],this.state.alphabet[link[1]],index)))}
                    </div>
                ))}
                </div>
            </div>
        )
    }
}

export default Game;
import * as Styles from "../assets/Styles";
import React, { useState, useEffect } from "react";
import Retry from '../images/retry.png';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.detectKeypress = this.detectKeypress.bind(this);
        this.keyStroke = this.keyStroke.bind(this);
        this.selectLetter = this.selectLetter.bind(this);
        this.handleRetry = this.handleRetry.bind(this);
        if (false){
            this.state = this.originalState()
            localStorage.setItem('state', JSON.stringify(this.state))
        } else {
            this.state = JSON.parse(localStorage.getItem('state')) || this.originalState()
            if (this.state.losses == null){
                this.state = this.originalState()
            } else if (this.state.retryHidden == null){
                this.state = {...this.state, retryHidden:"hidden"}
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
            retryHidden: "hidden"
        })
    }
    
    writeState(){
        localStorage.setItem('state', JSON.stringify(this.state))
        // localStorage.setItem('state', JSON.stringify())
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
                points: this.state.points+this.state.yLoc+1,
                retryHidden: "visible"
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
                retryHidden: "visible"
            },() => this.writeState())
        }
    }

    statText(){
        console.log(this.state.status)

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

    check_if_word_exists(word) {
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+word.join("").toLowerCase()
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

    handleRetry(){
        this.setState({
            ...this.originalState(), wins:this.state.wins, losses:this.state.losses, points:this.state.points
        },() => this.writeState())
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
                {Object.entries(this.state.splits).map((key_val, index0) => (
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
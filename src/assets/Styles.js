export const gameSettings = {
    bkgnd: "#2c3e50",
    misplace: "#f1c40f",
    error: "#95a5a6",
    correct: "#2ecc71",
    bigBox: 50,
    smallBoxWidth: 30,
    smallBoxHeight: 40,
    retrySize: 20,
    keyboardSpacing: "3px",
    gridSpacing: "5px"
}

export const mainMainDiv = {
    width:"100%",
    height:"100%",
}

export const mainDivStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
    alignItems: "center",
    width:"100%",
    height:"100%",
    position: "absolute",
}

export const statsBox = {
    display: "flex",
    justifyContent: "center",
    flexDirection:"row",
    alignItems: "center",
    width: "100%",
    marginTop: 20
}

export const statsBoxDiv = {
    display: "flex",
    justifyContent: "center",
    flexDirection:"row",
    alignItems: "center",
    margin: 3,
    userSelect: "none",
}

export const retryDivStyle = {
    width: "100%",
    height: gameSettings.retrySize,
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
    alignItems: "center",
    marginTop: -gameSettings.retrySize,
}

export const retryStyle = {
    width: gameSettings.retrySize,
    height: gameSettings.retrySize,
}

////////////////////

export const boxStyle = {
    width:gameSettings.bigBox,
    height:gameSettings.bigBox,
    margin:gameSettings.gridSpacing,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameSettings.bkgnd,
    textAlign:"center",
} 

export const keyStyle = {
    width:gameSettings.smallBoxWidth,
    height:gameSettings.smallBoxHeight,
    margin: gameSettings.keyboardSpacing,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameSettings.bkgnd,
    userSelect: "none",
    display: "flex",
}
export const specialKeyStyle = {
    width:gameSettings.smallBoxWidth * 1.5,
    height:gameSettings.smallBoxHeight,
    margin: gameSettings.keyboardSpacing,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameSettings.bkgnd,
    userSelect: "none",
    display: "flex",
}

////////////////////

export const wordStyle = {
    display: "flex",
    flexDirection: "row",
    height:gameSettings.bigBox,
    justifyContent: "center",
    margin: gameSettings.gridSpacing,
}

export const subBankStyle = {
    display: "flex",
    flexDirection: "row",
    height:gameSettings.smallBoxHeight,
    justifyContent:"center",
    margin: gameSettings.keyboardSpacing,
}

////////////////////////

export const gridStyle = {
    display: "flex",
    flexDirection: "column",
}

export const bankStyle = {
    display: "flex",
    flexDirection:"column",
    marginTop:"40px",
}

////////////////////

export const fontStyle = {
    textAlign: "center",
    fontSize: "x-large",
    fontWeight: "bold",
    userSelect: "none",
    top: "50%",
    transform: "translate(0, -50%)",
    color: gameSettings.bkgnd,
}
export const keyFontStyle = {
    textAlign: "center",
    fontSize: "medium",
    userSelect: "none",
    top: "60%",
    color: gameSettings.bkgnd,
}

export const specialKeyFontStyle = {
    width: "60%",
    margin: "auto",
    display: "block",
}
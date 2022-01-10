export const gameSettings = {
    bkgnd: "#2c3e50",
    misplace: "#f1c40f",
    error: "#95a5a6",
    correct: "#2ecc71",
    bigBox: 50,
    smallBoxWidth: 25,
    smallBoxHeight: 35
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
    width: "100%"
}

export const statsBoxDiv = {
    display: "flex",
    justifyContent: "center",
    flexDirection:"row",
    alignItems: "center",
    margin: 3,
}

////////////////////

export const boxStyle = {
    width:gameSettings.bigBox,
    height:gameSettings.bigBox,
    margin:"5px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameSettings.bkgnd,
    textAlign:"center",
} 

export const keyStyle = {
    width:gameSettings.smallBoxWidth,
    height:gameSettings.smallBoxHeight,
    margin: "3px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameSettings.bkgnd,
    userSelect: "none",
}

////////////////////

export const wordStyle = {
    display: "flex",
    flexDirection: "row",
    height:gameSettings.bigBox,
    justifyContent: "center",
    margin: "5px",
}

export const subBankStyle = {
    display: "flex",
    flexDirection: "row",
    height:gameSettings.smallBoxHeight,
    justifyContent:"center",
    margin: "3px",
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
    top: "50%",
    transform: "translate(0, -50%)",
    color: gameSettings.bkgnd,
}
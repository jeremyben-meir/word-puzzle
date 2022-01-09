export const gameColors = {
    bkgnd: "#2c3e50",
    misplace: "#f1c40f",
    error: "#95a5a6",
    correct: "#2ecc71"
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

////////////////////

export const boxStyle = {
    width:50,
    height:50,
    margin:0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameColors.bkgnd,
    textAlign:"center",
} 

export const keyStyle = {
    width:40,
    height:40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameColors.bkgnd,
    userSelect: "none",
    margin: "5px"
}

////////////////////

export const wordStyle = {
    display: "flex",
    flexDirection: "row",
    height:50,
    justifyContent: "space-between"
}

export const subBankStyle = {
    display: "flex",
    flexDirection: "row",
    height:50,
    justifyContent:"center"
}

////////////////////////

export const gridStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width:"300px",
    height:"375px",
    // backgroundColor:"grey"
}

export const bankStyle = {
    display: "flex",
    flexDirection:"column",
    width:"600px",
    height:"150px",
    marginTop:"75px",
    // backgroundColor:"blue",
}

////////////////////

export const fontStyle = {
    textAlign: "center",
    fontSize: "x-large",
    fontWeight: "bold",
    userSelect: "none",
    top: "50%",
    transform: "translate(0, -50%)",
    color: gameColors.bkgnd,
}
export const keyFontStyle = {
    textAlign: "center",
    fontSize: "large",
    userSelect: "none",
    top: "50%",
    transform: "translate(0, -50%)",
    color: gameColors.bkgnd,
}
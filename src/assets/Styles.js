export const gameSettings = {
    bkgnd: "#2c3e50",
    misplace: "#f1c40f",
    error: "#95a5a6",
    correct: "#2ecc71",
    keyboardSpacing: "3px",
    gridSpacing: "5px"
}

export const mainDivStyle = {
    height: "100%",
    width: "100%",
    position:"absolute",

    display: "flex",
    justifyContent: "space-evenly",
    alignItems:"stretch",
    flexDirection: "column",
}

////////////////////

export const retryDivStyle = {
    flex: 9,
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row",
}

export const statsDivStyle = {
    flex: 1,
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row",
}

export const gridDivStyle = {
    flex: 70,
    width: "100%",
    
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    flexDirection: "column",
}

export const bankDivStyle = {
    flex: 30,
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"column",
}

////////////////

export const gridRowStyle = {
    flex:1,
    width:"100%",
    
    display: "flex",
    flexDirection: "row",
    justifyContent:"center",
}

export const bankRowStyle = {
    flex:1,
    width:"100%",

    display: "flex",
    flexDirection: "row",
    justifyContent:"center",
}

////////////////

export const retryStyle = {
    height: 30,
    userSelect: "none",
}

export const statsStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection:"row",
    alignItems: "center",
    margin: "10px 2px",
    userSelect: "none",
}

export const boxStyle = {
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid " + gameSettings.bkgnd,
    position: "relative",
    width:"9vh"
} 

export const keyStyle = {
    width:30,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    border: "2px solid "+gameSettings.bkgnd,
    position: "relative",
}

////////////////////

export const fontStyleDiv = {
    position: "absolute",
    verticalAlign: "center",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    width:"100%",
    height:"100%",
}

////////////////////

export const fontStyle = {
    fontSize: "x-large",
    fontWeight: "bold",
    userSelect: "none",
    color: gameSettings.bkgnd,
}
export const keyFontStyle = {
    fontSize: "medium",
    fontWeight: "bold",
    userSelect: "none",
    color: gameSettings.bkgnd,
}

export const specialKeyFontStyle = {
    height: "60%",
    margin: "auto",
    display: "block",
}
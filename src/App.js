import './App.css';
import Game from "./views/Game2"
import * as Styles from "./assets/Styles";

function App() {
  const wordlen = 5;
  const numtries = 6; 

  return (
    <div style={Styles.mainMainDiv}>
        <Game wordlen={wordlen} numtries={numtries}/>
    </div>
  );
}

export default App;

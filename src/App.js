import logo from './logo.svg';
import './App.css';
import Game from "./views/Game2"

function App() {
  var randomWords = require('random-words');
  const wordlen = 5;
  const numtries = 6; 

  function get_word(){
      var word = ""
      while (word.length < wordlen){
          word = (randomWords({exactly: 1, maxLength: wordlen}))[0]
      }
      return word.toUpperCase()
  }

  return (
    <div className="App">
      <header className="App-header">
        <Game wordlen={wordlen} numtries={numtries} word={get_word(5)}/>
      </header>
    </div>
  );
}

export default App;

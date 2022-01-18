import './App.css';
import Game from "./views/Game2"
import * as Styles from "./assets/Styles";
import ReactGa from 'react-ga';
import React, {useEffect} from 'react';

function App() {
  const wordlen = 5;
  const numtries = 6; 

  useEffect(() => {
    ReactGa.initialize('UA-217441496-1')
    ReactGa.pageview("/word-puzzle")
  }, [])

  return (
    <Game wordlen={wordlen} numtries={numtries} ReactGa={ReactGa}/>
  );
}

export default App;

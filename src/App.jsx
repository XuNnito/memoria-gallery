import React from 'react';
import Encabezado from './components/Encabezado';
import Feed from './components/Feed';
import Calendario from './components/Calendario';
import './App.css';

function App() {
  return (
    <div className="App">
      <Encabezado />
      <Feed />
      <Calendario />
    </div>
  );
}

export default App;

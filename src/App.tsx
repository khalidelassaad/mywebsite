import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderBar from './header/headerBar';

const bodystring: string = 'Welcome to KE Land! This is the best place.';
const navButtons: [string, () => any][] = [
  [
    'Home',
    () => {
      // navigate to Home page
    },
  ],
  [
    'Codefolio',
    () => {
      // navigate to Codefolio page
    },
  ],
  [
    'Athletics',
    () => {
      // navigate to Athletics page
    },
  ],
  [
    'Contact',
    () => {
      // navigate to Contact page
    },
  ],
];

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src="../kelogo.png" className="App-logo" alt="logo" />
        </header>
        <HeaderBar navButtons={navButtons} />
      </div>
      <Routes>
        <Route
          path="/"
          element={<div className="App-body">{bodystring}</div>}
        />
      </Routes>
    </>
  );
}

export default App;

import * as React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HeaderBar from './header/headerBar';

const bodystring: string = 'Welcome to KE Land! This is the best place.';
const error404string: string = 'Uh oh! Nothing to see here, move along...';

const navigate = useNavigate();

const navButtons: [string, () => any][] = [
  [
    'Home',
    () => {
      navigate('/');
    },
  ],
  [
    'Codefolio',
    () => {
      navigate('/codefolio');
      console.log('code');
    },
  ],
  [
    'Athletics',
    () => {
      navigate('/athletics');
    },
  ],
  [
    'Contact',
    () => {
      navigate('/contact');
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
        <Route
          path="/codefolio"
          element={<div className="App-body">{'CODE!!! :>'}</div>}
        />
        <Route
          path="/*"
          element={
            <div className="App-body">
              {error404string}
              <Link to="/">Back to home page</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;

import * as React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderBar from './header/HeaderBar';
import Fractal from './pages/Fractal';

const bodystring: string = 'Welcome to KE Land! This is the best place.';
const error404string: string = 'Uh oh! Nothing to see here, move along...';

const fractalCursorStepDistance = 20; // Set state only after cursor moves this many pixels
const fractalMaxIterations = 90; // Default author provides: 100
const fractalResolution = 200;
const fractalColorStep = 4;

const navButtons: [string, string][] = [
  ['HOME', '/'],
  ['CODEFOLIO', '/codefolio'],
  ['ATHLETICS', '/athletics'],
  ['CONTACT', '/contact'],
  ['FRACTAL', '/fractal'],
];

function App() {
  return (
    <>
      <div className="App-background">
        <div className="App">
          <header className="App-header">
            <img src="../kelogo.png" className="App-logo" alt="logo" />
          </header>
          <HeaderBar navButtons={navButtons} />
        </div>
        <div className="App-body">
          <Routes>
            <Route path="/" element={bodystring} />
            <Route path="/codefolio" element={'CODE!!! :>'} />
            <Route path="/athletics" element={'SPORTS!!! :>'} />
            <Route path="/contact" element={"Don't talk to me!!! :>"} />
            <Route
              path="/fractal"
              element={
                <Fractal
                  colorStep={fractalColorStep}
                  resolution={fractalResolution}
                  cursorStepDistance={fractalCursorStepDistance}
                  maxIterations={fractalMaxIterations}
                />
              }
            />
            <Route
              path="/404"
              element={
                <>
                  <h1>404</h1>
                  {error404string}
                  <Link to="/">Back to home page</Link>
                </>
              }
            />
            <Route path="/*" element={<Navigate replace to="/404" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

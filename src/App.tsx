import * as React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderBar from './header/HeaderBar';
import { Fractal, FractalProps } from './pages/Fractal';

const bodystring: string = 'Welcome to KE Land! This is the best place.';
const error404string: string = 'Uh oh! Nothing to see here, move along...';

const fractalProps: FractalProps = {
  colorStep: 3,
  chunksPerAxis: 60,
  resolution: null,
  maxIterations: 100,
  viewportCoords: {
    startX: -0.9,
    startY: 0.3,
    endX: -0.8,
    endY: 0.2,
  },
  transformSpeedModifier: 0.24,
  classSuffix: 'main',
  disabled: true,
};

const backgroundFractalProps: FractalProps = {
  colorStep: 3,
  chunksPerAxis: 30,
  resolution: null,
  resolutionFraction: 0.5,
  maxIterations: 100,
  viewportCoords: {
    startX: -1.5,
    startY: -1.5,
    endX: 1.5,
    endY: 1.5,
  },
  transformSpeedModifier: 1,
  classSuffix: 'background',
};

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
      <Fractal {...backgroundFractalProps} />
      <div className="App-sleeve">
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
            <Route path="/fractal" element={<Fractal {...fractalProps} />} />
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

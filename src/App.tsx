import * as React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HeaderBar from './header/HeaderBar';
import { Fractal, FractalProps } from './pages/Fractal';

const bodystring: string = 'Welcome to KE Land! This is the best place.';
const error404string: string = 'Uh oh! Nothing to see here, move along...';

const fractalProps: FractalProps = {
  colorStep: 3,
  chunksPerAxis: 60,
  resolutionFraction: 0.5,
  maxIterations: 100,
  viewportCoords: {
    startX: -1.5,
    startY: -1,
    endX: 1.5,
    endY: 1,
  },
  transformSpeedModifier: 1.4,
  classSuffix: 'main',
  colorMax: 200,
};

const backgroundFractalProps: FractalProps = {
  colorStep: 4,
  chunksPerAxis: 70,
  resolutionFraction: 0.25,
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
  const location = useLocation();

  return (
    <div className="backdrop">
      <Fractal
        {...backgroundFractalProps}
        disabled={location.pathname.indexOf('/fractal') != -1}
      />
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
    </div>
  );
}

export default App;

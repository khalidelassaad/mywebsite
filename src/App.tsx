import * as React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { BlogPage } from './components/BlogPage';
import HeaderBar from './header/HeaderBar';
import { HeaderButtonProps } from './header/HeaderButton';
import { Fractal, FractalProps } from './pages/Fractal';
import Code1Markdown from './pages/markdown/Code-1.md';
import Code2Markdown from './pages/markdown/Code-2.md';
import ContactMarkdown from './pages/markdown/Contact.md';
import HomeMarkdown from './pages/markdown/Home.md';

const bodystring: string = 'Welcome to KE Land! This is the best place.';
const error404string: string = 'Uh oh! Nothing to see here, move along...';

const codeFolioHoverButtonPropsList: HeaderButtonProps[] = [
  { label: 'CODE 1', linkTo: '/codefolio/code-1' },
  { label: 'CODE 2', linkTo: '/codefolio/code-2' },
];

const navButtons: [string, string, HeaderButtonProps[]?][] = [
  ['HOME', '/'],
  ['CODEFOLIO', '/codefolio', codeFolioHoverButtonPropsList],
  ['ATHLETICS', '/athletics'],
  ['CONTACT', '/contact'],
  ['FRACTAL', '/fractal'],
];

function App() {
  const location = useLocation();

  const [cursorPosition, setCursorPosition] = React.useState([0, 0]);

  const fractalProps: FractalProps = {
    colorStep: 3,
    chunksPerAxis: 80,
    resolutionFraction: 0.5,
    maxIterations: 100,
    viewportCoords: {
      startX: -1.5,
      startY: -1,
      endX: 1.5,
      endY: 1,
    },
    transformSpeedModifier: 1,
    classSuffix: 'main',
    colorMax: 200,
    captionText:
      'This Julia set computation uses dynamic programming to save previous renders.',
    cursorCoords: cursorPosition,
  };

  const backgroundFractalProps: FractalProps = {
    colorStep: 4,
    chunksPerAxis: 50,
    resolution: 50,
    maxIterations: 100,
    viewportCoords: {
      startX: -1.2,
      startY: 0.2,
      endX: -1.0,
      endY: 0.4,
    },
    transformSpeedModifier: 0.5,
    classSuffix: 'background',
    cursorCoords: cursorPosition,
  };

  return (
    <div
      className="backdrop"
      onMouseMove={(e) => setCursorPosition([e.clientX, e.clientY])}
    >
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
            <Route
              path="/"
              element={<BlogPage importedMarkdownObject={HomeMarkdown} />}
            />
            <Route path="/codefolio" element={'CODE!!! :>'} />
            <Route
              path="/codefolio/code-1"
              element={<BlogPage importedMarkdownObject={Code1Markdown} />}
            />
            <Route
              path="/codefolio/code-2"
              element={<BlogPage importedMarkdownObject={Code2Markdown} />}
            />
            <Route path="/athletics" element={'SPORTS!!! :>'} />
            <Route
              path="/contact"
              element={<BlogPage importedMarkdownObject={ContactMarkdown} />}
            />
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

import * as React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HeaderBar from './header/HeaderBar';
import { HeaderButtonProps } from './header/HeaderButton';
import { Fractal, FractalProps } from './pages/Fractal';
import AthleticsMarkdown from './pages/markdown/Athletics.md';
import CodefolioMarkdown from './pages/markdown/Codefolio.md';
import ContactMarkdown from './pages/markdown/Contact.md';
import HomeMarkdown from './pages/markdown/Home.md';
import { NavBarPage, WebsiteStructure } from './WebsiteStructure';

const error404string: string = 'Uh oh! Nothing to see here, move along...';

const codeFolioHoverButtonPropsList: HeaderButtonProps[] = [
  { label: 'CODE 1', linkTo: '/codefolio/code-1' },
  { label: 'CODE 2', linkTo: '/codefolio/code-2' },
];

const navButtons1: [string, string, HeaderButtonProps[]?][] = [
  ['HOME', '/'],
  ['CODEFOLIO', '/codefolio', codeFolioHoverButtonPropsList],
  ['ATHLETICS', '/athletics'],
  ['CONTACT', '/contact'],
  ['FRACTAL', '/fractal'],
];

function _generateRouteFromNavBarPageObject(
  navBarPageObject: NavBarPage,
): JSX.Element {
  return <></>;
}

function _generateRoutesFromWebsiteStructureObject(
  websiteStructureObject: WebsiteStructure,
): JSX.Element {
  return <></>;
}

function _generateNavButtonsFromWebsiteStructureObject(
  websiteStructureObject,
): [string, string, HeaderButtonProps[]?][] {
  return [];
}

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

  const myWebsiteStructure: WebsiteStructure = {
    navBarPages: [
      {
        navBarButtonLabel: 'HOME',
        pageURL: '/',
        importedMarkdownObject: HomeMarkdown,
      },
      {
        navBarButtonLabel: 'CODEFOLIO',
        pageURL: '/codefolio',
        importedMarkdownObject: CodefolioMarkdown,
        childPages: [
          {
            navBarButtonLabel: 'CODE 1',
            pageURL: '/codefolio/code_1',
            importedMarkdownObject: HomeMarkdown,
          },
          {
            navBarButtonLabel: 'CODE 2',
            pageURL: '/codefolio/code_2',
            importedMarkdownObject: HomeMarkdown,
          },
        ],
      },
      {
        navBarButtonLabel: 'ATHLETICS',
        pageURL: '/athletics',
        importedMarkdownObject: AthleticsMarkdown,
      },
      {
        navBarButtonLabel: 'CONTACT',
        pageURL: '/contact',
        importedMarkdownObject: ContactMarkdown,
      },
      {
        navBarButtonLabel: 'FRACTAL',
        pageURL: '/fractal',
        element: <Fractal {...fractalProps} />,
      },
    ],
  };

  const navButtons =
    _generateNavButtonsFromWebsiteStructureObject(myWebsiteStructure);

  const generatedRoutes =
    _generateRoutesFromWebsiteStructureObject(myWebsiteStructure);

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
            {generatedRoutes}
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

import * as React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { BlogPage } from './components/BlogPage';
import HeaderBar from './header/HeaderBar';
import { HeaderButtonProps } from './header/HeaderButton';
import { Fractal, FractalProps } from './pages/Fractal';
import AboutMeMarkdown from './pages/markdown/AboutMe.md';
import CodefolioDNAMarkdown from './pages/markdown/Codefolio-DNA.md';
import CodefolioGrassMarkdown from './pages/markdown/Codefolio-Grass-In-The-Wind.md';
import CodefolioAnimationsMarkdown from './pages/markdown/Codefolio-Miscellaneous-Animations.md';
import CodefolioEcologyMarkdown from './pages/markdown/Codefolio-Simulated-Ecology.md';
import ThisWebsiteMarkdown from './pages/markdown/Codefolio-ThisWebsite.md';
import CodefolioUlamMarkdown from './pages/markdown/Codefolio-Ulam-Spiral.md';
import CodefolioMarkdown from './pages/markdown/Codefolio.md';
import ContactMarkdown from './pages/markdown/Contact.md';
import HomeMarkdown from './pages/markdown/Home.md';
import RowingMarkdown from './pages/markdown/Rowing.md';
import {
  NavBarPage,
  NavBarPageLeaf,
  WebsiteStructure,
} from './WebsiteStructure';

const error404string: string = 'Uh oh! Nothing to see here, move along...';

// TODO: Fix trailing / breaking logo load and redirects
// TODO: Fix linking from one markdown to another breaking

function _generateRouteFromNavBarPageObject(
  navBarPageObject: NavBarPage,
): JSX.Element[] {
  let returnElements: JSX.Element[] = [];

  if ('importedMarkdownObject' in navBarPageObject) {
    returnElements.push(
      <Route
        key={navBarPageObject.navBarButtonLabel}
        path={navBarPageObject.pageURL}
        element={
          <BlogPage
            importedMarkdownObject={navBarPageObject.importedMarkdownObject}
          />
        }
      />,
    );
  } else if ('element' in navBarPageObject) {
    returnElements.push(
      <Route
        key={navBarPageObject.navBarButtonLabel}
        path={navBarPageObject.pageURL}
        element={navBarPageObject.element}
      />,
    );
  } else {
    throw 'Expected either importedMarkdownObject or element in websiteStructure';
  }

  if ('childPages' in navBarPageObject) {
    navBarPageObject.childPages.map((childPage: NavBarPageLeaf) => {
      returnElements = returnElements.concat(
        _generateRouteFromNavBarPageObject(childPage),
      );
    });
  }

  return returnElements;
}

function _generateRoutesFromWebsiteStructureObject(
  websiteStructureObject: WebsiteStructure,
): JSX.Element {
  let returnElements: JSX.Element[] = [];

  websiteStructureObject.navBarPages.map((navBarPage) => {
    let navBarRoutesList: JSX.Element[] =
      _generateRouteFromNavBarPageObject(navBarPage);
    returnElements = returnElements.concat(navBarRoutesList);
  });

  return <>{returnElements}</>;
}

function _generateNavButtonsFromWebsiteStructureObject(
  websiteStructureObject: WebsiteStructure,
): [string, string, HeaderButtonProps[]?][] {
  let returnNavButtons: [string, string, HeaderButtonProps[]?][] = [];

  websiteStructureObject.navBarPages.map((navBarPage) => {
    if ('childPages' in navBarPage) {
      let hoverButtonPropsList: HeaderButtonProps[] = [];

      navBarPage.childPages.map((childPage) => {
        hoverButtonPropsList.push({
          label: childPage.navBarButtonLabel,
          linkTo: childPage.pageURL,
        });
      });

      returnNavButtons.push([
        navBarPage.navBarButtonLabel,
        navBarPage.pageURL,
        hoverButtonPropsList,
      ]);
    } else {
      returnNavButtons.push([navBarPage.navBarButtonLabel, navBarPage.pageURL]);
    }
  });

  return returnNavButtons;
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
            navBarButtonLabel: 'ULAM SPIRAL',
            pageURL: '/codefolio/ulam_spiral',
            importedMarkdownObject: CodefolioUlamMarkdown,
          },
          {
            navBarButtonLabel: 'SIMULATED ECOLOGY',
            pageURL: '/codefolio/simulated_ecology',
            importedMarkdownObject: CodefolioEcologyMarkdown,
          },
          {
            navBarButtonLabel: 'DNA',
            pageURL: '/codefolio/dna',
            importedMarkdownObject: CodefolioDNAMarkdown,
          },
          {
            navBarButtonLabel: 'MISC. ANIMATIONS',
            pageURL: '/codefolio/miscellaneous_animations',
            importedMarkdownObject: CodefolioAnimationsMarkdown,
          },
          {
            navBarButtonLabel: 'GRASS IN THE WIND',
            pageURL: '/codefolio/grass_in_the_wind',
            importedMarkdownObject: CodefolioGrassMarkdown,
          },
          {
            navBarButtonLabel: 'THIS WEBSITE',
            pageURL: '/codefolio/this_website',
            importedMarkdownObject: ThisWebsiteMarkdown,
          },
        ],
      },
      {
        navBarButtonLabel: 'ABOUT ME',
        pageURL: '/aboutme',
        importedMarkdownObject: AboutMeMarkdown,
        childPages: [
          {
            navBarButtonLabel: 'ROWING',
            pageURL: '/aboutme/rowing',
            importedMarkdownObject: RowingMarkdown,
          },
          {
            navBarButtonLabel: 'CONTACT',
            pageURL: '/aboutme/contact',
            importedMarkdownObject: ContactMarkdown,
          },
        ],
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
    <React.StrictMode>
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
                key="404"
                element={
                  <>
                    <h1>404</h1>
                    {error404string}
                    <Link to="/">Back to home page</Link>
                  </>
                }
              />
              <Route
                path="/*"
                key="catch-all"
                element={<Navigate replace to="/404" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default App;

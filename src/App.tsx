import * as React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderBar from './header/headerBar';

const bodystring: string = 'Welcome to KE Land! This is the best place.';
const error404string: string = 'Uh oh! Nothing to see here, move along...';

const navButtons: [string, string][] = [
  ['Home', '/'],
  ['Codefolio', '/codefolio'],
  ['Athletics', '/athletics'],
  ['Contact', '/contact'],
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
      <div className="App-body">
        <Routes>
          <Route path="/" element={bodystring} />
          <Route path="/codefolio" element={'CODE!!! :>'} />
          <Route path="/athletics" element={'SPORTS!!! :>'} />
          <Route path="/contact" element={"Don't talk to me!!! :>"} />
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
    </>
  );
}

export default App;

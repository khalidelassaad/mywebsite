import * as React from 'react';
import HeaderButton from './header/headerButton';
import './App.css';

const bodystring = 'Welcome to KE Land! This is the best place.';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="../kelogo.png" className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        {bodystring}
      </body>
      <HeaderButton label="hi" />
    </div>
  );
}

export default App;

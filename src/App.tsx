import * as React from 'react';
import './App.css';
import HeaderBar from './header/headerBar';

const bodystring = 'Welcome to KE Land! This is the best place.';
const headerButtonLabels = ['Hello', 'Button 2'];
const headerButtonOnClicks = [
  () => {
    console.log('dibbidy');
  },
  () => {
    console.log('dibbidy doo');
  },
];

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src="../kelogo.png" className="App-logo" alt="logo" />
        </header>
        <HeaderBar
          labels={headerButtonLabels}
          onClicks={headerButtonOnClicks}
        />
      </div>
      <div className="App-body">{bodystring}</div>
    </>
  );
}

export default App;

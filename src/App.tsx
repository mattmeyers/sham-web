import React from 'react';
import './App.css';
import Editor from './Components/Editor';

class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <h1>Sham</h1>
        <h2>Give a model, get some data</h2>
        <Editor />
      </div>
    );
  }
}


export default App;

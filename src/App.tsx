import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './view/index'
import './App.css';


function App() {
  return (
    <Switch>
      <Route path='/' component={Index}/>
    </Switch>
  );
}

export default App;

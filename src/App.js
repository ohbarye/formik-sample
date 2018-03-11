import React from 'react';
import './App.css';
import FirstForm from './FirstForm'
import SecondForm from './SecondForm'
import ThirdForm from './ThirdForm'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () =>
  <BrowserRouter>
    <div>
      <Route exact path='/new' component={FirstForm} />
      <Route exact path='/new/second' component={SecondForm} />
      <Route exact path='/new/third' component={ThirdForm} />
    </div>
  </BrowserRouter>

export default App;

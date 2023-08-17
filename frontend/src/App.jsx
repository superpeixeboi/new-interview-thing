import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/content/:id"><ContentViewPage /></Route>
          <Route path="/content/new"><ContentFormPage /></Route>
          <Route path="/content/edit/:id"><ContentFormPage /></Route>
          <Route path="/content"><ContentListPage /></Route>
        </Switch>
      </Router>
      <button className="btn">Hello daisyUI</button>
    </div>
  );
}

export default App

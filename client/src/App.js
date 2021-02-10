import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './screens/Register';
import './App.css'
import Login from './screens/Login';
import Home from './screens/Home';
import AddTask from './screens/AddTask';
const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Register} />
        <Route path='/login' exact component={Login} />
        <Route path='/Home' exact component={Home} />
        <Route path='/Add' exact component={AddTask} />
      </Router>
    </div>
  )
}

export default App

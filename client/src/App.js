import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = boolean => {

    setIsAuthenticated(boolean)

  }
  return (

<Router>
  
    <Routes>
    <Route exact path='/' element={!isAuthenticated ? (<Home setAuth={setAuth}/> ): (
        <Navigate to='/home'/>
      ) } ></Route>
      <Route exact path='/about' element={!isAuthenticated ? (<About setAuth={setAuth}/> ): (
        <Navigate to='/about'/>
      ) } ></Route>
      <Route exact path='/contact' element={!isAuthenticated ? (<Contact setAuth={setAuth}/> ): (
        <Navigate to='/contact'/>
      ) } ></Route>
      <Route exact path='/login' element={!isAuthenticated ? (<Login setAuth={setAuth}/> ): (
        <Navigate to='/dashboard'/>
      ) } ></Route>
      <Route exact path='/register' element={!isAuthenticated ? (<Register setAuth={setAuth}/> ): (
        <Navigate to='/login'/>
      ) }></Route>
      <Route exact path='/dashboard' element={isAuthenticated ? (<Dashboard setAuth={setAuth}/> ): (
        <Navigate to='/'/> 
      ) }></Route>
    </Routes>

</Router>

  );
}

export default App;

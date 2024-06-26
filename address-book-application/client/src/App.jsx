import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home'
import Vault from './Components/Vault';

function App() {

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element = {<LoginForm />} />
            <Route path="/login" element = {<LoginForm />} />
            <Route path="/register" element = {<RegisterForm />} />
            <Route path="/home" element = {<Home />} />
            <Route path="/addressVault" element = {<Vault />}/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App

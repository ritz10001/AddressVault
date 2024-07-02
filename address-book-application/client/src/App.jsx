import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home'
import Vault from './Components/Vault';
import { UserProvider } from './UserContext';
import ProtectedRoute from './ProtectedRoute'

function App() {

  const [userName, setUserName] = useState("");
  console.log(userName);

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element = {<Home />} />
            <Route path="/login" element = {<LoginForm userName={userName} setUserName={setUserName}/>} />
            <Route path="/register" element = {<RegisterForm />} />
            <Route path="/home" element = {<Home />} />
            <Route path="/addressVault" element = {
              <ProtectedRoute>
                <Vault userName={userName}/>
              </ProtectedRoute>
            }/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App

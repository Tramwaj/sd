import React from 'react';
import logo from './logo.svg';
//import './App.css';
import { HomePage } from './Pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from './Pages/GamePage';
import Header from './Components/Layout/Header';

function App() {
  return (
    <div>
      <Header/>
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="Home" element={<HomePage />} />
      <Route path="Game/:id" element={<GamePage />} />
    </Routes>
    </div>
  );
}

export default App;

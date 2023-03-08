import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

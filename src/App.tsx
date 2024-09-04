import React, { useState } from 'react';
import './App.scss';
import { Header } from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  const [isSettings, setIsSettings] = useState(false);

  return (
    <div className="app">
      <Header isSettings={isSettings} setIsSettings={setIsSettings} />
      <Outlet />
      <Footer />
    </div>
  );
};

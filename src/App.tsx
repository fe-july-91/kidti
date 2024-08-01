import React, { useState } from 'react';
import './App.scss';
import { Header } from './Components/Header/Header';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  const [isSettings, setIsSettings] = useState(false);

  return (
    <div className="app">
      <Header isSettings={isSettings} setIsSettings={setIsSettings} />
      <Outlet />
      <footer></footer>
    </div>
  );
};

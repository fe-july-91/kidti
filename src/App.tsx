import './App.scss';
import { Header } from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import GenerativeBG from './Components/GenerativeBg/GenerativeBG';
import { useEffect, useState } from 'react';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  if (isLoading) {
    return <GenerativeBG />;
  }

  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <GenerativeBG />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

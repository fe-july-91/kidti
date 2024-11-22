import './App.scss';
import { Header } from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';
import GenerativeBG from './Components/GenerativeBg/GenerativeBG';

export const App: React.FC = () => {

  return (
    <div className="app">
      <Header />
      <GenerativeBG />
      <div className="app__container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

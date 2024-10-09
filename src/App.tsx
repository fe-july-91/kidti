import './App.scss';
import { Header } from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

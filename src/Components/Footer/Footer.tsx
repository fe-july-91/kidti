import { Link } from 'react-router-dom';
import {logo } from "../../Utils/kit";
import './Footer.scss';


export const Footer: React.FC = () => {

  return (
    <div className="footer">
      <Link to="/" className="footer__logo">
        <img src={logo} className="footer__logo-img" alt="logo"/>
      </Link>

      <div className="footer__navContainer">
      </div>
    </div>
  );
};
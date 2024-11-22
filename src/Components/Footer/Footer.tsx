import { Link } from 'react-router-dom';
import {logo } from "../../Utils/kit";
import './Footer.scss';


export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__navbar">
        <Link
          to="https://github.com/msdreams"
          className="footer__navbar--link"
          target="_blank"
        >
          Github
        </Link>
        <Link
          to="https://www.linkedin.com/in/mariashmakova"
          className="footer__navbar--link"
          target="_blank"
        >
          Contacts
        </Link>
        <Link
          to="https://github.com/msdreams"
          className="footer__navbar--link"
          target="_blank"
        >
          Rights
        </Link>
      </div>
    </footer>
  );
};
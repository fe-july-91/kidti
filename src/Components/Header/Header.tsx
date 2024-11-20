import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { logo } from "../../Utils/kit";
import './Header.scss';
import { Menu } from "../Menu/Menu";
import { AuthContext } from "../AuthContext/AuthContext";


export const Header: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const { authorized, logOut} = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} className="header__logo-img" alt="logo"/>
      </Link>

      <div className="navContainer">
        <div className="navContainer__actions">
          {!authorized ? (
            <>
          <Link
            to="login"
              className="navContainer__account"
            >
              <p className="navContainer__actions--text">log In</p>
              </Link>
              <span> or </span>
            <Link
              to="signup"
              className="navContainer__account"
            >
              <p className="navContainer__actions--text">Sign Up</p>
           </Link>
            </>

          ) : (
            <Link 
              to="login" 
                className="navContainer__account"
                onClick={() => logOut()}
            >
            <div className="navContainer__actions--text"> log out </div>
          </Link>
          )}
        </div>
        {/* <div className="navContainer__settings">
          <button
            type="button"
            className="navContainer-button"
            onClick={toggleSettings}
          >
            <img src={settings} className="navContainer-button-img" alt="settings"/>
          </button>
        </div> */}
      </div>

      <div className="BurgerMenu">
        <button
          type="button"
          className="BurgerMenu__button"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <div className="icons icons--close-wight"></div>
          ) : (
            <div className="icons icons--menu"></div>
          )}
        </button>
      </div>
      {isMenuOpen && <Menu toggleMenu={ toggleMenu } />}
    </header>
  );
};
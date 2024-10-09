import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { logo } from "../../Utils/kit";
import './Header.scss';
import { Menu } from "../Menu/Menu";


export const Header: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const [isLogin, setIsLogIn] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} className="header__logo-img" alt="logo"/>
      </Link>

      <div className="navContainer">
        <div className="navContainer__actions">
          {!isLogin ? (
            <>
          <Link
            to="login"
              className="navContainer__account"
              onClick={() => setIsLogIn(true)}
            >
              <p className="navContainer__actions--text">Увійти</p>
              </Link>
              <span>або</span>
            <Link
            to="signup"
              className="navContainer__account"
              onClick={() => setIsLogIn(true)}
            >
              <p className="navContainer__actions--text">Зареєструватися</p>
           </Link>
            </>

          ) : (
            <Link to="account" className="navContainer__account">
            <div className="navContainer__account--hellow"> Вітаю, Марія!</div>
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
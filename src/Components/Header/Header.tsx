import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logo, settings } from "../../Utils/kit";
import "./Header.scss";
import { Menu } from "../Menu/Menu";
import { AuthContext } from "../../Context/AuthContext";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const { authorized } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);

  return (
    <header className="header">
      {authorized ? (
        <Link to="account" className="header__logo">
          <img src={logo} className="header__logo-img" alt="logo" />
        </Link>
      ) : (
        <Link to="/" className="header__logo">
          <img src={logo} className="header__logo-img" alt="logo" />
        </Link>
      )}

      <div className="navContainer">
        <div className="navContainer__actions">
          {!authorized ? (
            <>
              <Link to="login" className="navContainer__account">
                <p className="navContainer__actions--text">Log In</p>
              </Link>
              <span> or </span>
              <Link to="signup" className="navContainer__account">
                <p className="navContainer__actions--text">Sign Up</p>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="navContainer__account"
                onClick={() => logOut()}
              >
                <p className="navContainer__actions--text">Log out</p>
              </Link>

              <Link to="account/settings" className="navContainer__account">
                <img
                  src={settings}
                  className="navContainer__img"
                  alt="settings"
                />
              </Link>
            </>
          )}
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
      </div>

      <Menu
        toggleMenu={toggleMenu}
        authorized={authorized}
        isMenuOpen={isMenuOpen}
      />
    </header>
  );
};

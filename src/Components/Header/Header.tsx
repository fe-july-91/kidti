import React from "react";
import { Link } from 'react-router-dom';
import { account, logo, settings } from "../../Utils/kit";
import './Header.scss';


interface Props {
  setIsSettings: React.Dispatch<React.SetStateAction<boolean>>;
  isSettings: boolean;
}

export const Header: React.FC<Props> = ({ setIsSettings, isSettings }) => {

  const toggleSettings = () => {
    setIsSettings((prev: boolean) => !prev);
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} className="header__logo-img" alt="logo"/>
      </Link>

      <div className="navContainer">
        <div className="navContainer__actions">
          <Link to="account">
            <p className="navContainer__actions-text">log in</p>
          </Link>
          <Link to="accaunt" className="navContainer__accaunt">
            <img src={account} className="navContainer-img" alt="account" />
          </Link>
        </div>
        <div className="navContainer__settings">
          <button
            type="button"
            className="navContainer-button"
            onClick={toggleSettings}
          >
            <img src={settings} className="navContainer-img" alt="settings"/>
          </button>
        </div>
      </div>
    </header>
  );
};
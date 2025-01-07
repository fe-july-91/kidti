import './Menu.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import { useLockBodyScroll } from 'react-use';


const getStylelink = ({ isActive }: { isActive: boolean }) => {
  return classNames('menu__link', {
    menu__active: isActive,
  });
};

type Props = {
  toggleMenu: () => void;
  authorized: boolean;
  isMenuOpen: boolean;
}

export const Menu: React.FC<Props> = ({ toggleMenu, authorized, isMenuOpen }) => {
  const { logOut } = useContext(AuthContext);
  useLockBodyScroll(isMenuOpen);

  return (
    <div className={classNames('menu', {
      'menu--visible': isMenuOpen,
    })
    }>
      {!authorized ? (
        <nav className="menu__nav">
        <NavLink
          to="/"
          className={getStylelink}
          onClick={toggleMenu}
        >
          Головна сторінка
        </NavLink>
        <NavLink to="login" className={getStylelink} onClick={toggleMenu}>
          Увійти в додаток
        </NavLink>
        <NavLink to="signup" className={getStylelink} onClick={toggleMenu}>
          Зареєструватися
        </NavLink>
        </nav>
      ) : (
        <nav className="menu__nav">
          <NavLink
            to="#"
            className={getStylelink}
            onClick={toggleMenu}
          >
            Головна сторінка
            </NavLink>

          <NavLink to="account/settings" className={getStylelink} onClick={toggleMenu}>
            Налаштування
          </NavLink>
          <NavLink
              to="/"
              className={getStylelink}
              onClick={() => {
                logOut();
                toggleMenu();
              }}
              >
            Вийти з додатку
          </NavLink>
        </nav>
      )}
    </div>
  );
};
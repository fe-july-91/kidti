import './Menu.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getStylelink = ({ isActive }: { isActive: boolean }) => {
  return classNames('menu__link', {
    menu__active: isActive,
  });
};

type Props = {
  toggleMenu: () => void
}

export const Menu: React.FC<Props> = ({toggleMenu}) => {
  return (
    <div className="menu">
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
      </nav>
    </div>
  );
};
import React from "react";
import './HomePage.scss';
import { bunner, logoDark } from "../../Utils/kit";
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FC = () => {

  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate('/account');
  };

  return (
    <div className="homePage">
      <div className="homePage__top">
      <div className="homePage__bunner">
          <img className="homePage__bunner--img" src={bunner} alt="kittens" />
        </div>
  
        <div className="homePage__description">
          <div className="homePage__header">
              <img src={logoDark} alt="logo" className="homePage__header__logo" />
              <span className="homePage__header__title"> - Надійний cервіс для турботливих батьків</span>
            </div>

            <div className="homePage__paragraph">
              <div className="homePage__paragraph-dots">
                <div className="dot"></div>
                <div>Відстежуйте фізичні показники вашої дитини</div>
              </div>

              <div className="homePage__paragraph-dots">
                <div className="dot"></div>

                <div>Bедіть персональний календар вакцинації.</div>
              </div>

              <div className="homePage__paragraph-dots">
                <div className="dot"></div>

                <div>Зберігайте інформацію про всіх дітей в одному додатку.</div>
              </div>
          </div>

          <button
            className="homePage__button homePage__button--home"
            onClick={handleSubmit}
          >
            Перейти в додаток
          </button>
        </div>
      </div>
    </div>
  )
}
export default HomePage;
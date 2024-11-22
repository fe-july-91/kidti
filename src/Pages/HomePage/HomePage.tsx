import React from "react";
import './HomePage.scss';
import { useNavigate } from 'react-router-dom'
import Banner from "../../Components/Banner/Banner";

export const HomePage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="homePage">
      <div className="homePage__top">
      <div className="homePage__bunner">
        <Banner />
      </div>
        <div className="homePage__description">
          <div className="homePage__header">
              <span className="homePage__header__title">KIDTY - надійний cервіс для турботливих батьків</span>
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

          <div>
            <button
              className="homePage__button"
              onClick={() => navigate('account')}
            >
              Увійти
            </button>

            <button
              className="homePage__button homePage__button--home"
              onClick={() => navigate('signup')}
            >
               Зареєструватися
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage;
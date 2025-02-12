import React, { useContext, useEffect, useState } from "react";
import './HomePage.scss';
import { useNavigate } from 'react-router-dom'
import Banner from "../../Components/Banner/Banner";
import { CSSTransition } from 'react-transition-group';
import { LangContext } from "../../Context/LangContext";


export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { currentLang } = useContext(LangContext);
  
  useEffect(() => {
    setIsVisible(true)
    }, [])

  return (
    <div className="homePage">
      <div className="homePage__top">
        <CSSTransition
          in={isVisible}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="homePage__description">
            <div className="homePage__header">
              <span className="homePage__header__title">
                {currentLang === "UA"
                  ? "KIDTY - надійний cервіс для турботливих батьків"
                  : "KIDTY – сaring for your little ones, together with you"}
              </span>
            </div>

              <div className="homePage__paragraph">
                <div className="homePage__paragraph-dots">
                  <div className="dot"></div>
                <div>
                {currentLang === "UA"
                  ? "Відстежуйте фізичні показники вашої дитини"
                  : "Track your child's physical health data"}
                </div>
                </div>

                <div className="homePage__paragraph-dots">
                  <div className="dot"></div>

                <div>
                {currentLang === "UA"
                  ? "Bедіть персональний календар вакцинації"
                  : "Manage your child's personal vaccination calendar"}
                </div>
                </div>

                <div className="homePage__paragraph-dots">
                  <div className="dot"></div>

                <div>
                {currentLang === "UA"
                  ? "Зберігайте інформацію про всіх дітей в одному додатку"
                  : "Keep your children's necessary information in one app"}
                  </div>
                </div>
            </div>

            <div className="homePage__buttons-wrapper">
              <button
                className="homePage__button homePage__button--logIn"
                onClick={() => navigate('account')}
              >
                {currentLang === "UA" ? "Увійти" : "Log In"}
              </button>

              <button
                className="homePage__button homePage__button--signUp"
                onClick={() => navigate('signup')}
              >
                {currentLang === "UA" ? "Зареєструватися" : "Sign Up"}
              </button>

            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={isVisible}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="homePage__bunner">
              <Banner />
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
export default HomePage;

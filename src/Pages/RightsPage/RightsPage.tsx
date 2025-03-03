
import { avatars, Maria, Yana } from "../../Utils/kit";
import "./RightsPage.scss";
import { CSSTransition } from 'react-transition-group';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../../Context/LangContext";

export const RightsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
    const { currentLang } = useContext(LangContext);
  
    useEffect(() => {
      setIsVisible(true)
      }, [])
  return (
    <div className="rightsPage">
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="fade"
        unmountOnExit
       >
        
        <div className="rightsPage__container">

          <div className="rightsPage__topText">
            <header className="rightsPage__header">
            {currentLang === "UA" ? "Вітаємо!" : "Hi!"}
            </header>
            <p className="rightsPage__paragraph">
            {currentLang === "UA"
                  ? "KIDTY - веб-додаток створений для батьків, щоб допомогти контролювати фізіологічні дані своїх дітей, а також вести облік та графік щеплень. Додаток являє собою дашборт із візуалізацією даних, які можна додавати, видаляти, вносити зміни та проводити аналіз змін із плином часу."
                  : "KIDTY is a web application created for parents to help monitor their children's physiological data, as well as keep records and vaccination schedules. The application is a dashboard with data visualization that can be added, deleted, modified, and analyzed over time."}
            </p>
          </div>

          <div className="rightsPage__avatars">
            <div className="rightsPage__avatars-container">
              <div className="rightsPage__person person">
                <div className="person__bio">
                  <div className="person__photo">
                    <img className="person__img" src={Maria} alt="Maria" />
                  </div>
                  <div className="person__info">
                    <h3 className="person__name">
                      {currentLang === "UA" ? "Марія Шмакова" : "Maria Shmakova"}
                    </h3>
                    <p >Front End Developer, UX/UI Designer</p>
                    <div className="person__links">
                      <a className="person__link person__info--ln" href="https://www.linkedin.com/in/mariashmakova/" target="_blank" rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                      <a className="person__link person__info--git" href="https://github.com/msdreams" target="_blank" rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
                <div className="person__text">
                  {currentLang === "UA"
                    ? "Привіт! Я фронтенд-розробниця, яка захоплена візуалізацією даних. Цей додаток я створила в першу чергу для мам, тому що сама є мамою двох дітей і знаю, що нам завжди треба мати все під рукою. Сподіваюся, що з цією програмою я зможу подарувати мамам трішки спокою та впевненості, а ще усмішку, адже наші дітки котики так швидко ростуть!"
                    : "Hi there! I’m a front-end developer with a passion for data visualization. As a mom of two, I know firsthand how important it is to have everything you need right at your fingertips. That’s why I created this app—designed especially for moms. My hope is that it brings you a little peace of mind, confidence, and maybe even a smile as you watch your little ones grow up so quickly!"
                  }
                </div>
              </div>

              <div className="rightsPage__person person">
                <div className="person__bio">
                  <div className="person__photo">
                    <img className="person__img" src={Yana} alt="Maria" />
                  </div>
                  <div className="person__info">
                    <h3 className="person__name">
                    {currentLang === "UA" ? "Яна Степанова" : "Yana Stepanova"}
                    </h3>
                    <p >Java Developer</p>
                    <div className="person__links">
                      <a className="person__link person__info--ln" href="https://www.linkedin.com/in/yana-stepanova-syna/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                      <a className="person__link person__info--git" href="https://github.com/yanna-stepanova" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
                <div className="person__text">
                {currentLang === "UA"
                    ? "Привіт! Я — бекенд-розробниця. Робота над створенням бекенд-частини була для мене не лише професійним викликом, а й справжнім задоволенням. Як мама, я щиро зацікавилася кожним елементом цього проєкту. Особливо захоплює зручне графічне відображення даних, яке робить інформацію про здоров’я та динаміку розвитку дитини зрозумілою та легкою для аналізу."
                    : "Hi! Working on the backend part of this project was not only a professional challenge for me but also a true pleasure. As a mom, I found myself deeply invested in every element of this project. I’m especially fascinated by the intuitive graphical representation of data, which makes information about a child’s health and development dynamics clear and easy to analyze."
                  }
                 
                </div>
              </div>
            </div>
          </div>

          <div className="rightsPage__bottom">
            <p className="rightsPage__bottomText">
              {currentLang === "UA"
                ? "У разі запитань та пропозицій звертайтесь до нас!"
                : "If you have any questions or suggestions, please contact us!"
              }
              
            </p>
            <div className="rightsPage__images">
              <div className="rightsPage__images--container">
                <Link
                  to="https://www.linkedin.com/in/mariashmakova"
                  className="footer__navbar--link"
                  target="_blank"
                >
                <img
                  src={avatars[1]}
                  alt="kitty"
                  className="rightsPage__image"
                />
                </Link>

                <Link
                  to="https://www.linkedin.com/in/yana-stepanova-syna"
                  className="footer__navbar--link"
                  target="_blank"
                >
                  <img
                  src={avatars[3]}
                  alt="kitty"
                  className="rightsPage__image"
                />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

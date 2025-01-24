
import { avatars, Maria, Yana } from "../../Utils/kit";
import "./RightsPage.scss";

export const RightsPage: React.FC = () => {
  return (
    <div className="rightsPage">
      <div className="rightsPage__container">
        <header className="rightsPage__header">
          Вітаємо!
        </header>
        <p className="rightsPage__paragraph">
          KIDTY - веб-додаток створений для батьків, щоб допомогти контролювати фізіологічні дані своїх дітей, а також вести облік та графік щеплень. Додаток являє собою дашборт із візуалізацією даних, які можна додавати, видаляти, вносити зміни та проводити аналіз змін із плином часу.
          <br /> <br />Інтерфейс та бізнес логіка продумана фронтенд девелоперкою Марією Шмаковою.
          <br />Сховище даних та Серверна обробка дій користувача виконала бекенд розробниця Яна Степанова.
        </p>

        <div className="rightsPage__avatars">
          <div className="rightsPage__avatars-container">
            <div className="rightsPage__person person">
              <div className="person__bio">
                <div className="person__photo">
                  <img className="person__img" src={Maria} alt="Maria" />
                </div>
                <div className="person__info">
                  <h3 className="person__name">Марія Шмакова</h3>
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
                Привіт! Я фронтенд-розробник, захоплений креативним кодуванням та візуалізацією даних. Створюю функціональні інтерфейси, використовуючи React, TypeScript та сучасні технології. Завжди прагну вчитися новому та бути в курсі всіх змін у світі технологій, що постійно розвивається!
              </div>
            </div>

            <div className="rightsPage__person person">
              <div className="person__bio">
                <div className="person__photo">
                  <img className="person__img" src={Yana} alt="Maria" />
                </div>
                <div className="person__info">
                  <h3 className="person__name">Яна Степанова</h3>
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
              Бекенд-розробник зі знанням фреймворку Spring Boot,  досвідом роботи з реляційними базами даних(PostgreSQL/MySQL, ORM), навичками розробки REST API, базовими знаннями контейнеризації додатків за допомогою Docker та розумінням принципів SOLID й патернів проєктування. 
              </div>
            </div>
          </div>
        </div>

        <p className="rightsPage__paragraph">
          У разі запитань та пропозицій звертайтесь до нас, ми завжди на зв'язку.
        </p>
        <div className="rightsPage__images">
          <div className="rightsPage__images--container">
            <img
              src={avatars[3]}
              alt="kitty"
              className="rightsPage__image"
            />
              <img
              src={avatars[0]}
              alt="kitty"
              className="rightsPage__image"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

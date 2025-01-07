
import { Maria, Yana } from "../../Utils/kit";
import "./RightsPage.scss";

export const RightsPage = () => {
  return (
    <div className="rightsPage">
      <div className="rightsPage__container">
        <header className="rightsPage__header">Вітаємо вас!
        </header>
        <p className="rightsPage__paragraph">
          <span className="rightsPage__paragraph rightsPage__paragraph--first">Наз звуть Марія та Яна і ми дуже раді що ви заглянули поцікавитися нашим додатком.</span>
          <br />
          <br />
        Додаток написано для батьків, щоб допомогти вести облік і контролювати фізіологічні дані своїх дітей, а також задокументувати персональний графік щеплень своїх дітей. Це дуже зручно, завжди мати під рукою всю інформацію та не копатися у паперових документах та випадкових записах.
        <br />Інтерфейс та бізнес логіка продумана фронтенд девелоперкою Марією Шмаковою.
        <br />Сховище даних та Серверна обробка дій користувача виконала бекенд розробниця Яна Степанова.
        <br />У разі запитань та пропозицій звертайтесь до нас, ми завжди на зв'язку.
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
                  <a className="person__link person__info--ln" href="https://www.linkedin.com/in/mariashmakova/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a className="person__link person__info--git" href="https://github.com/msdreams" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  </div>
                </div>
              </div>
              <div className="person__text">
                Привіт! Я фронтенд-розробник, захоплений креативним кодуванням та візуалізацією даних. Створюю красиві та функціональні інтерфейси, використовуючи React, TypeScript та сучасні технології. Завжди прагну вчитися новому та бути в курсі всіх змін у світі технологій, що постійно розвивається!
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
              
              Спеціалізуюсь на бекенд-розробці на Java та маю глибокі знання фреймворків Hibernate і Spring. Вмію розгортати безпечні HTTPS-сервери на платформі DigitalOcean, ефективно використовуючи Docker для контейнеризації. Також я впевнено керую як базами даних, так і додатками на droplets, забезпечуючи їхню безперебійну роботу. </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
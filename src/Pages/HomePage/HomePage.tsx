import React from "react";
import './HomePage.scss';
import { bunner, logoDark } from "../../Utils/kit";

export const HomePage: React.FC = () => {
  return (
    <div className="homePage">
      <div className="homePage__top">
        <div className="homePage__text">
          <header className="homePage__title">
            <img src={logoDark} alt="logo" className="homePage__title-logo" />
            <br />
            надійний cервіс для турботливих батьків
          </header>
          <div className="homePage__paragraph">
            Ласкаво просимо до Kidti — вашого надійного партнера у веденні даних про здоров'я та розвиток вашої дитини.
            <br />
            <br />
            <div className="homePage__paragraph-dots">
              <div className="dot"></div>
              <div>Відстежуйте зріст, вагу, щеплення та інші важливі показники</div>
            </div>
            <div className="homePage__paragraph-dots">
            <div className="dot"></div>
            <div>Bедіть персональний щоденник, щоб зберегти всі особливі моменти життя вашої дитини.</div>
            </div>
            <br />
          </div>
        </div>
        <div className="homePage__banner">
          <img src={bunner} alt="banner" className="homePage__banner-img"/>
        </div>
      </div>
    </div>
  )
}
export default HomePage;
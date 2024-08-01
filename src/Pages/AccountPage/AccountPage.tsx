import React from "react";
import { avatar } from "../../Utils/kit";
import './AccountPage.scss';
import { BarChart } from '../../Charts/BarChart';
import { BarChart2 } from '../../Charts/BarChart_2';

import weight from '../../data/weight.json';

export const AccountPage: React.FC = () => {
  const data = weight
    .flatMap(item => {
      return Object.entries(item.MONTH).map(([month, value]) => {
        return { year: item.YEAR, month, value };
      });
    })
    .slice(12)

  return (
    <div className="account">
      <div className="account__top">
        <div className="account__personalInfo">
          <header className="account__personalInfo-name">Прокоп'єва Злата</header>
          <p className="account__personalInfo-age"> 4 p.</p>
          <p className="account__personalInfo-txt">19/08/19</p>
          <p className="account__personalInfo-txt">дівчинка</p>
        </div>
        <div className="account__avatars">
          <div className="account__avatars-card">
            <img src={avatar} alt="avatar" className="account__avatars-image" />
            <p className="account__avatars-card-title">Прокоп'єва Злата</p>
          </div>
          <div className="account__avatars__add">
            <div className="account__avatars__add-icon">
              <div className="iconBig iconBig--plus"></div>
            </div>
            <div className="account__avatars__add-text">ADD CHILD</div>
          </div>
        </div>
      </div>
      <div className="account__container">
        <div className="dashboard">
          <div className="dashboard__item">
            <header className="dashboard__item-title">Вага: 17кг</header>
            <div className="dashboard__item-chart">
              <BarChart width={240} height={180} data={data}/>
            </div>
          </div>
          <div className="dashboard__item">
          <header className="dashboard__item-title">Some value</header>
            <div className="dashboard__item-chart">
              <BarChart2 width={240} height={180} data={data}/>
            </div>
          </div>
          <div className="dashboard__item">
          </div>
          <div className="dashboard__item">
          </div>
          <div className="dashboard__item">
          </div>
          <div className="dashboard__item">
          </div>
        </div>
      </div>
    </div>
  )
}

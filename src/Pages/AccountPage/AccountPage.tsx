import { Dashboard } from "../../Components/Dashboard/Dashboard";
import { avatars } from "../../Utils/kit";
import "./AccountPage.scss";
import Children from "../../api/Children.json";
import { useState } from "react";
import { Child } from "../../Shared/types";

export const AccountPage: React.FC = () => {
  const [child, setChild] = useState(Children[0]);

  const handleChildChange = (selectedChild: Child) => {
    setChild(selectedChild)
  }

  const handleAddChild = () => {

  }

  return (
    <div className="account">
      <div className="account__top">
        <div className="account__top__personalInfo">
          <img src={avatars[child.image]} alt="avatar" className="account__top__personalInfo--image" />
          <div  className="account__top__personalInfo--info">
            <header className="account__top__personalInfo-name">
                Прокоп'єва Злата
            </header>
            <p className="account__top__personalInfo-txt">Вік: 4 p.</p>
            <p className="account__top__personalInfo-txt">Pік народження: 19/08/19</p>
            <p className="account__top__personalInfo-txt">Стать: дівчинка</p>
          </div>
        </div>

        <div className="account__top__avatars">
          {Children.map((childItem, index) => (
              <button
              className="account__top__avatars__card"
              key={index}
              onClick={() => handleChildChange(childItem)}
            >
              <img src={avatars[childItem.image]} alt="avatar" className="account__top__avatars__card--image" />
            </button>
          ))}

          <button
            className="account__top__avatars__add"
            onClick={handleAddChild}
          >
            <div className="account__top__avatars__add--plus"> + </div>
            <div className="account__top__avatars__add--text">Додати<br />дитину</div>
          </button>
        </div>
      </div>

      <div className="account__container">
        <Dashboard child={child} />
      </div>
    </div>
  );
};

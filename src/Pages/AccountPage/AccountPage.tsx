import { Dashboard } from "../../Components/Dashboard/Dashboard";
import { avatars } from "../../Utils/kit";
import "./AccountPage.scss";
import Children from "../../api/Children.json";
import { useEffect, useState } from "react";
import { Child } from "../../Shared/types/types";
import { calculateFullChildAge } from "../../Shared/hendlers/generateYearArray";
import { AddModal } from "../../Components/AddModal/AddModal";
import { EditModal } from "../../Components/EditModal/EditModal";
import GenerativeBG from "../../Components/GenerativeBg/GenerativeBG";

const colors = ["#cdbdda", "#adb0d9", "#9bc7dc", "#d5b99c", "#e2a1bb"];

export const AccountPage: React.FC = () => {
  const [child, setChild] = useState(Children[0]);
  const [activeIndex, setActiveIndex] = useState<number>(child.id - 1);
  const [modal, setModal] = useState(false);
  const [additingModal, setAdditingModal] = useState(false);

  useEffect(() => {
    if (additingModal || modal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [additingModal, modal]);

  const handleChildChange = (index: number, selectedChild: Child) => {
    setActiveIndex(index);
    setChild(selectedChild);
  };

  const handleAddChild = () => {
    document.body.classList.add("no-scroll");
    setModal(true);
  };

  const fullAge = calculateFullChildAge(child.birth);

  return (
    <div className="account">
      <GenerativeBG />
      <div className="account__top">
        <div className="account__top__personalInfo">
          <img
            src={avatars[child.image]}
            alt="avatar"
            className="account__top__personalInfo--image"
            onClick={() => {
              console.log("Image clicked");
              setAdditingModal(true);
            }}
          />
          <div className="account__top__personalInfo--info">
            <header className="account__top__personalInfo-name">
              {child.name}
            </header>
            <p className="account__top__personalInfo-txt">
              Вік: {fullAge.years}p. {fullAge.months}м.
            </p>
            <p className="account__top__personalInfo-txt">
              Pік народження: {child.birth}
            </p>
            <p className="account__top__personalInfo-txt">Стать: дівчинка</p>
          </div>
        </div>

        <div className="account__top__avatars">
          {Children.map((childItem, index) => (
            <div key={index} className="account__top__avatars__card-container">
              <button
                className={`account__top__avatars__card ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => handleChildChange(index, childItem)}
              >
                <img
                  src={avatars[childItem.image]}
                  alt="avatar"
                  className="account__top__avatars__card--image"
                />
              </button>
            </div>
          ))}

          <button
            className="account__top__avatars__add"
            onClick={handleAddChild}
          >
            <div className="account__top__avatars__add--plus"> + </div>
            <div className="account__top__avatars__add--text">
              Додати
              <br />
              дитину
            </div>
          </button>
        </div>
      </div>

      <div
        className="account__container"
        style={{ backgroundColor: colors[activeIndex] }}
      >
        {child && (
          <Dashboard child={child} />
        )}
      </div>
      {modal && (
        <div className="account__modalContainer">
          <AddModal setModal={setModal} />
        </div>
      )}

      {additingModal && (
        <div className="account__modalContainer">
          <EditModal
            setModal={setAdditingModal}
            name={child.name}
            surname={child.surname}
            birth={child.birth}
            gender={child.gender}
            avatar={avatars[child.image]}
          />
        </div>
      )}
    </div>
  );
};

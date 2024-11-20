import { Dashboard } from "../../Components/Dashboard/Dashboard";
import { avatars, colors } from "../../Utils/kit";
import "./AccountPage.scss";
import { useEffect, useState } from "react";
import { Child } from "../../Shared/types/types";
import { calculateFullChildAge } from "../../Shared/hendlers/generateYearArray";
import { AddModal } from "../../Components/AddModal/AddModal";
import { EditModal } from "../../Components/EditModal/EditModal";
import GenerativeBG from "../../Components/GenerativeBg/GenerativeBG";
import { client } from "../../Utils/httpClient";


export const AccountPage: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [child, setChild] = useState<Child | null>(null);
  const [isAddmodal, setIsAddModal] = useState(false);
  const [additingModal, setAdditingModal] = useState(false);
  const [errowMessage, setErrowmessage] = useState("");

  useEffect(() => {
    client.get<Child[]>(`children`)
      .then(response => {
        setChildren(response);
        if (response.length > 0) {
          setChild(response[0]);
        }
      })
      .catch(err => setErrowmessage(err.message || "Щось пішло не так"));
  }, []);

  useEffect(() => {
    if (child) {
      client.get<Child>(`children/${child.id}`)
        .then(updatedChild => {
          setChildren(prevChildren =>
            prevChildren.map(c => (c.id === updatedChild.id ? updatedChild : c))
          );

          client.get<Child[]>(`children` )
            .then(response => setChildren(response))
            .catch(err => setErrowmessage(err.message || "Щось пішло не так"));
        })
        .catch(err => setErrowmessage(err.message || "Не вдалося оновити дані"));
    }
  }, [child]);

    
  useEffect(() => {
    document.body.classList.toggle("no-scroll", additingModal || isAddmodal);
  }, [additingModal, isAddmodal]);

  const handleChildChange = (index: number) => {
    const currentChild = children.find(ch => ch.id === index)!
    setChild(currentChild);
  };

  const handleAddChild = () => {
    setIsAddModal(true);
  };

  const fullAge = child ? calculateFullChildAge(child.birth) : { years: 0, months: 0 };

  return (
    <div className="account">
      <GenerativeBG />
      <div className="account__top">
      {errowMessage && <div className="form__error">{errowMessage}</div>}

        <div className="account__top__personalInfo">
          {child && (
            <>
              <img
                src={avatars[+child.image]}
                alt="avatar"
                className="account__top__personalInfo--image"
                onClick={() => setAdditingModal(true)}
              />
              <div className="account__top__personalInfo--info">
                <header className="account__top__personalInfo-name">{child.name}</header>
                <p className="account__top__personalInfo-txt">
                  Вік: {fullAge.years}p. {fullAge.months}м.
                </p>
                <p className="account__top__personalInfo-txt">Рік народження: {child.birth}</p>
                <p className="account__top__personalInfo-txt">Стать: {child.genderName}</p>
              </div>
            </>
          )}
        </div>

        <div className="account__top__avatars">
          {children.map((childItem, index) => (
            <div key={childItem.id} className="account__top__avatars__card-container">
              <button
                className={`account__top__avatars__card ${
                  child?.id === childItem.id ? "active" : ""
                }`}
                onClick={() => handleChildChange(childItem.id)}
              >
                <img
                  src={avatars[+childItem.image]}
                  alt="avatar"
                  className="account__top__avatars__card--image"
                />
              </button>
            </div>
          ))}

          <button className="account__top__avatars__add" onClick={handleAddChild}>
            <div className="account__top__avatars__add--plus"> + </div>
            <div className="account__top__avatars__add--text">
              Додати
              <br />
              дитину
            </div>
          </button>
        </div>
      </div>

      <div className="account__container" style={{ backgroundColor: colors[child?.id || 0] }}>
        {child && <Dashboard child={child} />}
      </div>

      {(isAddmodal || children.length === 0) && (
        <div className="account__modalContainer">
          <AddModal
            setModal={setIsAddModal}
            setCurrentChild={setChild}
          />
        </div>
      )}

      {additingModal && child && (
        <div className="account__modalContainer">
          <EditModal
            setModal={setAdditingModal}
            currentChild={child}
            setCurrentChild={setChild}
            setChildren={setChildren}
          />
        </div>
      )}
    </div>
  );
};

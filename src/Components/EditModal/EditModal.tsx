import React, { useState } from 'react';
import './EditModal.scss'
import { AvatarSelector } from '../AvatarSelector/AvatarSelector';
import { client } from '../../Utils/httpClient';
import { Child } from '../../Shared/types/types';
import { PopUpWindow } from '../PopUpWindow/PopUpWindow';

type Props = {
  setModal: (a: boolean) => void;
  currentChild: Child;
  setCurrentChild: (value: Child) => void;
  setChildren: (value: Child[]) => void;
};

export const EditModal: React.FC<Props> = ({
  setModal,
  currentChild,
  setCurrentChild,
  setChildren
}) => {
  const [day, month, year] = currentChild.birth.split('-')
  const [errowMessage, setErrowmessage] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  console.log(day)


  const [selectedGender, setSelectedGender] = useState(currentChild.genderName);
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  const [avatarIndex, setAvatarIndex] = useState<number>(+currentChild.image)
  const [surname, setSurname] = useState(currentChild.surname);
  const [name, setName] = useState(currentChild.name);
  
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  console.log(currentChild.id)

  const handleDelete = () => {
    setIsPopUp(true)
  }

  const deleteChild = () => {
    client.delete(`children/${currentChild.id}`)
      .finally(() => {
        client.get<Child[]>(`children` )
          .then(response => {
            setChildren(response)
            if (response.length > 0) {
              setCurrentChild(response[0]);
            }
          })
          .catch(err => setErrowmessage(err.message || "Щось пішло не так"));
        setModal(false);
      }
    )
  }

const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();

  client.put<Child>(`children/${currentChild.id}`, {
    "birth": `${selectedDay}-${selectedMonth}-${selectedYear}`,
    "genderName": `${selectedGender}`,
    "image": `${avatarIndex}`,
    "name": name,
    "surname": surname,
  })
    .then(response => {
      setCurrentChild(response);
      setModal(false);
    })
    .catch(error => {
      setErrowmessage("Помилка при сохранении данних");
    });
};

  return (
    <div className="modal">
      {isPopUp
      ?  (
        <div className="modal__popApp">
          <PopUpWindow
            message={`Ви дійсно хочете видалити дані про дитину (${currentChild.name})?`}
            handleApplyClick={deleteChild}
            handleCanсelClick={setIsPopUp}
          />
        </div>
        ) : (
          <form className="modal__form">
          <div className="modal__form__close-button">
            <button
              className='icons icons--close'
              onClick={() => setModal(false)}
            />
              
        </div>
  
          <div className="modal__form__title">Редагувати дані дитини </div>
          <AvatarSelector avatarIndex={avatarIndex} setAvatarIndex={ setAvatarIndex } />
            <div className="modal__form__input">
              <label htmlFor="name" className="modal__form__label">Ім'я</label>
              <input 
                type="text" 
                className="form__control" 
                id="name"
                defaultValue={currentChild.name}
                required
                onChange={(event) => setName(event.target.value)}
              />
          </div>
          <div className="modal__form__input">
              <label htmlFor="surname" className="modal__form__label">Прізвище</label>
              <input
                type="text"
                className="form__control"
                id="surname"
              defaultValue={currentChild.surname}
              onChange={(event) => setSurname(event.target.value)}
                required
              />
          </div>
  
          <div className="modal__form__input">
            <label htmlFor="gender" className="modal__form__label">Стать</label>
            <select
              id="gender"
              className="form__control"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="Хлопчик">Хлопчик</option>
              <option value="Дівчинка">Дівчинка</option>
            </select>
          </div>
  
          <div className="modal__form__input">
            <label className="modal__form__label">Дата народження</label>
            <div className="modal__form__control--date">
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                <option value="">День</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Місяць</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Рік</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          
            <button
              type="submit"
              className="modal__form__button"
              onClick={e => handleSubmit(e)}
            >
              Зберегти
          </button>
          
          <button
              type="button"
              className="modal__form--deleteButton"
              onClick={handleDelete}
            >
              Видалити дитину
            </button>
        </form>
        )
    }
    </div>
  )
}
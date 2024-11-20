import React, { useState } from 'react';
import './AddModal.scss'
import { AvatarSelector } from '../AvatarSelector/AvatarSelector';
import { client } from '../../Utils/httpClient';
import { Child } from '../../Shared/types/types';

type Props = {
  setModal: (a: boolean) => void;
  setCurrentChild: (value: Child) => void;
};

export const AddModal: React.FC<Props> = ({ setModal, setCurrentChild }) => {
  
const [selectedGender, setSelectedGender] = useState('');
const [selectedDay, setSelectedDay] = useState('');
const [selectedMonth, setSelectedMonth] = useState('');
const [selectedYear, setSelectedYear] = useState('');
const [avatarIndex, setAvatarIndex] = useState<number>(0)
const [errowMessage, setErrowmessage] = useState("");
const [surname, setSurname] = useState('');
const [name, setName] = useState('');


  

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  
    client.post<Child>(`children`, {
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
      <form className="modal__form">
        <div className="modal__form__close-button">
          <button
            className='icons icons--close'
            onClick={() => setModal(false)}
          />
            
      </div>

        <div className="modal__form__title">Введіть дані дитини </div>
        <AvatarSelector setAvatarIndex={setAvatarIndex} avatarIndex={avatarIndex} />
          <div className="modal__form__input">
            <label htmlFor="name" className="modal__form__label">Ім'я</label>
            <input
            type="text"
            value={name}
              className="form__control"
            id="name"
            onChange={(event) => setName(event.target.value)}
            />
        </div>
        <div className="modal__form__input">
            <label htmlFor="surname" className="modal__form__label">Прізвище</label>
            <input
            type="text"
            value={surname}
              className="form__control"
            id="surname"
            onChange={(event) => setSurname(event.target.value)}
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
            <option value="">Виберіть стать</option>
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
      </form>
    </div>
  )
}
import React, { useState } from 'react';
import './EditModal.scss'
import { AvatarSelector } from '../AvatarSelector/AvatarSelector';

type Props = {
  setModal: (a: boolean) => void;
  name: string;
  surname: string;
  birth: string;
  gender: string;
  avatar: string;
};

export const EditModal: React.FC <Props> = ({ setModal, name, surname, birth, gender, avatar }) => {

const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();
  setModal(false);
};
  const [day, month, year] = birth.split('.')
  
const [selectedGender, setSelectedGender] = useState(gender);
const [selectedDay, setSelectedDay] = useState(day);
const [selectedMonth, setSelectedMonth] = useState(month);
const [selectedYear, setSelectedYear] = useState(year);


const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="modal">
      <form className="modal__form">
        <div className="modal__form__close-button">
          <button
            className='icons icons--close'
            onClick={() => setModal(false)}
          />
            
      </div>

        <div className="modal__form__title">Редагувати дані дитини </div>
        <AvatarSelector avatar={avatar} />
          <div className="modal__form__input">
            <label htmlFor="name" className="modal__form__label">Ім'я</label>
            <input 
              type="text" 
              className="form__control" 
              id="name"
              defaultValue={name}
            />
        </div>
        <div className="modal__form__input">
            <label htmlFor="surname" className="modal__form__label">Прізвище</label>
            <input
              type="text"
              className="form__control"
              id="surname"
              defaultValue={surname}
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
      </form>
    </div>
  )
}
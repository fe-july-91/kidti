import React, { useState } from 'react';
import './AddModal.scss'
import { AvatarSelector } from '../AvatarSelector/AvatarSelector';

type Props = {
  setModal: (a: boolean) => void;
};

export const AddModal: React.FC <Props> = ({ setModal }) => {

const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();
  setModal(false);
};
  
const [selectedGender, setSelectedGender] = useState('');
const [selectedDay, setSelectedDay] = useState('');
const [selectedMonth, setSelectedMonth] = useState('');
const [selectedYear, setSelectedYear] = useState('');


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

        <div className="modal__form__title">Введіть дані дитини </div>
        <AvatarSelector />
          <div className="modal__form__input">
            <label htmlFor="name" className="modal__form__label">Ім'я</label>
            <input type="text" className="form__control" id="name" />
        </div>
        <div className="modal__form__input">
            <label htmlFor="surname" className="modal__form__label">Прізвище</label>
            <input type="text" className="form__control" id="surname" />
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
            <option value="male">Хлопчик</option>
            <option value="female">Дівчинка</option>
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
import { Link, useNavigate } from 'react-router-dom'
import './LogInForm.scss'
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

async function loginUser(email:string, password:string) {
  try {
    const response = await fetch('http://localhost:8088/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`errow: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при попытке входа:', error);
    throw error;
  }
}


export const LogInForm = () => {

  const navigate = useNavigate();
  const [errowMessage, setErrowmessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authenticate } = useContext(AuthContext);

  

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setErrowmessage('');

    authenticate(email, password)
      .then(() => {
        navigate('/account');
      })
    .catch(error => setErrowmessage(error.message))
  };

  return (
    <>
      <form className="form">
      <div className="form__title">Ласкаво просимо до Kidti
      </div>
        <div className="form__input">
          <label htmlFor="exampleInputEmail1" className="form__label">Адреса електронної пошти</label>
          <input
            type="email"
            className="form__control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(event) => setEmail(event.target.value)}
            />
        </div>
        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form__label">Пароль</label>
          <input
            type="password"
            className="form__control"
            id="exampleInputPassword1"
            onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <div className="form__options">
        <div className="form__check">
          <input type="checkbox" className="form__check--input" id="exampleCheck1" />
          <label className="form__check--label" htmlFor="exampleCheck1">Запам'ятати мене</label>
        </div>
        <Link to="/forgot-password" className="form__link">Забули пароль?</Link>
      </div>
        <button
          type="submit"
          className="form__button form__button-big"
          onClick={e => handleSubmit(e)}
        >
          Увійти
        </button>

        <hr className="form__divider" />

        <button type="button" className="form__button-social">
          <i className="icons icons--facebook"></i> Увійдіть з Facebook
        </button>

        <button type="button" className="form__button-social">
          <i className="icons icons--google"></i> Увійдіть з Google
        </button>
      </form>
    </>
  )
}

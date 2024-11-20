import './SignUpForm.scss'
import { useState } from 'react';
import { client } from '../../Utils/httpClient';
import cn from 'classnames';


export const SignUpForm = () => {
  const [errowMessage, setErrowmessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);


  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setErrowmessage('');
    console.log(email)
    console.log(password1)
    console.log(password2)
    console.log(name)

    client.post('auth/registration', {
      "email": email.trim(),
      "password": password1.trim(),
      "repeatPassword": password2.trim(),
      "name": name.trim()
    })
      .then((response: any) => {
        if (response.status === 500 ) {
          throw new Error('Користувач з даною адресою електронної пошти вже зареєстрований');
        }

        if (response.status === 'BAD_REQUEST') {
          throw new Error('Перевірте наявність та правильність введених даних');
        }

        setIsRegistered(true);
      })
      .catch(error => setErrowmessage(error.message))
  };

  return (
    <>
      {!isRegistered
      ?  (
      <form className="form">
      <div className="form__title">Ласкаво просимо до Kidti</div>
        <div className="form__input">
          <label htmlFor="name" className="form__label">Ім'я</label>
          <input
            type="text"
            value={name}
            className={cn("form__control", {"form__control--invalid": errowMessage})}
            id="name"
                onChange={(event) => setName(event.target.value)}
                required
            />
        </div>
        <div className="form__input">
          <label htmlFor="exampleInputEmail1" className="form__label">Адреса електронної пошти</label>
          <input
            type="email"
            value={email}
            className={cn("form__control", {"form__control--invalid": errowMessage})}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
                onChange={(event) => setEmail(event.target.value)}
                required
          />
        </div>
        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form__label">Пароль</label>
          <input
            type="password"
            value={password1}
            className={cn("form__control", {"form__control--invalid": errowMessage})}
            id="exampleInputPassword1"
            onChange={(event) => setPassword1(event.target.value)}
            required
            />
        </div>
        <div className="form__input">
          <label htmlFor="exampleInputPassword2" className="form__label">Підтвердити пароль</label>
          <input
            type="password"
            value={password2}
            className={cn("form__control", {"form__control--invalid": errowMessage})}
            id="exampleInputPassword2"
            onChange={(event) => setPassword2(event.target.value)}
            required
            />
        </div>

        {errowMessage && <div className="form__error">{errowMessage}</div>}
        
        <div className="form__options">

      </div>
        <button
          type="submit"
          className="form__button"
          onClick={e => handleSubmit(e)}
        >
          Зареєструватися
        </button>

        <button
          type="submit"
          className="form__button form__button--guest"
          onClick={e => handleSubmit(e)}
        >
          Продовжити як гість
        </button>

        <hr className="form__divider" />

        <button type="button" className="form__button-social">
          <i className="icons icons--facebook"></i> Зареєструватися з Facebook
        </button>

        <button type="button" className="form__button-social">
          <i className="icons icons--google"></i> Зареєструватися з Google
        </button>
      </form>
        ) : (
          <div className="notification">
            <div className="notification__header"> Мяу! <br /> Лист-підтвердження надіслано на вказану електронну пошту!
            </div>
            <p className="notification__text">Для завершення реєстрації вам необхідно зайти на свою електронну пошту,
              відкрити лист і перейти за вказаним посиланням.
            </p>
          </div>
        )
      }
     </>
  )
}
import { useNavigate } from 'react-router-dom'
import './SignUpForm.scss'

export const SignUpForm = () => {

  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate('/account', { replace: true });
  };

  return (
    <>
      <form className="form">
      <div className="form__title">Ласкаво просимо до Kidti
      </div>
        <div className="form__input">
          <label htmlFor="exampleInputEmail1" className="form__label">Адреса електронної пошти</label>
          <input type="email" className="form__control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form__label">Пароль</label>
          <input type="password" className="form__control" id="exampleInputPassword1" />
        </div>
        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form__label">Підтвердити пароль</label>
          <input type="password" className="form__control" id="exampleInputPassword1" />
        </div>
        <div className="form__options">
        <div className="form__check">
          <input type="checkbox" className="form__check--input" id="exampleCheck1" />
          <label className="form__check--label" htmlFor="exampleCheck1">Запам'ятати мене</label>
        </div>
        {/* <Link to="/forgot-password" className="form__link">Forgot Password?</Link> */}
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

        {/* Кнопки входа через Facebook и Google */}
        <button type="button" className="form__button-social">
          <i className="icons icons--facebook"></i> Зареєструватися з Facebook
        </button>

        <button type="button" className="form__button-social">
          <i className="icons icons--google"></i> Зареєструватися з Google
        </button>
      </form>
    </>
  )
}
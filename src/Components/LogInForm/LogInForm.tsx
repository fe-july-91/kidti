import { Link, useNavigate } from "react-router-dom";
import "./LogInForm.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { client } from "../../Utils/httpClient";
import cn from "classnames";
import { useLocalStorage } from "../../Shared/CustomHooks/useLocalStorage";

export const LogInForm = () => {
  const navigate = useNavigate();
  const [savedEmail, setSavedEmail] = useLocalStorage<string>("email", "");
  const [savedPassword, setSavedPassword] = useLocalStorage<string>(
    "password",
    ""
  );

  const { logIn, setToken } = useContext(AuthContext);
  const [errowMessage, setErrowmessage] = useState("");
  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState(savedPassword);
  const [checked, setChecked] = useState(true);

  const handleCheckedButton = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setChecked((prevChecked) => !prevChecked);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setErrowmessage("");

    client
      .post("auth/login", { email: email.trim(), password: password.trim() })
      .then((response: any) => {
        if (response.status === "BAD_REQUEST") {
          throw new Error("Електронна пошта або пароль неправильні");
        }

        if (checked) {
          setSavedEmail(email);
          setSavedPassword(password);
        }

        setToken(response.token);
        logIn();
        navigate("/account");
      })
      .catch((error) => setErrowmessage(error.message));
  };

  return (
    <>
      <form className="form">
        <div className="form__title">Ласкаво просимо до Kidty</div>
        <div className="form__input">
          <label htmlFor="exampleInputEmail1" className="form__label">
            Адреса електронної пошти
          </label>
          <input
            type="email"
            value={email}
            className={cn("form__control", {
              "form__control--invalid": errowMessage,
            })}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form__input">
          <label htmlFor="exampleInputPassword1" className="form__label">
            Пароль
          </label>
          <input
            type="password"
            value={password}
            className={cn("form__control", {
              "form__control--invalid": errowMessage,
            })}
            id="exampleInputPassword1"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {errowMessage && (
          <div className="form__error">
            Помилка при виконанні запиту: {errowMessage}
          </div>
        )}
        <div className="form__options">
          <div className="form__check">
            <input
              type="checkbox"
              className={cn("form__check__input", {
                "form__check__input--active": checked,
              })}
              id="exampleCheck1"
              onClick={handleCheckedButton}
            />
            <label className="form__check--label" htmlFor="exampleCheck1">
              Запам'ятати мене
            </label>
          </div>
          <Link to="/recovery" className="form__link">
            Забули пароль?
          </Link>
        </div>
        <button
          type="submit"
          className="form__button form__button-big"
          onClick={(e) => handleSubmit(e)}
        >
          Увійти
        </button>

        <button type="button" className="form__button-social">
          <i className="icons icons--google"></i> Увійдіть з Google
        </button>
      </form>
    </>
  );
};

import React from "react";
import "./PopUpWindow.scss";

type Props = {
  message: string;
  handleApplyClick: () => void;
  handleCanсelClick: (value: boolean) => void;
}

export const PopUpWindow: React.FC<Props> = ({message, handleApplyClick, handleCanсelClick}) => {
  return (
    <div className="PopUpWindow">
      <header className="PopUpWindow__header">{message}</header>

      <div className="PopUpWindow__button--container">
            <button className="PopUpWindow__button" onClick={handleApplyClick}>
              {" "}
              Так
            </button>

            <button
              className="PopUpWindow__button PopUpWindow__button--cansel"
              onClick={() => handleCanсelClick(false)}
            >
              {" "}
              Ні
            </button>
      </div>
    </div>
  )
}
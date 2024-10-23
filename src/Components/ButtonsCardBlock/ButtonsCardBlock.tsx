import React from "react";
import "./ButtonsCardBlock.scss"

type Props = {
  handleData: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: number | undefined;
  value2?: number;
  setActiveSlider: (value: boolean) => void;
  setSliderValue: (value: { x: number; }) => void;
  setSecondSliderValue?: React.Dispatch<React.SetStateAction<{ x: number; }>>;
  activeSlider: boolean;
}

export const ButtonsCardBlock: React.FC<Props> = React.memo(({
  activeSlider,
  handleData,
  setActiveSlider,
  value = 0,
  value2 = 0,
  setSliderValue,
  setSecondSliderValue
}) => {
  const handleEditClick = () => {
    setActiveSlider(true); 
    if (activeSlider) {
      setSliderValue({ x: value });
      if (setSecondSliderValue) {
        setSecondSliderValue({ x: value2 });
      }
    }
  };
  console.log('render button')

  const handleCanсelClick = () => {
    setActiveSlider(false);
    if (activeSlider) {
      setSliderValue({ x: value });
      if (setSecondSliderValue) {
        setSecondSliderValue({ x: value2 });
      }
    }
  };

  const handleApplyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setActiveSlider(false);
    handleData(e);
  };

  return (
    <>
      {!activeSlider ? (
        <button 
        className="button button--big edit-button" 
          onClick={handleEditClick}
        >
        {" "}
        Редагувати
        </button>
          ) : (
          <div className="button--container">
            <button className="button" onClick={handleApplyClick}>
              {" "}
              Додати
            </button>

            <button
              className="button button--cansel"
              onClick={handleCanсelClick}
            >
              {" "}
              Cкасувати
            </button>
          </div>
      )}
    </>
  )
})
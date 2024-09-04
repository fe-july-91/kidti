import React, { useEffect, useState } from "react";
import cn from "classnames";
import Slider from "react-input-slider";
import "./CardEyes.scss";
import { Eye } from "../../Shared/types";
import { eye, sliderWidth} from "../../Utils/kit";
import { EyesChart } from "../../Charts/EyesChart/EyesChart";

type Props = {
  data: Eye;
};

export const CardEyes: React.FC<Props> = ({ data }) => {

  const [activeParametrs, setActiveParametrs] = useState<Eye>(data);

  const [activeSlider, setActiveSlider] = useState(false);
  const [leftSliderValue, setLeftSliderValue] = useState({ x: data.left });
  const [rightSliderValue, setRightSliderValue] = useState({ x: data.right });

  useEffect(() => {
    setActiveParametrs(data);
  }, [data]);

  const saveData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    const newParametrs = {
      left: leftSliderValue.x,
      right: rightSliderValue.x
    };
  
    setActiveParametrs(newParametrs);
  };

  const handleEditClick = () => {
    setActiveSlider(true);
    if (activeParametrs) {
      setLeftSliderValue({ x: activeParametrs.left });
      setRightSliderValue({ x: activeParametrs.right});
    }
  };
  const handleCanсelClick = () => {
    setActiveSlider(false);
    if (activeParametrs) {
      setLeftSliderValue({ x: activeParametrs.left });
      setRightSliderValue({ x: activeParametrs.right});
    }
  };

  const handleApplyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setActiveSlider(false);
    saveData(e);
  };

  return (
    <div className="eyes__item">
      <div className="eyes__item-top">
        <div className="eyes__item-top-leftBlock">
          <img src={eye} alt="eye" className="eyes__item-image"/>
          <p className="eyes__item-title">Зiр</p>
        </div>


        <div className="eyes__item--edit">
          {!activeSlider ? (
            <button className="card__item__button card__item__button-big edit-button" onClick={handleEditClick}>
              {" "}
              Редагувати
            </button>
          ) : (
            <div className="card__item__button--container">
              <button className="card__item__button" onClick={handleApplyClick}>
                {" "}
                Додати
              </button>

              <button
                className="card__item__button card__item__button--cansel"
                onClick={handleCanсelClick}
              >
                {" "}
                Скасувати
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="eyes__item__eyes">
        <div className="eyes__item-values">
        <p className="eyes__item-sign">Ліве око:</p>
        <p
          className={cn("eyes__item-value", {
            "eyes__item-value-activeLeft": activeSlider,
          })}
        >
          {activeSlider
            ? leftSliderValue.x
              : activeParametrs.left
            }
        </p>
        </div>

        {activeSlider && (
        <Slider
          axis="x"
          xmin={-10}
          xmax={10}
          x={leftSliderValue.x}
          onChange={({ x }) => setLeftSliderValue((state) => ({ ...state, x }))}
          styles={{
            track: {
              backgroundColor: "#ddd",
              height: "8px",
              width: "160px",
              borderRadius: "4px",
            },
            active: {
              backgroundColor: "#50C3F9",
            },
            thumb: {
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#50C3F9",
              boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
            },
          }}
          />
        )}
      </div>

      <div className="eyes__item__eyes">
        <div className="eyes__item-values">
          <p className="eyes__item-sign">Праве око:</p>
          <p
            className={cn("eyes__item-value", {
              "eyes__item-value-active": activeSlider,
            })}
          >
            {activeSlider
              ? rightSliderValue.x
              : activeParametrs.right
            }
          </p>
        </div>

        {activeSlider && (
        <Slider
          axis="x"
          xmin={-10}
          xmax={10}
          x={rightSliderValue.x}
          onChange={({ x }) => setRightSliderValue((state) => ({ ...state, x }))}
          styles={{
            track: {
              backgroundColor: "#ddd",
              height: "8px",
              width: "160px",
              borderRadius: "4px",
            },
            active: {
              backgroundColor: "#C88CF8",
            },
            thumb: {
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#C88CF8",
              boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
            },
          }}
          />
        )}
      </div>

      <div className="eyes__item--mobile-edit">
          {!activeSlider ? (
            <button className="eyes__item__button" onClick={handleEditClick}>
              {" "}
              Редагувати
            </button>
          ) : (
            <div className="eyes__item__button--container">
              <button className="eyes__item__button" onClick={handleApplyClick}>
                {" "}
                Додати
              </button>

              <button
                className="eyes__item__button eyes__item__button--cansel"
                onClick={handleCanсelClick}
              >
                {" "}
                Скасувати
              </button>
            </div>
          )}
      </div>

      <div className="eyes__item-chart">
        <EyesChart
          width={400}
          height={200}
          data={activeParametrs}
          sliderLeft={leftSliderValue.x}
          sliderRight={rightSliderValue.x}
        />
      </div>
    </div>
  );
};

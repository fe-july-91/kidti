import React, { useEffect, useState } from "react";
import cn from "classnames";
import "./CardEyes.scss";
import { CardTitleTypes, Eye } from "../../Shared/types/types";
import { cardSize, eye, sliderRange } from "../../Utils/kit";
import { EyesChart } from "../../Charts/EyesChart/EyesChart";
import { TitleCardBlock } from "../../Components/CardTitleBlock/TitleCardBlock";
import { SliderElement } from "../../Components/SliderElement/SliderElement";
import { ButtonsCardBlock } from "../../Components/ButtonsCardBlock/ButtonsCardBlock";
import eyeData from "./../../api/data/Eyes.json";


export const CardEyes = ( ) => {
  const [data, setData] = useState<Eye>({"left": 1, "right": 1 });

  const [activeParametrs, setActiveParametrs] = useState<Eye>(data);
  const [activeSlider, setActiveSlider] = useState(false);
  const [leftSliderValue, setLeftSliderValue] = useState({ x: data.left });
  const [rightSliderValue, setRightSliderValue] = useState({ x: data.right });

  useEffect(() => {
    setData(eyeData);
  }, []);

  const saveData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    const newParametrs = {
      left: leftSliderValue.x,
      right: rightSliderValue.x,
    };

    setActiveParametrs(newParametrs);
  };

  return (
    <div className="eyes">
      <div className="eyes__top">
        <TitleCardBlock image={eye} title={CardTitleTypes.eyes} />

        <div className="eyes__edit">
          <ButtonsCardBlock
            handleData={saveData}
            value={activeParametrs.left}
            value2={activeParametrs.right}
            activeSlider={activeSlider}
            setActiveSlider={setActiveSlider}
            setSliderValue={setLeftSliderValue}
            setSecondSliderValue={setRightSliderValue}
          />
        </div>
      </div>

      <div className="eyes__eye">
        <div className="eyes__values">
          <p className="eyes__sign">Ліве око:</p>
          <p
            className={cn("eyes__value", {
              "eyes__value--activeLeft": activeSlider,
            })}
          >
            {activeSlider ? leftSliderValue.x : activeParametrs.left}
          </p>
        </div>

        {activeSlider && (
          <SliderElement
            setSliderValue={setLeftSliderValue}
            sliderValue={leftSliderValue}
            sliderWidth="50%"
            range={sliderRange.eye}
          />
        )}
      </div>

      <div className="eyes__eye">
        <div className="eyes__values">
          <p className="eyes__sign">Праве око:</p>
          <p
            className={cn("eyes__value", {
              "eyes__value--activeRight": activeSlider,
            })}
          >
            {activeSlider ? rightSliderValue.x : activeParametrs.right}
          </p>
        </div>

        {activeSlider && (
          <SliderElement
            setSliderValue={setRightSliderValue}
            sliderValue={rightSliderValue}
            sliderWidth="50%"
            range={sliderRange.eye}
          />
        )}
      </div>

      <div className="eyes__mobile">
        <ButtonsCardBlock
          handleData={saveData}
          value={activeParametrs.left}
          value2={activeParametrs.right}
          activeSlider={activeSlider}
          setActiveSlider={setActiveSlider}
          setSliderValue={setLeftSliderValue}
          setSecondSliderValue={setRightSliderValue}
        />
      </div>

      <div className="eyes__chart">
        <EyesChart
          width={cardSize.width}
          height={cardSize.height}
          data={activeParametrs}
          sliderLeft={leftSliderValue.x}
          sliderRight={rightSliderValue.x}
        />
      </div>
    </div>
  );
};

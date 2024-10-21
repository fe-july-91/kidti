import classNames from "classnames";
import "./TitleCardBlock.scss";
import { CardTitleTypes, Data } from "../../Shared/types";
import { setUnits } from "../../Shared/servises/setUnits";

type Props = {
  activeSlider?: boolean;
  currentData?: Data | undefined;
  sliderValue?: { x: number };
  maxValue?: number;
  image: string;
  title: string;
}

export const TitleCardBlock: React.FC<Props> = ({
  activeSlider, 
  currentData, 
  sliderValue, 
  maxValue,
  image,
  title,
}) => {
  const units = setUnits(title);

  return (
    <div className="title">
      <img src={image} alt="foot" className="title__image"/>
      <div className="title__values">
          <p className="title__text">{title}:</p>
          {
            title !== CardTitleTypes.eyes &&
            title !== CardTitleTypes.vactination &&
        <p
          className={classNames("title__text", {
            "title__text--active": activeSlider,
          })}
        > 
          {activeSlider
            ? `${sliderValue?.x}см`
            : !currentData ? maxValue+units :`${currentData.value}кг`
          }
        </p>
          }
      </div>
    </div>
  )
}
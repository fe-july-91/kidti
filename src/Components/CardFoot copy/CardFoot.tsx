import React, { useState } from "react";
import cn from "classnames";
import Slider from "react-input-slider";
import "./CardFoot.scss";
import { Data } from "../../Shared/types";
import { foot, sliderWidth} from "../../Utils/kit";
import { FootChart } from "../../Charts/FootLineChart/FootChart";

type Props = {
  data: Data[];
  years: string[];
  age?: number;
};

export const CardFoot: React.FC<Props> = ({ data, years }) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("ukr-GB", {
    year: "numeric",
    month: "long",
  });
  const todayMonth = formattedDate.split(" ")[0];

  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const monthIndex = months.findIndex(
    (month) => month.toLowerCase() === todayMonth.toLowerCase()
  );

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[monthIndex]);
  const [newData, setNewdata] = useState<Data[]>(data);

  const currentData = data.find(
    (d) => d.month === selectedMonth && d.year === selectedYear
  );
  const [activeParametrs, setActiveParametrs] = useState<Data | undefined>(
    currentData
  );

  const currentIndex = data.findIndex(d => d === activeParametrs)
  const maxValue = Math.max(...data.slice(0, currentIndex).filter(d => d.value > 0).map(d => d.value));

  const [activeSlider, setActiveSlider] = useState(false);
  const [sliderValue, setSliderValue] = useState({ x: maxValue });
  
  const reset = () => {
    setSliderValue({ x: 0 });
  };

  const saveData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    const newParametrs: Data = {
      year: selectedYear,
      month: selectedMonth,
      value: sliderValue.x,
    };

    setNewdata((currentData) => {
      const index = currentData.findIndex(
        (d) => d.month === newParametrs.month && d.year === newParametrs.year
      );

      if (index !== -1) {
        return currentData.map((d, i) => (i === index ? newParametrs : d));
      } else {
        return [...currentData, newParametrs];
      }
    });
    setActiveParametrs(newParametrs);
    reset();
  };

  const handleEditClick = () => {
    setActiveSlider(true);
    if (activeParametrs) {
      setSliderValue({ x: activeParametrs.value === 0 ? maxValue : activeParametrs.value});
    }
  };
  const handleCanсelClick = () => {
    setActiveSlider(false);
    if (activeParametrs) {
      setSliderValue({ x: activeParametrs.value });
    }
  };

  const handleApplyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setActiveSlider(false);
    saveData(e);
  };

  const handleMonthChenge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    const newParametr = data.find(
      (d) => d.month === event.target.value && d.year === selectedYear
    );
    setActiveParametrs(newParametr);
    setActiveSlider(false);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    const newParametr = data.find(
      (d) => d.month === selectedMonth && d.year === event.target.value
    );
    setActiveParametrs(newParametr);
    setActiveSlider(false);
  };

  const HandleGraph = (d: Data) => {
    setActiveSlider(true);
    setSelectedMonth(d.month);
    setActiveParametrs(d);
    if (d.value !== 0) {
      setSliderValue({ x: d.value });
    } else {
      setSliderValue({ x: maxValue });
    }
  };


  const filteredData = newData.filter((d) => d.year === selectedYear);

  return (
    <div className="foot__item">
      <div className="foot__item-top">
        <div className="foot__item-top-leftBlock">
        <img src={foot} alt="foot" className="foot__item-image"/>
        <div className="foot__item-selectors">            
          <div className="foot__item-values">
            <p className="foot__item-title">Cтопa:</p>
            <p
              className={cn("foot__item-value", {
                "foot__item-value-active": activeSlider,
              })}
            >
              {activeSlider
                ? `${sliderValue.x}см`
                : activeParametrs?.value === 0 ? `${maxValue}см` :`${activeParametrs?.value}см`}
            </p>
          </div>
          <select
            className="foot__item-select"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            className="foot__item-select"
            value={selectedMonth}
            onChange={handleMonthChenge}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        </div>


        <div className="foot__item-edit">
          {activeSlider && (
            <Slider
              axis="x"
              xmin={4}
              xmax={40}
              x={sliderValue.x}
              onChange={({ x }) => setSliderValue((state) => ({ ...state, x }))}
              styles={{
                track: {
                  backgroundColor: "#ddd",
                  height: "8px",
                  width: sliderWidth,
                  borderRadius: "4px",
                },
                active: {
                  backgroundColor: "#FF5C9D",
                },
                thumb: {
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#FF5C9D",
                  boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
                },
              }}
              />
          )}
          {!activeSlider ? (
            <button className="card__item__button card__item__button-big edit-button" onClick={handleEditClick}>
              {" "}
              Редагувати
            </button>
          ) : (
            <div className="card__item__button--container">
              <button className="card__item__button" onClick={handleApplyClick}>
                {" "}
                Так
              </button>

              <button
                className="card__item__button card__item__button--cansel"
                onClick={handleCanсelClick}
              >
                {" "}
                Ні
              </button>
            </div>
          )}
        </div>
      </div>

        <div className="foot__item-chart">        
          <FootChart
            width={400}
            height={200}
            data={filteredData}
            selectedMonth={selectedMonth}
            slider={sliderValue.x}
            HandleGraph={HandleGraph}
          />
        </div>
    </div>
  );
};

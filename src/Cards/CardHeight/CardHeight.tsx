import React, { useEffect, useState } from "react";
import { BarChart } from "../../Charts/HeightBarChart/BarChart";
import "./CardHeight.scss";
import { CardTitleTypes, Data } from "../../Shared/types";
import { height, months, sliderRange } from "../../Utils/kit";
import { findTodayMonth } from "../../Shared/servises/findTodayMonth";
import { SliderElement } from "../../Components/SliderElement/SliderElement";
import { SelectionCardBlock } from "../../Components/SelectionCardBlock/SelectionCardBlock";
import { findMaxValue } from "../../Shared/servises/findMaxValue";
import { TitleCardBlock } from "../../Components/CardTitleBlock/TitleCardBlock";
import { ButtonsCardBlock } from "../../Components/ButtonsCardBlock/ButtonsCardBlock";

type Props = {
  data: Data[];
  years: string[];
};

export const CardHeight: React.FC<Props> = ({ data, years }) => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[findTodayMonth()]);
  const [newData, setNewdata] = useState<Data[]>(data);
  const [activeSlider, setActiveSlider] = useState(false);
  const [sliderValue, setSliderValue] = useState({ x: 0 });

  const filteredData = newData.filter((d) => d.year === selectedYear);
  const currentData = filteredData.find((d) => d.month === selectedMonth);
  const maxValue = findMaxValue(filteredData);

  const saveData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }

    const newParametr: Data = {
      id: newData.length + 1,
      year: selectedYear,
      month: selectedMonth,
      value: sliderValue.x,
    };

    if (currentData) {
      const updatedData = newData.map((d, i) =>
        d.id === currentData.id ? { ...d, value: sliderValue.x } : d
      );
      setNewdata(updatedData);
    } else {
      setNewdata([...newData, newParametr]);
    }
    setSliderValue({ x: 0 });
  };

  useEffect(() => {
    setNewdata(data);
  }, [data]);

  const HandleGraph = (d: Data) => {
    setActiveSlider(true);
    setSelectedMonth(d.month);
    if (d.value) {
      setSliderValue({ x: d.value });
    } else {
      setSliderValue({ x: maxValue });
    }
  };

  return (
    <div className="card">
      <div className="card__top">
        <div className="card__leftBlock">
          <TitleCardBlock
            activeSlider={activeSlider}
            currentData={currentData}
            sliderValue={sliderValue}
            maxValue={maxValue}
            image={height}
            title={CardTitleTypes.height}
          />

          <SelectionCardBlock
            selectedYear={selectedYear}
            years={years}
            selectedMonth={selectedMonth}
            setSelectedYear={setSelectedYear}
            setSelectedMonth={setSelectedMonth}
            setActiveSlider={setActiveSlider}
          />
        </div>

        <div className="card__rightBlock">
          {activeSlider && (
            <SliderElement
              setSliderValue={setSliderValue}
              sliderValue={sliderValue}
              range={sliderRange.height}
            />
          )}

          <ButtonsCardBlock
            handleData={saveData}
            value={currentData?.value}
            activeSlider={activeSlider}
            setActiveSlider={setActiveSlider}
            setSliderValue={setSliderValue}
          />
        </div>
      </div>

      <div className="card__chart">
        <BarChart
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

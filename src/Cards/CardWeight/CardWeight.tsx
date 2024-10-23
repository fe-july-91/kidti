import React, { useEffect, useState } from "react";
import { WeightLineChart } from "../../Charts/WeightLineChart/WeightLineChart";
import "./CardWeight.scss";
import { CardTitleTypes, Data } from "../../Shared/types/types";
import { cardSize, months, sliderRange, weight } from "../../Utils/kit";
import { findTodayMonth } from "../../Shared/servises/findTodayMonth";
import { SelectionCardBlock } from "../../Components/SelectionCardBlock/SelectionCardBlock";
import { SliderElement } from "../../Components/SliderElement/SliderElement";
import { findMaxValue } from "../../Shared/servises/findMaxValue";
import { TitleCardBlock } from "../../Components/CardTitleBlock/TitleCardBlock";
import { ButtonsCardBlock } from "../../Components/ButtonsCardBlock/ButtonsCardBlock";

type Props = {
  data: Data[];
  years: string[];
  age?: number;
};

export const CardWeight: React.FC<Props> = ({ data, years }) => {
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
    <div className="weight">
      <div className="weight__top">
        <div className="weight__leftBlock">
          <TitleCardBlock
            activeSlider={activeSlider}
            currentData={currentData}
            sliderValue={sliderValue}
            maxValue={maxValue}
            image={weight}
            title={CardTitleTypes.weight}
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
              range={sliderRange.weight}
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

      <div className="weight__chart">
        <WeightLineChart
          width={cardSize.width}
          height={cardSize.height}
          data={filteredData}
          selectedMonth={selectedMonth}
          slider={sliderValue.x}
          HandleGraph={HandleGraph}
        />
      </div>
    </div>
  );
};

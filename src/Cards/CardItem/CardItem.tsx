import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { BarChart } from "../../Charts/HeightBarChart/BarChart";
import "./CardItem.scss";
import { cardSize, months, sliderRange } from "../../Utils/kit";
import { findTodayMonth } from "../../Shared/servises/findTodayMonth";
import { SliderElement } from "../../Components/SliderElement/SliderElement";
import { SelectionCardBlock } from "../../Components/SelectionCardBlock/SelectionCardBlock";
import { TitleCardBlock } from "../../Components/CardTitleBlock/TitleCardBlock";
import { ButtonsCardBlock } from "../../Components/ButtonsCardBlock/ButtonsCardBlock";
import { findMaxValue } from "../../Shared/servises/findMaxValue";
import { reduser } from "../../Shared/servises/reduser";
import { CardTitleTypes, Data } from "../../Shared/types/types";
import { findCardImage } from "../../Shared/servises/findCardImage";
import { WeightLineChart } from "../../Charts/WeightLineChart/WeightLineChart";
import { FootChart } from "../../Charts/FootLineChart/FootChart";
import { client } from "../../Utils/httpClient";
import { findKeyByValue } from "../../Shared/hendlers/findKeyByValue";


type Props = {
  years: string[];
  cardType: string;
  childId: number
};

export const CardItem: React.FC<Props> = ( {years, cardType, childId }) => {
  const [data, setData] = useState<Data[] | []>([]);
  const [errowMessage, setErrowmessage] = useState("");
  const typeOfValue = findKeyByValue(CardTitleTypes, cardType)

  useEffect(() => {
    client.get<Data[]>(`children/${childId}/${typeOfValue}` )
      .then(response => {
        setData(response)
      })
      .catch(err => setErrowmessage(err.message || "Щось пішло не так"));
  }, [cardType, childId, typeOfValue])

  const initialState = {
    selectedYear: years[0],
    selectedMonth: months[findTodayMonth()],
    data: data
  };
  const [state, dispatch] = useReducer(reduser, initialState);
  const [activeSlider, setActiveSlider] = useState(false);
  const [sliderValue, setSliderValue] = useState({ x: 0 });

  const filteredData = useMemo(() => {
    return state.data.filter((d) => (+d.year) === (+state.selectedYear));
  }, [state.selectedYear, state.data])

  const currentData = useMemo(() => {
    return filteredData.find((d) => d.month === state.selectedMonth);
  }, [state.selectedMonth, filteredData]);

  const maxValue = useMemo(() => {
    return findMaxValue(filteredData);
  }, [filteredData])

  const saveData = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }

    const newParametr: Data = {
      id: state.data.length + 1,
      year: state.selectedYear,
      month: state.selectedMonth,
      value: sliderValue.x,
    };

    if (currentData) {
      const updatedData = state.data.map((d, i) =>
        d.id === currentData?.id ? { ...d, value: sliderValue.x } : d
      );
      dispatch({ type: "data", payload: updatedData });
    } else {
      dispatch({ type: "data", payload: [...state.data, newParametr] });
    }
    setSliderValue({ x: 0 });
  }, [sliderValue.x, currentData, state.data, state.selectedMonth, state.selectedYear]) 

  useEffect(() => {
    dispatch({ type: "data", payload: data });
  }, [data]);

  const HandleGraph = useCallback((d: Data) => {
    setActiveSlider(true);
    dispatch({ type: "selectedMonth", payload: d.month });
    if (d.value) {
      setSliderValue({ x: d.value });
    } else {
      setSliderValue({ x: maxValue });
    }
  }, [maxValue, setActiveSlider, setSliderValue]) 

  return (
    <div className="card">
      <div className="card__top">
      {errowMessage && <div className="form__error">{errowMessage}</div>}
        <div className="card__leftBlock">
          <TitleCardBlock
            activeSlider={activeSlider}
            currentData={currentData}
            sliderValue={sliderValue}
            maxValue={maxValue}
            image={findCardImage(cardType)}
            title={cardType}
          />

          <SelectionCardBlock
            selectedYear={state.selectedYear}
            years={years}
            selectedMonth={state.selectedMonth}
            setSelectedYear={(year) =>
              dispatch({ type: "selectedYear", payload: year })
            }
            setSelectedMonth={(month) =>
              dispatch({ type: "selectedMonth", payload: month })
            }
            setActiveSlider={setActiveSlider}
          />
        </div>

        <div className="card__rightBlock">
          {activeSlider && (
            <SliderElement
              setSliderValue={(value) => setSliderValue(value)}
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
        {cardType === CardTitleTypes.height && 
          <BarChart
          width={cardSize.width}
          height={cardSize.height}
          data={filteredData}
          selectedMonth={state.selectedMonth}
          slider={sliderValue.x}
          HandleGraph={HandleGraph}
        />
        }

        {cardType === CardTitleTypes.weight && 
        <WeightLineChart
          width={cardSize.width}
          height={cardSize.height}
          data={filteredData}
          selectedMonth={state.selectedMonth}
          slider={sliderValue.x}
          HandleGraph={HandleGraph}
        />
        }

        {cardType === CardTitleTypes.foot && 
        <FootChart
          width={cardSize.width}
          height={cardSize.height}
          data={filteredData}
          selectedMonth={state.selectedMonth}
          slider={sliderValue.x}
          HandleGraph={HandleGraph}
        />
        }
        
      </div>
    </div>
  );
};

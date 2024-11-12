import React, { useEffect, useState } from "react";
import { vaccine, vaccinesSelect } from "../../Utils/kit";
import { parse } from "date-fns";
import "./CardVaccines.scss";
import { CardTitleTypes, Child, VaccineData } from "../../Shared/types/types";
import { VaccinesChart } from "../../Charts/VaccinesChart/VaccinesChart";
import { VaccinesMobile } from "../../Charts/VaccinesChartMobile/VaccinesMobile";
import { TitleCardBlock } from "../../Components/CardTitleBlock/TitleCardBlock";
import { VaccineEditBlock } from "../../Components/VaccineEditBlock/VaccineEditBlock";

import vaccinesData from "./../../api/data/Vaccines.json";

type Props = {
  years: string[];
  age?: number;
  child: Child;
};

export const CardVaccines: React.FC<Props> = ({ child }) => {
  const [data, setData] = useState<VaccineData[] | []>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedVaccine, setSelectedVaccine] = useState(vaccinesSelect[0]);
  const [activeVaccine, setActiveVaccine] = useState<VaccineData | null>(null);
  const [newData, setNewdata] = useState<VaccineData[]>(data);
  const [activeBatton, setActiveButton] = useState(false);
  const [newParametrs, setNewParametrs] = useState<VaccineData | null>(null);

  useEffect(() => {
    setData(vaccinesData);
  }, []);

  const HandleGraph = (v: VaccineData) => {
    if (v === activeVaccine) {
      setActiveButton(false);
      setActiveVaccine(null);
    } else {
      setActiveVaccine(v);
      setActiveButton(true);
      setSelectedVaccine(v.type);
      setNewParametrs(null);
      if (v.date) {
        const parsedDate = parse(v.date, "dd.MM.yyyy", new Date());
        setSelectedDate(new Date(parsedDate));
      }
    }
  };

  const handleVaccineclick = (vaccineType: string) => {
    setSelectedVaccine(vaccineType);
    setSelectedDate(new Date());
    setActiveButton(true);
  };

  return (
    <div className="vaccine">
      <div className="vaccine__top">
        <TitleCardBlock image={vaccine} title={CardTitleTypes.vactination} />

        <div className="vaccine--chart-mobile">
          <VaccinesMobile
            width={500}
            height={360}
            data={newData}
            activeVaccine={activeVaccine}
            selectedVaccine={selectedVaccine}
            newVaccine={newParametrs}
            birth={child.birth}
            HandleGraph={HandleGraph}
            activeBatton={activeBatton}
            handleVaccineclick={handleVaccineclick}
          />
        </div>

        <VaccineEditBlock
          activeVaccine={activeVaccine}
          activeBatton={activeBatton}
          selectedVaccine={selectedVaccine}
          setStartDate={setSelectedDate}
          startDate={selectedDate}
          setActiveButton={setActiveButton}
          setNewParametrs={setNewParametrs}
          setSelectedVaccine={setSelectedVaccine}
          setNewdata={setNewdata}
          setActiveVaccine={setActiveVaccine}
        />
      </div>

      <div className="vaccine--chart">
        <VaccinesChart
          width={800}
          height={360}
          data={newData}
          activeVaccine={activeVaccine}
          selectedVaccine={selectedVaccine}
          newVaccine={newParametrs}
          birth={child.birth}
          HandleGraph={HandleGraph}
          activeBatton={activeBatton}
          handleVaccineclick={handleVaccineclick}
        />
      </div>
    </div>
  );
};

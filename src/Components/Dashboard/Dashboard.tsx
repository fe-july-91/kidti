import React, { useEffect, useState } from 'react';
import { Child, ChildData, Data, Eye, EyesData, VaccineData, VaccinesData, YearlyMeasurementData } from '../../Shared/types';
import './Dashboard.scss';
import { CardWeight } from "../../Components/CardWeight/CardWeight";
import { CardHeight } from "../../Components/CardHeight/CardHeight";
import { 
  GetMeasurementdata, 
  getData,
} from "./../../Utils/httpClient";
import { CardFoot } from '../CardFoot copy/CardFoot';
import { CardEyes } from '../CardEyes/CardEyes';
import { calculateChildAge, generateYearArray } from '../../Shared/hendlers/generateYearArray';
import { CardVaccines } from '../CardVaccines/CardVaccines';

type Props = {
  child: Child;
}

export const Dashboard: React.FC<Props> = ({ child }) => {

  const [heightData, setHeightData] = useState<Data[]>([]);
  const [weightData, setWeightData] = useState<Data[]>([]);
  const [footData, setFootData] = useState<Data[]>([]);
  const [vaccinesData, setVaccinesData] = useState<VaccineData[]>([]);
  const [eyesData, setEyesData] = useState<Eye>({ left: 1, right: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const ChildCard: ChildData = await getData(`/ChildData_${child.id}.json`);

      const heightCard = ChildCard.find(item => item.type === "height")! as YearlyMeasurementData;
      const weightCard = ChildCard.find(item => item.type === "weight") as YearlyMeasurementData;
      const footCard = ChildCard.find(item => item.type === "foot") as YearlyMeasurementData;
      const eyeCard = ChildCard.find(item => item.type === "eyes") as EyesData;
      const vaccinesCard = ChildCard.find(item => item.type === "vaccines") as VaccinesData;


      setHeightData(GetMeasurementdata(heightCard));
      setWeightData(GetMeasurementdata(weightCard));
      setFootData(GetMeasurementdata(footCard));
      setEyesData(eyeCard.data);
      setVaccinesData(vaccinesCard.data);
    };

    fetchData();
  }, [child.id]);



  const birthYear = child.birth.split(".")[2];

  const years = generateYearArray(birthYear).reverse();
  const age = calculateChildAge(birthYear);

  return (
    <div className="dashboard">
      <div className="dashboard__item">
        <CardHeight data={heightData} years={years} age={age} />
      </div>
      <div className="dashboard__item">
        <CardWeight data={weightData} years={years} age={age} />
      </div>
      <div className="dashboard__item">
      <CardFoot data={footData} years={years} age={age} />
      </div>
      <div className="dashboard__item">
      <CardEyes data={eyesData}/>
      </div>
      <div className="dashboard__item dashboard__item-big">
        <CardVaccines
          data={vaccinesData}
          years={years}
          age={age}
          child={child}
        />
      </div>
    </div>
  )
}
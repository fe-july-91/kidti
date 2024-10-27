import { CardTitleTypes, Child, Data, Eye, VaccineData } from "../../Shared/types/types";
import "./Dashboard.scss";
import { CardEyes } from "../../Cards/CardEyes/CardEyes";
import {
  calculateChildAge,
  generateYearArray,
} from "../../Shared/hendlers/generateYearArray";
import { CardVaccines } from "../../Cards/CardVaccines/CardVaccines";
import { useMemo } from "react";
import { CardItem } from "../../Cards/CardItem/CardItem";

type Props = {
  child: Child;
  heightData: Data[];
  weightData: Data[];
  footData: Data[];
  vaccinesData: VaccineData[];
  eyesData: Eye;
};

export const Dashboard: React.FC<Props> = ({
  child,
  heightData,
  weightData,
  footData,
  vaccinesData,
  eyesData,
}) => {
  const years = useMemo(() => generateYearArray(child.birth), [child]);
  const age = useMemo(() => calculateChildAge(child.birth), [child]);

  return (
    <div className="dashboard">
      <div className="dashboard__item">
        <CardItem data={heightData} years={years} cardType={CardTitleTypes.height} />
      </div>
      <div className="dashboard__item">
        <CardItem data={weightData} years={years} cardType={CardTitleTypes.weight} />
      </div>
      <div className="dashboard__item">
        <CardItem data={footData} years={years} cardType={CardTitleTypes.foot} />
      </div>
      <div className="dashboard__item">
        <CardEyes data={eyesData} />
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
  );
};

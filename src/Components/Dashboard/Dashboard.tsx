import { Child, Data, Eye, VaccineData } from "../../Shared/types/types";
import "./Dashboard.scss";
import { CardWeight } from "../../Cards/CardWeight/CardWeight";
import { CardHeight } from "../../Cards/CardHeight/CardHeight";
import { CardFoot } from "../../Cards/CardFoot copy/CardFoot";
import { CardEyes } from "../../Cards/CardEyes/CardEyes";
import {
  calculateChildAge,
  generateYearArray,
} from "../../Shared/hendlers/generateYearArray";
import { CardVaccines } from "../../Cards/CardVaccines/CardVaccines";
import { useMemo } from "react";

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
        <CardHeight data={heightData} years={years} />
      </div>
      <div className="dashboard__item">
        <CardWeight data={weightData} years={years} />
      </div>
      <div className="dashboard__item">
        <CardFoot data={footData} years={years} />
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

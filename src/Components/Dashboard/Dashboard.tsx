import { CardTitleTypes, Child } from "../../Shared/types/types";
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
};

export const Dashboard: React.FC<Props> = ({ child }) => {

  const years = useMemo(() => generateYearArray(child.birth), [child]);
  const age = useMemo(() => calculateChildAge(child.birth), [child]);

  return (
    <div className="dashboard">
      <div className="dashboard__item">
        <CardItem years={years} cardType={CardTitleTypes.height} />
      </div>
      <div className="dashboard__item">
        <CardItem years={years} cardType={CardTitleTypes.weight} />
      </div>
      <div className="dashboard__item">
        <CardItem years={years} cardType={CardTitleTypes.foot} />
      </div>
      <div className="dashboard__item">
        <CardEyes />
      </div>
      <div className="dashboard__item dashboard__item-big">
        <CardVaccines
          years={years}
          age={age}
          child={child}
        />
      </div>
    </div>
  );
};

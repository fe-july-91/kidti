import { parseDate } from "../../Shared/hendlers/parseDate";
import { updateVaccines } from "../../Shared/servises/updateVaccines";
import { VaccineData } from "../../Shared/types";
import { vaccinesSelect } from "../../Utils/kit";

type Props = {
  activeVaccine: VaccineData | null;
  activeBatton: boolean;
  selectedVaccine: string;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  startDate: Date;
  setActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
  setNewParametrs: React.Dispatch<React.SetStateAction<VaccineData | null>>;
  setSelectedVaccine: React.Dispatch<React.SetStateAction<string>>;
  setNewdata: React.Dispatch<React.SetStateAction<VaccineData[]>>;
  setActiveVaccine: React.Dispatch<React.SetStateAction<VaccineData | null>>;
}

export const VaccineEditBlock: React.FC<Props> = ({
  activeVaccine,
  activeBatton,
  selectedVaccine,
  setStartDate,
  startDate,
  setActiveButton,
  setNewParametrs,
  setSelectedVaccine,
  setNewdata,
  setActiveVaccine

}) => {

    const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setActiveButton(true);
    setNewParametrs(null);
  };

  const handleApplyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    saveData(e);
    setActiveButton(false);
  };

  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setNewdata((currentData) => {
      const newSetOfVaccines = currentData
        .filter((v) => v.type === activeVaccine?.type)
        .filter((v) => v !== activeVaccine)
        .sort(
          (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
        )
        .map((v, i) => ({ ...v, orderNumber: i + 1 }));

      const filteredVaccinesWithoutNewType = currentData.filter(
        (v) => v.type !== activeVaccine?.type
      );
      return [...filteredVaccinesWithoutNewType, ...newSetOfVaccines];
    });

    setActiveVaccine(null);
    setActiveButton(false);
    setSelectedVaccine(vaccinesSelect[0]);
    setStartDate(new Date());
  };

  const handleVaccineChenge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVaccine(event.target.value);
  };

  const formattedDate = startDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const saveData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    const newParametrs: VaccineData = {
      type: selectedVaccine,
      orderNumber: 0,
      date: formattedDate,
    };
    if (activeVaccine) {
      setNewdata((currentData) =>
        currentData.map((v) =>
          v === activeVaccine ? { ...v, date: formattedDate } : v
        )
      );
    } else {
      setNewdata((currentData: VaccineData[]) => {
        const filteredNewTypeVaccines = currentData.filter(
          (v) => v.type === newParametrs.type
        );
        const filteredVaccinesWithoutNewType = currentData.filter(
          (v) => v.type !== newParametrs.type
        );
        const newSetOfVaccines = updateVaccines(
          newParametrs,
          filteredNewTypeVaccines
        );
        return [...filteredVaccinesWithoutNewType, ...newSetOfVaccines];
      });
    }

    setNewParametrs(newParametrs);
    setActiveVaccine(null);
    setSelectedVaccine(vaccinesSelect[0]);
    setStartDate(new Date());
  };

  return (
    <div className="vaccine__top--rightBlock">
    {!activeVaccine && !activeBatton ? (
      <button
        className="vaccine__top__button edit-button"
        onClick={handleEditClick}
      >
        Редагувати
      </button>
    ) : (
      <>
        <div className="vaccine__top--picker">
          {!activeVaccine ? (
            <select
              className="vaccine__top--selectVaccine"
              value={selectedVaccine}
              onChange={handleVaccineChenge}
            >
              {vaccinesSelect.map((vaccine) => (
                <option key={vaccine} value={vaccine}>
                  {vaccine}
                </option>
              ))}
            </select>
            ) : (
              <span className="vaccine__top--type">{selectedVaccine}</span>
            )}

          <input
            type="date"
            className="vaccine__top--selectDate"
            value={startDate.toISOString().split("T")[0]} // yyyy-mm-dd
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              setStartDate(newDate);
            }}
          />
        </div>

        <div className="vaccine__top__button__container">
          <button
            className="vaccine__top__button vaccine__top__button--add"
            onClick={handleApplyClick}
          >
            {activeVaccine ? `Зберегти` : `Додати`}
          </button>
          <button
            className="vaccine__top__button vaccine__top__button--cancel"
            onClick={handleRemoveClick}
          >
            {" "}
            {activeVaccine ? `Видалити` : `Скасувати`}
          </button>
        </div>
      </>
    )}
  </div>
  )
}
import {
  EyesData,
  VaccinesData,
  YearlyMeasurementData,
} from "../Shared/types/types";

const BASE_URL = "https://fe-july-91.github.io/kidti/api";

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then((response) => response.json());
}

export function getChildData() {
  return getData<(YearlyMeasurementData | EyesData | VaccinesData)[]>(
    "/ChildData_1.json"
  ).then((childData) => childData);
}

export function getCardsData(name: string) {
  return getChildData().then((childData) =>
    childData.find((item) => item.type === name)
  );
}

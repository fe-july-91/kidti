import { EyesData, VaccinesData, YearlyMeasurementData } from '../Shared/types';

const BASE_URL = './../api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => response.json());
}

export function getChildData() {
return getData<(YearlyMeasurementData | EyesData | VaccinesData)[]>("/ChildData_1.json")
.then(childData => childData);
}

export function getCardsData(name: string) {
  return getChildData().then(childData =>
    childData.find(item => item.type === name)
  );
}

export function getParametr(name: string, data : (YearlyMeasurementData | EyesData | VaccinesData)[]) {
    return data.find(item => item.type === name
  );
}

  // const heightCard = ChildCard.find(item => item.type === "height") as YearlyMeasurementData;
  // const weightCard = ChildCard.find(item => item.type === "weight") as YearlyMeasurementData;
  // const footCard = ChildCard.find(item => item.type === "foot") as YearlyMeasurementData;
  // const eyeCard = ChildCard.find(item => item.type === "eyes") as EyesData;
  // const vaccinesCard = ChildCard.find(item => item.type === "vaccines") as VaccinesData;

export const GetMeasurementdata = (objectValues: YearlyMeasurementData) => {
    const result = objectValues.data.flatMap(item => {
      return Object.entries(item.MONTH).map(([month, value]) => {
        return { year: item.YEAR, month, value };
      });
    });
    return result;
}

export const GetEyeData = (objectValues: EyesData) => {
  if (!objectValues) {
    throw new Error("Eye data is undefined!");
  }
  return  {left: objectValues.data.left, right: objectValues.data.right}
}

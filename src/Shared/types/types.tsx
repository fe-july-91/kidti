
export type Data = {
  id: number;
  year: string;
  month: string;
  value: number;
}


export interface YearlyMeasurementData {
  type: "weight" | "height" | "foot";
  data: Data[];
}

export type Eye = {
  left: number;
  right: number
}

export interface EyesData {
  type: string;
  data: Eye
};

export type VaccineData = {
  type: string;
  orderNumber: number;
  date: string;
}

export type VaccinesData = {
  type: string;
  data: VaccineData[];

}
export type ChildData = (YearlyMeasurementData | EyesData | VaccinesData)[];

export type Child = {
  id: number;
  name: string;
  surname: string;
  parent: string;
  birth: string;
  gender: string;
  image: number;
};

export enum CardTitleTypes {
  height = 'Зріст',
  weight = 'Вага',
  foot = 'Стопа',
  eyes = 'Зір',
  vactination = 'Щеплення',
}
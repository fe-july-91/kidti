interface MonthData {
  [key: string]: number; // e.g., "Січень": 12, "Лютий": 0, etc.
}

interface YearData {
  YEAR: string;
  MONTH: MonthData;
}

export interface YearlyMeasurementData {
  type: "weight" | "height" | "foot";
  data: YearData[];
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
  parent: string;
  birth: string;
  image: number;
};

export type Data = {
  year: string;
  month: string;
  value: number;
}


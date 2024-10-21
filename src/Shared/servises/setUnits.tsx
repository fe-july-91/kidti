import { CardTitleTypes } from "../types";

export const setUnits = (title: string) => {
  switch (title) {
    case CardTitleTypes.foot:
    case CardTitleTypes.height:
      return "см";
    case CardTitleTypes.weight:
      return "кг";
    default:
      return '';
  }
}
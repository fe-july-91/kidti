export function generateYearArray(startYear) {
  const today = new Date();

  const endYear = today.toLocaleDateString("ukr-GB", {
    year: "numeric"});

  const yearArray = [];
  for (let year = startYear; year <= endYear; year++) {
    yearArray.push(year.toString());
  }
  return yearArray;
};

export function calculateChildAge(birthYear) {
  const today = new Date();
  const currentYear = today.toLocaleDateString("ukr-GB", {
    year: "numeric"});
  return currentYear - birthYear;
};

export function calculateFullChildAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }

  if (today.getDate() < birth.getDate()) {
    months--;
  }

  return {
    years,
    months: months < 0 ? months + 12 : months
  };
};

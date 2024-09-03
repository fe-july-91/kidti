export function generateYearArray(startYear: string) {
  const today = new Date();

  const endYear: string = today.toLocaleDateString("ukr-GB", {
    year: "numeric"});

  const yearArray = [];
  for (let year = +startYear; +year <= +endYear; year++) {
    yearArray.push(year.toString());
  }
  return yearArray;
};

export function calculateChildAge(birthYear: string) {
  const today = new Date();
  const currentYear: string = today.toLocaleDateString("ukr-GB", {
    year: "numeric"});
  return +currentYear - +birthYear;
};

export function calculateFullChildAge(birthDate: string) {
  const [day, month, year] = birthDate.split('.').map(Number);
  
  const birth = new Date(year, month - 1, day);

  const today = new Date();
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }


  return {
    years: years,
    months: months,
    days: days
  };
}
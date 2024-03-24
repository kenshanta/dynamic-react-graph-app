export function getYearlyQuarters(from?: string, to?: string): string[] {
  const getCurrentQuarter = (): string => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const quarter = Math.ceil(currentMonth / 3);

    return `${currentYear}K${quarter}`;
  };

  const formatQuarter = (year: number, quarter: number): string => {
    return `${year}K${quarter}`;
  };

  const isValidFormat = (quarterStr: string): boolean => {
    const regex = /^\d{4}K[1-4]$/;
    return regex.test(quarterStr);
  };

  const fromQuarter = from && isValidFormat(from) ? from : "2009K1";
  const toQuarter = to && isValidFormat(to) ? to : getCurrentQuarter();

  if (fromQuarter > toQuarter) {
    throw new Error(
      'Invalid range: "from" quarter must be before or equal to "to" quarter.',
    );
  }

  const quarters: string[] = [];
  const fromYear = parseInt(fromQuarter.slice(0, 4), 10);
  let fromQuarterNum = parseInt(fromQuarter.slice(-1), 10);
  const toYear = parseInt(toQuarter.slice(0, 4), 10);
  const toQuarterNum = parseInt(toQuarter.slice(-1), 10);

  for (let year = fromYear; year <= toYear; year++) {
    for (
      let quarter = fromQuarterNum;
      quarter <= (year === toYear ? toQuarterNum : 4);
      quarter++
    ) {
      quarters.push(formatQuarter(year, quarter));
    }
    fromQuarterNum = 1;
  }

  return quarters;
}

export function createQuarterToNumberMap(quarters: string[]): {
  [key: string]: number;
} {
  const map: { [key: string]: number } = {};
  let counter = 0;

  quarters.forEach((quarter) => {
    map[quarter] = counter;
    counter++;
  });

  return map;
}

export function createNumberToQuarterMap(quarters: number[]) {
  const counter: string[] = [];
  const allQuarters = getYearlyQuarters();

  quarters.forEach((quarter) => {
    counter.push(allQuarters[quarter]);
  });

  return counter;
}

export function getHouseName(value: string) {
  const allHouses = new Map([
    ["00", "Housing in total"],
    ["02", "Small house"],
    ["03", "Block apartments"],
  ]);

  return allHouses.get(value);
}

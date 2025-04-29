export interface YearRange {
  start: number;
  end: number;
}

export interface FilterEvent {
  selectedCountries: string[];
  selectedStatuses: string[];
  selectedYearRange?: YearRange;
}

export interface RESTCountry {
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  landlocked: boolean;
  borders?: string[];
  area: number;
  maps: Maps;
  population: number;
  car: Car;
  timezones: string[];
  continents: string[];
  flag: string;
  name: Name;
  currencies: { [key: string]: Currency };
  languages: Languages;
  latlng: number[];
  demonyms: Demonyms;
  translations: { [key: string]: Translation };
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
  cioc?: string;
  fifa?: string;
  gini?: { [key: string]: number };
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side: string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Currency {
  symbol: string;
  name: string;
}

export interface Demonyms {
  eng: Eng;
  fra: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Languages {
  ber?: string;
  mey?: string;
  spa?: string;
  bjz?: string;
  eng?: string;
  hin?: string;
  tam?: string;
  fin?: string;
  swe?: string;
  fra?: string;
  nrf?: string;
  deu?: string;
  nld?: string;
  mri?: string;
  nzs?: string;
  cat?: string;
  srp?: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: null | string;
  regex: null | string;
}

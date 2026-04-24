import { Component, output, signal } from '@angular/core';

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-buttons-search',
  imports: [],
  templateUrl: './buttons-search.component.html',
  styleUrl: './buttons-search.component.css',
})
export class ButtonsSearchComponent {
  regionSelected = output<string>();
  selectedRegion = signal<Region | null>(null);

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  emit(value: Region) {
    this.regionSelected.emit(value);
    this.selectedRegion.set(value);
  }
}

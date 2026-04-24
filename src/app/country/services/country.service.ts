import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import {
  catchError,
  count,
  delay,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
      ),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError(() => {
        return throwError(
          () => new Error('No se pueden obtener paises con ese filtro'),
        );
      }),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
      ),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(3000),
      catchError(() => {
        return throwError(
          () => new Error('No se pueden obtener paises con ese filtro'),
        );
      }),
    );
  }

  searchByRegion(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheRegion.has(query)) {
      return of(this.queryCacheRegion.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
      ),
      tap((countries) => this.queryCacheRegion.set(query, countries)),
      delay(3000),
      catchError(() => {
        return throwError(
          () => new Error('No se pueden obtener paises con ese filtro'),
        );
      }),
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
      ),
      map((countries) => {
        const country = countries.at(0);
        if (!country) throw new Error('País no encontrado');
        return country;
      }),
      catchError(() => {
        return throwError(
          () => new Error('No se pueden obtener paises con ese código'),
        );
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainStat,DetailedStat } from 'src/Models/model'
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  api = 'https://covid19.mathdro.id/api';

  constructor( private http : HttpClient) { 
    
  }
  getCountries() {
    return this.http.get(`${this.api}/countries/morocco/confirmed`);
  }

  getMainStats() {
    return this.http.get(`${this.api}`).pipe(
      map((item: any) => ({
        ...item,
        cases: item.confirmed.value,
        deaths: item.deaths.value,
        recovered: item.recovered.value
      })));
  }

  getMainStatsByCountries(country: string) {
    return this.http.get(`${this.api}/countries/${country}`).pipe(
      map((item: any) => ({
        ...item,
        cases: item.confirmed.value,
        deaths: item.deaths.value,
        recovered: item.recovered.value
      }))
    );
  }
  getDetailedStatsByCountries(country: string): Observable<DetailedStat> {
    return this.http.get(`${this.api}/countries/${country}/confirmed`).pipe(
      map((list: any) =>
        list.map(item =>
          ({
            ...item,
            todayCases: '',
            cases: item.confirmed,
            todayDeaths: '',
            country: item.provinceState ? `${item.countryRegion} - ${item.provinceState}` : `${item.countryRegion}`,
            deathRate: ((item.deaths / item.confirmed) * 100).toFixed(1),
            recoveredRate: ((item.recovered / item.confirmed) * 100).toFixed(1)
          })))
    );
  }
  }

 

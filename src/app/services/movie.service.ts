import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
// import { env } from "process";
// import { env } from "process";
// const process = require('process');
// Typescript custom enum for search types (optional)
/* tslint:disable */
// @ts-nocheck
import { environment } from "../../environments/environment";
/* tslint:enable */

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {  
  url = 'http://www.omdbapi.com/';
  /* tslint:disable */
  // @ts-nocheck
  apiKey = environment.OMDB_API_KEY;
  /* tslint:disable */

  constructor(private http: HttpClient) { 
  }
  

    /**
  * Get data from the OmdbApi 
  * map the result to return only the results that we need
  * 
  * @param {string} title Search Term
  * @param {SearchType} type movie, series, episode or empty
  * @returns Observable with the search results
  */
     searchData(title: string, type: SearchType): Observable<any> {
      return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
        map(results => results['Search'])
      );
    }
   
    /**
    * Get the detailed information for an ID using the "i" parameter
    * 
    * @param {string} id imdbID to retrieve information
    * @returns Observable with detailed information
    */
    getDetails(id) {
      return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
    }
}

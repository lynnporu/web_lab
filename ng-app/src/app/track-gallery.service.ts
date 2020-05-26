import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { PROFILE_TRACKS, ALL_TRACKS } from './mock-tracks';
import { Track } from './track';

@Injectable({
  providedIn: 'root'
})
export class TrackGalleryService {

  constructor() { }

  getTracks(source) : Observable<Track[]> {
  	switch(source){
  		case 'profile':
  			return of(PROFILE_TRACKS); break;
  		case 'all':
  			return of(ALL_TRACKS); break;
  	}
  }

}
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { TRACKS } from './mock-tracks';
import { Track } from './track';

@Injectable({
  providedIn: 'root'
})
export class TrackGalleryService {

  constructor() { }

  getTracks() : Observable<Track[]> {
    return of(TRACKS);
  }

}
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Track } from './track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  name: string;
  author: string;
  duration: number;

  constructor() { }

  setName(name) {
    this.name = name;
  }

  setAuthor(author) {
    this.author = author;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  getTracks(): Observable<Track[]> {

    return of([
        {
            name: 'Magiia', author: '5 Vymir', duration: 200
        }
    ]);

  }

}

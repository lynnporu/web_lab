import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { PLAYLISTS } from './mock-playlists';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistGalleryService {

  constructor() { }

  getPlaylists() : Observable<Playlist[]> {
  	return of(PLAYLISTS);
  }

}
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { PROFILE_PLAYLISTS, ALL_PLAYLISTS } from './mock-playlists';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistGalleryService {

  constructor() { }

  getPlaylists(source) : Observable<Playlist[]> {
  	switch(source){
  		case 'profile':
  			return of(PROFILE_PLAYLISTS); break;
  		case 'all':
  			return of(ALL_PLAYLISTS); break;
  	}
  }

}
import { Injectable } from '@angular/core';

import { Global } from './global';

import { Observable, of } from 'rxjs';
import { PROFILE_PLAYLISTS, ALL_PLAYLISTS } from './mock-playlists';
import { Playlist } from './playlist';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistGalleryService {

  private profilePlaylistsRoute = "http://localhost:8080/api/v1/playlist?source=profile";
  private allPlaylistsRoute = "http://localhost:8080/api/v1/playlist";

  constructor(
    private http: HttpClient
  ) { }

  getPlaylists(source, limit) {
    switch(source){
      case 'profile':
        return this.http.get(this.profilePlaylistsRoute + "&limit=" + limit + "&token=" + Global.auth_token);
        break;
      case 'all':
        return this.http.get(this.allPlaylistsRoute + "?limit=" + limit + "&token=" + Global.auth_token);
        break;
    }
  }

}
import { Injectable } from '@angular/core';

import { Global } from './global';

import { Observable, of } from 'rxjs';
import { PROFILE_TRACKS, ALL_TRACKS } from './mock-tracks';
import { Track } from './track';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackGalleryService {

  private profileTracksRoute = "http://localhost:8080/api/v1/music?source=profile";
  private allTracksRoute = "http://localhost:8080/api/v1/music";
  private deleteTrackRoute = "http://localhost:8080/api/v1/music?id=";
  private deletePlaylistTrackRoute = "http://localhost:8080/api/v1/music?id=";
  private addPlaylistTrackRoute = "http://localhost:8080/api/v1/playlist/";

  constructor(
    private http: HttpClient
  ) { }

  getTracks(source) {
    switch(source){
      case 'profile':
        return this.http.get(this.profileTracksRoute + "&token=" + Global.auth_token);
        break;
      case 'all':
        return this.http.get(this.allTracksRoute + "?token=" + Global.auth_token);
        break;
    }
  }

  deleteTrack(id: string) {
    return this.http.delete(this.deleteTrackRoute + id + "&token=" + Global.auth_token);
  }

  deletePlaylistTrack(track_id: string, playlist_id: string) {
    return this.http.delete(
      this.deletePlaylistTrackRoute + track_id +
      "&playlist=" + playlist_id +
      "&token=" + Global.auth_token);
  }

  addTrackToPlaylist(track_id, playlist_id) {
    return this.http.post(
      this.addPlaylistTrackRoute + playlist_id + "?track=" +
      track_id + "&token=" + Global.auth_token,
      null
    );
  }

}
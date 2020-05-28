import { Injectable } from '@angular/core';

import { Global } from './global';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlaylistPageService {

  private playlistRoute = "http://localhost:8080/api/v1/playlist/";

  constructor(
    private http: HttpClient
  ) { }

  getPlaylist(id: string) {
    return this.http.get(this.playlistRoute + id + '?token=' + Global.auth_token);
  }

}

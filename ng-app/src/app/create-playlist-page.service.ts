import { Injectable } from '@angular/core';

import { Global } from './global';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreatePlaylistPageService {

  uploadPlaylistRoute = "http://localhost:8080/playlist?";

  constructor(
    private http: HttpClient
  ) { }

  uploadPlaylist(file, name) {

    let form = new FormData();
    form.append("photo", file);

    return this.http.post(
      this.uploadPlaylistRoute +
      "token=" + Global.auth_token + "&" +
      "name=" + name,
      form
    );

  }

}

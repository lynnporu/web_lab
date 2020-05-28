import { Injectable } from '@angular/core';

import { Global } from './global';

import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Track } from './track';

@Injectable({
  providedIn: 'root'
})
export class UploadTrackPageService {

  private uploadTrackRoute = "http://localhost:8080/api/v1/music?";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  uploadTrack(file, name, author) {
    let form = new FormData();
    form.append("file",file);
    let response =  this.http.post(
      this.uploadTrackRoute +
      "name=" + name + "&" +
      "author=" + author + "&" +
      "token=" + Global.auth_token,
      form
    );
    this.router.navigate(['/tracks']);
    return response;
  }

}

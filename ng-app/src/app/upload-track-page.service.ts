import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Track } from './track';

@Injectable({
  providedIn: 'root'
})
export class UploadTrackPageService {

  private uploadTrackRoute = "api/v1/music";

  constructor(
    private http: HttpClient
  ) { }

  uploadTrack(file, name, author) {
    let form = new FormData();
    form.append("file",file);
    return this.http.post(
      "/api/v1/music?" +
      "token=" + "0" + "&" +
      "name=" + name + "&" +
      "author=" + author,
      form
    );
  }

}

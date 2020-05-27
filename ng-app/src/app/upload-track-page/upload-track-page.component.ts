import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-track-page',
  templateUrl: './upload-track-page.component.html',
  styleUrls: ['./upload-track-page.component.scss']
})
export class UploadTrackPageComponent implements OnInit {

  isDisabled = true;
  trackFile = undefined;
  trackName = undefined;
  trackAuthor = undefined;

  constructor() { }

  ngOnInit(): void {
  }

  chooseFile(e) {
    this.trackFile = e.target.files;
    this.isDisabled = false;
  }

  uploadFile(e) {
    if(e.target.classList.contains('disabled')) return false;

    let form = new FormData();
    form.append("file", this.trackFile);
    this.http.post(
      "/api/v1/music?" +
      "token=" + "0" + "&" +
      "name=" + this.trackName + "&" +
      "author=" + this.trackAuthor
    ).subscribe((response) => {
      alert(response);
    });
  }

}

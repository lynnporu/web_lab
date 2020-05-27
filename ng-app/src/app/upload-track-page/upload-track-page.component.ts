import { Component, OnInit } from '@angular/core';

import { UploadTrackPageService } from '../upload-track-page.service';

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

  constructor(
    public uploadTrackPageService: UploadTrackPageService
  ) { }

  ngOnInit(): void {
  }

  chooseFile(e) {
    this.trackFile = e.target.files;
    this.isDisabled = false;
  }

  uploadFile(e) {
    if(e.target.classList.contains('disabled')) return false;

    this.uploadTrackPageService.uploadTrack(
        this.trackFile,
        this.trackName,
        this.trackAuthor
    ).subscribe((response) => {
      console.log(response);
    });
  }

}

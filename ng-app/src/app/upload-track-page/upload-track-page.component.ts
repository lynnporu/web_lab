import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

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
    public uploadTrackPageService: UploadTrackPageService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  chooseFile(e) {
    this.trackFile = e.target.files;
    this.isDisabled = false;
  }

  uploadFile(e) {
    if(this.isDisabled) return false;

    this.uploadTrackPageService.uploadTrack(
        this.trackFile,
        this.trackName,
        this.trackAuthor
    ).subscribe(
      (response) => this.router.navigate(['/tracks'])
    );
  }

}

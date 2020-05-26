import { Component, OnInit } from '@angular/core';

import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit {

  faCloudUploadAlt = faCloudUploadAlt;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { faPlay,
         faPause,
         faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { TrackService } from '../track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  faPlay = faPlay;
  faPause = faPause;
  faEllipsisH = faEllipsisH;

  constructor(public trackService: TrackService) { }

  ngOnInit(): void {
  }

}

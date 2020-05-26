import { Component, OnInit, Input } from '@angular/core';
import { faPlay,
         faPause,
         faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Track } from '../track';
import { TrackGalleryService } from '../track-gallery.service';

@Component({
  selector: 'app-track-gallery',
  templateUrl: './track-gallery.component.html',
  styleUrls: ['./track-gallery.component.scss']
})
export class TrackGalleryComponent implements OnInit {

  faPlay = faPlay;
  faPause = faPause;
  faEllipsisH = faEllipsisH;

  tracks: Track[];

  @Input() source: string;

  constructor(public trackGalleryService: TrackGalleryService) { }

  ngOnInit(): void {
  	this.getTracks();
  }

  getTracks(): void {
  	this.trackGalleryService.getTracks(this.source)
  		.subscribe(tracks => this.tracks = tracks);
  }

}

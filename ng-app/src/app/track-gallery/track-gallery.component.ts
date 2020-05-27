import { Component, OnInit, Input } from '@angular/core';
import { faPlay,
         faPause,
         faEllipsisH,
         faTimes } from '@fortawesome/free-solid-svg-icons';
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
  faTimes = faTimes;

  tracks: Track[];

  @Input() source: string;
  @Input() controls: string;

  constructor(public trackGalleryService: TrackGalleryService) { }

  deleteTrack(track: Track): void {
    this.tracks = this.tracks.filter(
      item => item.id !== track.id);
  }

  ngOnInit(): void {
    if(!this.controls) this.controls = 'simple';
  	this.getTracks();
  }

  getTracks(): void {
  	this.trackGalleryService.getTracks(this.source)
  		.subscribe(tracks => this.tracks = tracks);
  }

}

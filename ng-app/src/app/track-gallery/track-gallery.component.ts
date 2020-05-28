import { Component, OnInit, Input } from '@angular/core';
import { faPlay,
         faPause,
         faEllipsisH,
         faTimes } from '@fortawesome/free-solid-svg-icons';
import { Track } from '../track';
import { TrackGalleryService } from '../track-gallery.service';

import { Global } from '../global';

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
    if(this.source == 'global') {
      Global.tracks_thread.subscribe((response) => {
        this.trackGalleryService.deletePlaylistTrack(
          response['response']['id'],
          track.id
        );
      });
    } else {
      this.trackGalleryService.deleteTrack(track.id).subscribe(
        response => console.log('deleted'));
    }
    this.tracks = this.tracks.filter(
      item => item.id !== track.id);
  }

  ngOnInit(): void {
    if(!this.controls) this.controls = 'simple';
  	this.getTracks();
  }

  getTracks(): void {
    if(this.source == 'global'){
      Global.tracks_thread.subscribe((response) => {
        this.tracks = response['response']['tracks'];
      });
    }
  	this.trackGalleryService.getTracks(this.source).subscribe(
      (response) => this.tracks = response["response"]
    );
  }

  toTimeString(duration) {
    let num_minutes = Math.floor(duration / 60);
    let num_seconds = duration % 60;
    let str_minutes = num_minutes.toString();
    let str_seconds = num_seconds.toString();
    if(num_minutes < 10) str_minutes = "0" + str_minutes;
    if(num_seconds < 10) str_seconds = "0" + str_seconds;
    return str_minutes + ":" + str_seconds;
  }

}

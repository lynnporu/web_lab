import { Component, OnInit } from '@angular/core';
import { faPlay,
         faPause,
         faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { Global } from '../global';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  faPlay = faPlay;
  faPause = faPause;
  faEllipsisH = faEllipsisH;

  isPlaying = false;

  trackId = undefined;
  trackAuthor = undefined;
  trackName = undefined;
  trackDurationSec = undefined;
  trackLast = undefined;
  trackUrl = undefined;
  trackObj = undefined;

  percentCompleted = 0;

  isHidden = true;

  constructor() { }

  ngOnInit(): void {
    Global.player = this;
    this.trackObj = new Audio();
    this.trackObj.ontimeupdate = e => {
      this.updateBullet();
    }
  }

  show() {
    this.isHidden = false;
  }

  hide() {
    this.isHidden = true;
  }

  play(id, author, name, duration, file_url) {
    this.show();
    if(this.trackId){
      this.isPlaying = true;
      this.trackObj.play();
      return;
    }
    this.trackId = id;
    this.trackAuthor = author;
    this.trackName = name;
    this.trackDurationSec = duration;
    this.trackObj.pause();
    this.trackUrl = this.trackObj.src = file_url;
    this.trackObj.load();
    this.trackObj.play();
  }

  pause() {
    this.isPlaying = false;
    this.trackObj.pause();
  }

  toTimeString(duration) {
    let num_minutes = Math.floor(duration / 60);
    let num_seconds = Math.floor(duration % 60);
    let str_minutes = num_minutes.toString();
    let str_seconds = num_seconds.toString();
    if(num_minutes < 10) str_minutes = "0" + str_minutes;
    if(num_seconds < 10) str_seconds = "0" + str_seconds;
    return str_minutes + ":" + str_seconds;
  }

  updateBullet() {
    let time = this.trackObj.currentTime;
    this.percentCompleted = time / this.trackObj.duration;
    this.trackLast = this.toTimeString(
      this.trackObj.duration - time
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { faPlay,
         faPause,
         faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  faPlay = faPlay;
  faPause = faPause;
  faEllipsisH = faEllipsisH;

  constructor() { }

  ngOnInit(): void {
  }

}

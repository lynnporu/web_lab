import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist';
import { PlaylistGalleryService } from '../playlist-gallery.service';

import { Global } from '../global';

@Component({
  selector: 'app-playlist-gallery',
  templateUrl: './playlist-gallery.component.html',
  styleUrls: ['./playlist-gallery.component.scss']
})
export class PlaylistGalleryComponent implements OnInit {

  playlists;

  @Input() source: string;
  @Input() limit: number;

  constructor(public playlistGalleryService: PlaylistGalleryService) { }

  ngOnInit(): void {
  	this.getPlaylists();
  }

  getPlaylists(): void {
    if(!this.limit) this.limit = 0;
  	this.playlistGalleryService.getPlaylists(this.source, this.limit)
  		.subscribe(playlists => {
        this.playlists = playlists["response"];
        if(this.source == "profile") Global.playlists = playlists["response"];
      });
  }

}

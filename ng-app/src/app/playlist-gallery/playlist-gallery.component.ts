import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist';
import { PlaylistGalleryService } from '../playlist-gallery.service';

@Component({
  selector: 'app-playlist-gallery',
  templateUrl: './playlist-gallery.component.html',
  styleUrls: ['./playlist-gallery.component.scss']
})
export class PlaylistGalleryComponent implements OnInit {

  playlists: Playlist[];

  @Input() source: string;

  constructor(public playlistGalleryService: PlaylistGalleryService) { }

  ngOnInit(): void {
  	this.getPlaylists();
  }

  getPlaylists(): void {
  	this.playlistGalleryService.getPlaylists(this.source)
  		.subscribe(playlists => this.playlists = playlists);
  }

}

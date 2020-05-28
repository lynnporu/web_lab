import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Global } from '../global';

import { PlaylistPageService } from '../playlist-page.service';

import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {

  faShareAlt = faShareAlt;

  playlistName = undefined;
  playlistPhotoUrl = undefined;
  playlistAuthor = undefined;

  constructor(
    private route: ActivatedRoute,
    private playlistPageService: PlaylistPageService
  ) { }

  ngOnInit(): void {
    Global.tracks_thread = this.playlistPageService.getPlaylist(
      this.route.snapshot.paramMap.get('id')
    )
    Global.tracks_thread.subscribe((response) => {
      this.playlistName = response['response']['name'];
      this.playlistPhotoUrl = response['response']['image_url'];
      this.playlistAuthor = response['response']['author']['name'];
    });
  }

}

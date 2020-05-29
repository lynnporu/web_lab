import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { Global } from '../global';

import { PlaylistPageService } from '../playlist-page.service';

@Component({
  selector: 'app-edit-playlist-page',
  templateUrl: './edit-playlist-page.component.html',
  styleUrls: ['./edit-playlist-page.component.scss']
})
export class EditPlaylistPageComponent implements OnInit {

  playlistId = undefined;
  playlistPhotoUrl = undefined;
  playlistName = undefined;

  faEllipsisH = faEllipsisH;

  constructor(
    private route: ActivatedRoute,
    private playlistPageService: PlaylistPageService
  ) { }

  ngOnInit(): void {
    Global.tracks_thread = this.playlistPageService.getPlaylist(
      this.route.snapshot.paramMap.get('id')
    )
    Global.tracks_thread.subscribe((response) => {
      this.playlistId = response['response']['id'];
      this.playlistName = response['response']['name'];
      this.playlistPhotoUrl = response['response']['image_url'];
    });
  }

}

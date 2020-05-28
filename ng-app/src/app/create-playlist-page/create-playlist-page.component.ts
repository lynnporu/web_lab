import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { CreatePlaylistPageService } from '../create-playlist-page.service';

@Component({
  selector: 'app-create-playlist-page',
  templateUrl: './create-playlist-page.component.html',
  styleUrls: ['./create-playlist-page.component.scss']
})
export class CreatePlaylistPageComponent implements OnInit {

  faPlus = faPlus;

  photoFile = undefined;
  photoUrl = '';
  playlistName = undefined;
  isDisabled = true;

  constructor(
    private createPlaylistPageService: CreatePlaylistPageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleFile(e) {
    this.photoFile = e.target.files[0];
    this.photoUrl = URL.createObjectURL(this.photoFile).toString();
    this.isDisabled = false;
  }

  upload() {
    if(this.isDisabled) return false;

    this.createPlaylistPageService.uploadPlaylist(
      this.photoFile,
      this.playlistName
    ).subscribe(
      (response) => this.router.navigate(['/playlists'])
    );
  }

}

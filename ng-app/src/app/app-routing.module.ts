import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';
import { TracksPageComponent } from './tracks-page/tracks-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { UploadsPageComponent } from './uploads-page/uploads-page.component';
import { UploadTrackPageComponent } from './upload-track-page/upload-track-page.component';
import { CreatePlaylistPageComponent } from './create-playlist-page/create-playlist-page.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import { EditPlaylistPageComponent } from './edit-playlist-page/edit-playlist-page.component';

const routes: Routes = [
	{ path: '', redirectTo: 'observe', pathMatch: 'full' },
	{ path: 'observe', component: MainPageComponent },
	{ path: 'tracks', component: TracksPageComponent },
	{ path: 'playlists', component: PlaylistsPageComponent },
	{ path: 'settings', component: SettingsPageComponent },
	{ path: 'uploads', component: UploadsPageComponent },
	{ path: 'upload', component: UploadTrackPageComponent },
	{ path: 'newplaylist', component: CreatePlaylistPageComponent },
	{ path: 'playlist/:id', component: PlaylistPageComponent },
	{ path: 'editplaylist/:id', component: EditPlaylistPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

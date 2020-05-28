import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistGalleryComponent } from './playlist-gallery/playlist-gallery.component';
import { TrackGalleryComponent } from './track-gallery/track-gallery.component';
import { AsideComponent } from './aside/aside.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainPageComponent } from './main-page/main-page.component';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';
import { TracksPageComponent } from './tracks-page/tracks-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { UploadsPageComponent } from './uploads-page/uploads-page.component';
import { UploadTrackPageComponent } from './upload-track-page/upload-track-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistGalleryComponent,
    TrackGalleryComponent,
    AsideComponent,
    PlayerComponent,
    MainPageComponent,
    PlaylistsPageComponent,
    TracksPageComponent,
    SettingsPageComponent,
    UploadsPageComponent,
    UploadTrackPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

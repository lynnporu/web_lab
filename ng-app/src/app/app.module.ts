import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    SettingsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

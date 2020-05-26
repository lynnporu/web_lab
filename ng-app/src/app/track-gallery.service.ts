import { Injectable } from '@angular/core';

import { Track } from './track';

@Injectable({
  providedIn: 'root'
})
export class TrackGalleryService {

  tracks: Track[] = [];

  constructor() { }
}

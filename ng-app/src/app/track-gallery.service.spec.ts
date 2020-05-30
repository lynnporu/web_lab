import { TestBed } from '@angular/core/testing';

import { TrackGalleryService } from './track-gallery.service';

describe('TrackGalleryService', () => {
  let service: TrackGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have routes set', () => {
  	expect(service.profileTracksRoute).not.toEqual(null);
  	expect(service.allTracksRoute).not.toEqual(null);
  	expect(service.deleteTrackRoute).not.toEqual(null);
  	expect(service.deletePlaylistTrackRoute).not.toEqual(null);
  	expect(service.addPlaylistTrackRoute).not.toEqual(null);
  });
});

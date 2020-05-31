import { TestBed } from '@angular/core/testing';

import { PlaylistGalleryService } from './playlist-gallery.service';

describe('PlaylistGalleryService', () => {
  let service: PlaylistGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have set profilePlaylistsRoute', () => {
  	expect(service.profilePlaylistsRoute).not.toEqual(null);
  });

  it('should have set allPlaylistsRoute', () => {
  	expect(service.allPlaylistsRoute).not.toEqual(null);
  });
});

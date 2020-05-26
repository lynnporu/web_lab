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
});

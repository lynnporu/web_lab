import { TestBed } from '@angular/core/testing';

import { PlaylistPageService } from './playlist-page.service';

describe('PlaylistPageService', () => {
  let service: PlaylistPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

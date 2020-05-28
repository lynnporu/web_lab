import { TestBed } from '@angular/core/testing';

import { CreatePlaylistPageService } from './create-playlist-page.service';

describe('CreatePlaylistPageService', () => {
  let service: CreatePlaylistPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePlaylistPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

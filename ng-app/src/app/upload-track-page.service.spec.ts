import { TestBed } from '@angular/core/testing';

import { UploadTrackPageService } from './upload-track-page.service';

describe('UploadTrackPageService', () => {
  let service: UploadTrackPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadTrackPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have set uploadTrackPage', () => {
  	expect(service.uploadTrackRoute).not.toEqual(null);
  });
});

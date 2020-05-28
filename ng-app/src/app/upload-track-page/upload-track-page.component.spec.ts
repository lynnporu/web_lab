import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTrackPageComponent } from './upload-track-page.component';

describe('UploadTrackPageComponent', () => {
  let component: UploadTrackPageComponent;
  let fixture: ComponentFixture<UploadTrackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTrackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackGalleryComponent } from './track-gallery.component';

describe('TrackGalleryComponent', () => {
  let component: TrackGalleryComponent;
  let fixture: ComponentFixture<TrackGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

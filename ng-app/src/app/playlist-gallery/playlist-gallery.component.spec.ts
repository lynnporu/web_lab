import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGalleryComponent } from './playlist-gallery.component';

describe('PlaylistGalleryComponent', () => {
  let component: PlaylistGalleryComponent;
  let fixture: ComponentFixture<PlaylistGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have number of divs as playlists length', () => {
    expect(component.querySelector('.h-row').children.length)
      .toEqual(component.playlists.length);
  });
});

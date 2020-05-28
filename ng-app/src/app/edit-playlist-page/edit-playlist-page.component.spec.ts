import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaylistPageComponent } from './edit-playlist-page.component';

describe('EditPlaylistPageComponent', () => {
  let component: EditPlaylistPageComponent;
  let fixture: ComponentFixture<EditPlaylistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlaylistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlaylistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

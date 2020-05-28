import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistPageComponent } from './create-playlist-page.component';

describe('CreatePlaylistPageComponent', () => {
  let component: CreatePlaylistPageComponent;
  let fixture: ComponentFixture<CreatePlaylistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlaylistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaylistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

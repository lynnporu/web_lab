import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksPageComponent } from './tracks-page.component';

describe('TracksPageComponent', () => {
  let component: TracksPageComponent;
  let fixture: ComponentFixture<TracksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cloud button should link to /upload', () => {
    expect(component.querySelector('.fa-cloud-upload-alt').routerLink)
      .toEqual('/upload');
  });
});

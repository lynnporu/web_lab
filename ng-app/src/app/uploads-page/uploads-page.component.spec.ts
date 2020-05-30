import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsPageComponent } from './uploads-page.component';

describe('UploadsPageComponent', () => {
  let component: UploadsPageComponent;
  let fixture: ComponentFixture<UploadsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('track gallery should have source profile', () => {
    expect(component.querySelector('app-track-gallery').getAttribute('source'))
      .toEqual('profile');
  });

  it('track gallery should have controls delete', () => {
    expect(component.querySelector('app-track-gallery').getAttribute('controls'))
      .toEqual('delete');
  });
});

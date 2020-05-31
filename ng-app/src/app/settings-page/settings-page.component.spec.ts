import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Global } from './global';

import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain user name', () => {
    expect(component.querySelector('.username')).toEqual(Global.username);
  });

  it('should contain user login', () => {
    expect(component.querySelector('.userlogin')).toEqual(Global.userlogin);
  });
});

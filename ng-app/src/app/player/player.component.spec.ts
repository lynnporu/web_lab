import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be hidden', () => {
    expect(component.querySelector('.player').classList.contains('hidden')).
      .toEqual(true);
  })

  it('should contain audio object', () => {
    expect(component.trackObj).toBeTruthy();
  });

  it('should have bullet at start', () => {
    expect(component.querySelector('.bullet').style.left).toEqual(0);
  });
});

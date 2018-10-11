import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPicComponent } from './nav-pic.component';

describe('NavPicComponent', () => {
  let component: NavPicComponent;
  let fixture: ComponentFixture<NavPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

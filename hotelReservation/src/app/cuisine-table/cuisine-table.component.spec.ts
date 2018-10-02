
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineTableComponent } from './cuisine-table.component';

describe('CuisineTableComponent', () => {
  let component: CuisineTableComponent;
  let fixture: ComponentFixture<CuisineTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuisineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

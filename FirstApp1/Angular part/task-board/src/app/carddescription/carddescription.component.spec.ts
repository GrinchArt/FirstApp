import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarddescriptionComponent } from './carddescription.component';

describe('CarddescriptionComponent', () => {
  let component: CarddescriptionComponent;
  let fixture: ComponentFixture<CarddescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarddescriptionComponent]
    });
    fixture = TestBed.createComponent(CarddescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

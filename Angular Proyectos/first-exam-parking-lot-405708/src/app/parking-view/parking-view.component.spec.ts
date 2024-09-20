import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingViewComponent } from './parking-view.component';

describe('ParkingViewComponent', () => {
  let component: ParkingViewComponent;
  let fixture: ComponentFixture<ParkingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

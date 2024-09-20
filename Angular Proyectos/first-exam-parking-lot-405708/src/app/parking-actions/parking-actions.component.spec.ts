import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingActionsComponent } from './parking-actions.component';

describe('ParkingActionsComponent', () => {
  let component: ParkingActionsComponent;
  let fixture: ComponentFixture<ParkingActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

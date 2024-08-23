import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcActionsComponent } from './calc-actions.component';

describe('CalcActionsComponent', () => {
  let component: CalcActionsComponent;
  let fixture: ComponentFixture<CalcActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

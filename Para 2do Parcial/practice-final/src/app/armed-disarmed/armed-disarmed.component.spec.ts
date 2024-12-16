import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmedDisarmedComponent } from './armed-disarmed.component';

describe('ArmedDisarmedComponent', () => {
  let component: ArmedDisarmedComponent;
  let fixture: ComponentFixture<ArmedDisarmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmedDisarmedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmedDisarmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

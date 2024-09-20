import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActComponent } from './game-act.component';

describe('GameActComponent', () => {
  let component: GameActComponent;
  let fixture: ComponentFixture<GameActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameActComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

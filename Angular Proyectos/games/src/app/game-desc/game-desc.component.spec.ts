import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDescComponent } from './game-desc.component';

describe('GameDescComponent', () => {
  let component: GameDescComponent;
  let fixture: ComponentFixture<GameDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

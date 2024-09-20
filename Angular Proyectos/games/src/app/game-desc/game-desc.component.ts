import { Component, Input } from '@angular/core';
import { DescPipe } from '../desc.pipe';
import { DescDirectiveDirective } from '../desc-directive.directive';

@Component({
  selector: 'app-game-desc',
  standalone: true,
  imports: [DescPipe, DescDirectiveDirective],
  templateUrl: './game-desc.component.html',
  styleUrl: './game-desc.component.css'
})
export class GameDescComponent {
  @Input() descToShow : string = "";
}

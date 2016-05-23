import { Component } from 'angular2/core';
import { ChessComponent } from '../chess/chess.component';
import { AIService } from '../ai/ai.service';

@Component({
  selector: 'main',
  templateUrl: 'app/main/main.html',
  directives: [ChessComponent],
  providers: [AIService]
})
export class MainComponent {
}
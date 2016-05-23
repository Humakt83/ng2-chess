import { Component } from 'angular2/core';
import { AIService } from '../ai/ai.service';

@Component({
  selector: 'chess',
  templateUrl: 'app/main/main.html'
})
export class ChessComponent {
    
    constructor(aiService: AIService) {}
    
    
}
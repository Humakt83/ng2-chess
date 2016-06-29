import { Injectable } from 'angular2/core';
import { AI } from './ai';

@Injectable()
export class AIService {
		
	private xMin = 0;
    private yMin = 0;
    private xMax = 7;
    private yMax = 7;
	
	private defaultValuesForPiece = [50, 95, 95, 125, 240, 5000];
	private pawned = [90, 95, 95, 125, 240, 5000];
	private horse = [40, 120, 75, 125, 240, 5000];
	private missionary = [40, 75, 120, 125, 240, 5000];
	private rookie = [40, 80, 80, 200, 240, 5000];
	private widowmaker = [40, 85, 95, 125, 1000, 5000];
	private officer = [30, 100, 100, 150, 300, 5000];
	
	private personalities = { personality_pawned: this.pawned, personality_horse: this.horse, personality_missionary: this.missionary, personality_rookie: this.rookie, 
		personality_widowmaker: this.widowmaker, personality_officer: this.officer};

	getValueForPiece(piece: number, x: number, y: number, personality: any) {		
		return personality[Math.abs(piece) - 1] + this.getValueOfCoordX(x) + this.getValueOfCoordY(piece, y);
	}
	
	evaluateBoard(board: number[][], personality: any): number {
		let score = 0;
		for (let y = this.yMin; y <= this.yMax; y++) {
			for (let x = this.xMin; x <= this.xMax; x++) {
				if (board[x][y] > 0)
					score += this.getValueForPiece(board[x][y], x, y, personality);
				if(board[x][y] < 0)
					score -= this.getValueForPiece(board[x][y], x, y, personality);
			}				
		}
		return score;
	}	
		
	calculateScoreOfTheMove(move: any, personality: any) {
		let score = this.evaluateBoard(move.boardAfterMove, personality);
		move.calculatedScore = score;
		return score;
	}
	
    createAI(black: boolean, difficulty: any, personality: any): AI {
	    return new AI(black, difficulty.depth, difficulty.width, personality ? personality : this.defaultValuesForPiece, this);
	}
    
    getPersonalities(): any {
	    return this.personalities;
	}

	private getValueOfCoordX(coord: number): number {
			if (coord === 3 || coord === 4) return 6;
			if (coord === 2 || coord === 5) return 3;
			if (coord === 1 || coord === 6) return 1;
			return 0;
	}

	private getValueOfCoordY(piece: number, coord: number): number {
			if ( piece === -1 ) return coord;
			if ( piece === 1) return 7 - coord;
			return this.getValueOfCoordX(coord);
	}
   
}
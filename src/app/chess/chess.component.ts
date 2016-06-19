import { Component, OnInit } from 'angular2/core';
import { AIService } from '../ai/ai.service';
import { AI } from '../ai/ai';
import {Chess, ChessPiece, Position } from '../rules/index';

@Component({
  selector: 'chess',
  templateUrl: 'app/chess/chess.html'
})
export class ChessComponent implements OnInit {
    
    isGameOver: boolean = false;
    piece = ChessPiece;
    aiOnBlack: boolean = false;
    aiOnWhite: boolean = true;
    chessBoard: Chess;
    doNotHighlightSelected: boolean = false;
    blackPieces: number[] = [];
    whitePieces: number[] = [];
    aiBlack : AI;
    aiWhite : AI;
    chessOverText: string = '';
    
    constructor(private aiService: AIService) {}
    
    ngOnInit() {
        this.chessBoard = new Chess();
        this.blackPieces = this.chessBoard.getBlackPieces();
        this.whitePieces = this.chessBoard.getWhitePieces();
        if (this.aiOnBlack) this.aiBlack = this.aiService.createAI(true, {depth: 3, width: 30 }, null);
	    if (this.aiOnWhite) this.aiWhite = this.aiService.createAI(false, {depth: 3, width: 30 }, null);
       	if (this.aiWhite) {
		    this.aiTurn();
	    }
    }
    
    selectPiece(x : number, y: number) {
		if (!this.isGameOver) {
			if (!this.chessBoard.selected || this.chessBoard.canSetSelected(x, y)) {
				this.chessBoard.setSelected(x, y);
			} else if (this.chessBoard.isMovable(x, y)) {
				this.chessBoard.movePiece(this.chessBoard.selected, new Position(x, y));
				this.checkState();
				if (!this.isGameOver && (this.aiBlack || this.aiWhite)) {
					this.aiTurn();
				}
			}
		}
	}
		
	aiTurn() {
		this.doNotHighlightSelected = true
		setTimeout(() => {
			if (this.chessBoard.turnOfWhite) this.aiWhite.playTurn(this.chessBoard);
			else this.aiBlack.playTurn(this.chessBoard);
			this.checkState();
			if(!this.gameOver && ((this.chessBoard.turnOfWhite && this.aiWhite) || (!this.chessBoard.turnOfWhite && this.aiBlack))) {
				this.aiTurn();
			} else {
				this.doNotHighlightSelected = false
			}
		}, 300);
	}
	
	checkState() {
		this.blackPieces = this.chessBoard.getBlackPieces();
		this.whitePieces = this.chessBoard.getWhitePieces();
		this.isGameOver = this.chessBoard.isGameOver();
		if (this.isGameOver) {
			this.gameOver();
		}
	}
	
	gameOver() {
		if (this.chessBoard.isStaleMate()) {
			this.chessOverText = 'Stalemate'
		} else if (this.chessBoard.isCheckMate()) {
			this.chessOverText = 'Checkmate'
		} else if (this.chessBoard.isInsufficientMaterial()) {
			this.chessOverText = 'Insufficient material'
		} else if (this.chessBoard.isThreefoldRepetition()) {
			this.chessOverText = 'Threefold repetition'
		} else if (this.chessBoard.isOverMoveLimit()) {
			this.chessOverText = 'Move limit reached'
		} else {
			this.chessOverText = 'Game over for unknown reason?'
		}
	}
	

	
	restart() {
		this.isGameOver = false;
		this.chessBoard = new Chess();
		if (this.aiWhite) {
			this.aiTurn()
		}
	}
}
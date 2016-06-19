import { Chess, Move } from '../rules/index';
import { AIService } from './ai.service';
//import _ from 'lodash';

export class AI {
    
    constructor(public black: boolean, public depth: number, public evalueNBestMoves: number, public personality: any, public service: AIService) {}
    
    playTurn = function(chess: Chess) {		
        chess.aiTurn = true
        var move = this.pickBestMove(chess)
        chess.doNotCheckForCheck = false
        chess.aiTurn = false
        if (!move) return
        chess.makeMove(move, false);
    }

    private topMoves(chess: Chess): Move[] {        
        let moves: Move[] = chess.allowedMoves;
        if (this.black) {
            return _.chain(moves).sortBy((move: Move) => {
                return this.service.calculateScoreOfTheMove(move, this.personality)
            }).take(this.evalueNBestMoves).value();
        } else {				
            return _.chain(moves).sortBy((move: Move) => {
                return this.service.calculateScoreOfTheMove(move, this.personality)
            }).takeRight(this.evalueNBestMoves).value();
        }
    }
    
    private pickBestMove(chess: Chess): Move {
        let	topMoves = this.topMoves(chess)
        chess.doNotCheckForCheck = true
        if (this.depth > 1) {				
            let aiOpponent = new AI(!this.black, this.depth - 1, this.evalueNBestMoves, this.personality, this.service)
            topMoves.forEach(move => {
                chess.makeMove(move, false);					
                if (chess.allowedMoves.length < 1) {
                    move.calculatedScore = aiOpponent.black ? 99999 : -99999
                } else {
                    move.calculatedScore = aiOpponent.pickBestMove(chess).calculatedScore
                }
                chess.undoMove(true)
            })
        }
        return this.black ? _.chain(topMoves).min((move:Move) => move.calculatedScore).value()
            : _.chain(topMoves).max((move: Move) => move.calculatedScore).value();
    }
    
}
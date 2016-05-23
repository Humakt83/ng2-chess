import { Chess } from 'jschessrulz';
import 'lodash';
import { AIService } from './ai.service';

export class AI {
    
    constructor(public black: boolean, public depth: number, public evalueNBestMoves: number, public personality: any, public service: AIService) {}
    
    topMoves(chess: Chess) {        
        let moves: any[] = chess.allowedMoves;
        var that = this;
        if (this.black) {
            return _.chain(moves).sortBy(function(move) {
                return this.service.calculateScoreOfTheMove(move, that.personality)
            }).first(this.evalueNBestMoves).value();
        } else {				
            return _.chain(moves).sortBy(function(move) {
                return this.service.calculateScoreOfTheMove(move, that.personality)
            }).last(this.evalueNBestMoves).value();
        }
    }
    
    pickBestMove(chess: Chess) {
        let	topMoves = this.topMoves(chess)
        chess.doNotCheckForCheck = true
        if (this.depth > 1) {				
            let aiOpponent = new AI(!this.black, this.depth - 1, this.evalueNBestMoves, this.personality, this.service)
            _.each(topMoves, function(move) {

                chess.makeMove(move, false);					
                if (chess.allowedMoves.length < 1) {
                    move.calculatedScore = aiOpponent.black ? 99999 : -99999
                } else {
                    move.calculatedScore = aiOpponent.pickBestMove(chess).calculatedScore
                }
                chess.undoMove(true)
            })
        }
        return this.black ? _.chain(topMoves).min(function(move) { return move.calculatedScore }).value()
            : _.chain(topMoves).max(function(move) { return move.calculatedScore }).value();
    }
    
    playTurn = function(chess: Chess) {
        chess.aiTurn = true
        var move = this.pickBestMove(chess)
        chess.doNotCheckForCheck = false
        chess.aiTurn = false
        if (!move) return
        chess.makeMove(move, false);
    }
    
}
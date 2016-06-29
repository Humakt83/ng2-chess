import { Position } from './position';
import { Chess } from './chess';

export class Move {

    boardBeforeMove: number[][];
    boardAfterMove: number[][];
    castlingState: any;
    pawnDoubleForward: boolean = false;
    calculatedScore: number = 0;

    constructor(public piece: number, public originalPosition: Position, public position: Position, private chess: Chess, public effect?: any) {
        this.effect = effect ? effect : () => {};
        this.boardBeforeMove = chess.board;
        this.boardAfterMove = chess.boardAfterMove(originalPosition, position);        
        this.castlingState = {blockers: chess.getCastlingState().blockers.slice()};
    }

}

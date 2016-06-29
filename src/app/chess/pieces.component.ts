import { Component, Input } from 'angular2/core';
import { ChessPiece } from '../rules/index';

@Component({
  selector: 'pieces',
  templateUrl: 'app/chess/pieces.html',
})
export class PiecesComponent {

    @Input() pieces: number[];
    chessPiece = ChessPiece;

}
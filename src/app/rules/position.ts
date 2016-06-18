export class Position {
	
	constructor(public x: number, public y: number) {}
	
	newPosition(xModifier: number, yModifier: number) {
		return new Position(this.x + xModifier, this.y + yModifier);
	}
}

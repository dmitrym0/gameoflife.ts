/*


* Neighbours should take in a coordinate and return a coordinatemap with all the neighbours, cell statusi

World w..
GetNeighbours(emptyWorld) = empty coordinatemap
GetNeighbours(1..2...3..neighbours) = appropriaute map






*/
export class CoordinatesMap {
    coordinatesmap: Cell[][];

    // from https://stackoverflow.com/a/54965188/38753
    // TODO Refactor
    boardSize = 100;

    constructor() {
        this.coordinatesmap = new Array(this.boardSize)
            .fill(new Empty())
            .map(() => new Array(this.boardSize)
            .fill(new Empty()));
    }

    at(coordinate: Coordinate): Cell {
        return this.coordinatesmap[coordinate.x][coordinate.y];
    }

    set(coordinate: Coordinate, cell: Cell | Empty) {
        this.coordinatesmap[coordinate.x][coordinate.y] = cell;
    }

    size() {
        let cells = 0;

        for (let x = 0; x < this.boardSize; x++) {
            for (let y = 0; y < this.boardSize; y++) {
                if (!(this.coordinatesmap[x][y] instanceof Empty)) {
                    cells++;
                }
            }
        }
        return cells;
    }
}
export class World {
    static iteration = 0;

    iteration: number;
    boardSize: number;

    coordinates: CoordinatesMap;

    constructor(coordinates: CoordinatesMap) {
        this.iteration = ++World.iteration;
        this.coordinates = coordinates;
        this.boardSize = this.coordinates.boardSize;
        // console.log(`Iteration: ${this.iteration}`);
    }

}

export class NextWorldGenerator {

    oldWorld: World;

    constructor(world: World) {
        this.oldWorld = world;
    }

    nextWorld(): World {
        const newMap = new CoordinatesMap();
        for (let x = 0; x < newMap.boardSize; ++x) {
            for (let y = 0; y < newMap.boardSize; ++y) {
                const coordinate = new Coordinate(x,y);
                const neighbours = new Neighbours(this.oldWorld, coordinate).getNeighbours();
                const emptyOrCell = this.oldWorld.coordinates.at(coordinate);

                if (emptyOrCell instanceof Empty) {
                    if (neighbours.length === 3) {
                        newMap.set(coordinate, new Cell());
                    }
                } else {

                    switch (neighbours.length) {
                        case 3: {
                            // fall through?
                            newMap.set(coordinate, new Cell());
                            break;
                        }
                        case 2: {
                            newMap.set(coordinate, new Cell());
                            break;
                        }
                        default: {
                            newMap.set(coordinate, new Empty());
                            break;
                        }
                    }
                }
            }
        }

        return new World(newMap);
    }
}


// cells
export class Cell {
}
export class Empty extends Cell {
    constructor() {
        super();
    }
}

export class Neighbours {

    atCoordinate: Coordinate;
    world: World;

    constructor(world: World, atCoordinate: Coordinate) {
        this.atCoordinate = atCoordinate;
        this.world = world;
    }

    getNeighbours(): Coordinate[]{
        const coordsOffsets = [ -1, 0, 1];
        const neighbourmap: Coordinate[] = [];

        for (const x of coordsOffsets) {
            for (const y of coordsOffsets) {
                const coordOfpotentialNeighbour = new Coordinate(this.atCoordinate.x - x, this.atCoordinate.y - y);
                const invalidCoordinate = (coordOfpotentialNeighbour.x < 0 || coordOfpotentialNeighbour.y < 0 || coordOfpotentialNeighbour.x > this.world.boardSize - 1 || coordOfpotentialNeighbour.y > this.world.boardSize - 1);
                if (invalidCoordinate) {
                    continue;
                }
                const maybeCell = this.world.coordinates.at(coordOfpotentialNeighbour);
                if (!(maybeCell instanceof Empty) && !coordOfpotentialNeighbour.same(this.atCoordinate) && !invalidCoordinate) {
                    neighbourmap.push(coordOfpotentialNeighbour);
                }
            }
        }
        return neighbourmap;
    }
}

export class Coordinate {
    x: number;
    y: number;

    constructor(_x:number, _y:number) {
        this.x = _x;
        this.y = _y;
    }

    same(coordinate: Coordinate): boolean {
        return this.x === coordinate.x && this.y === coordinate.y;
    }
}


export class WorldPainter {
    drawWorld(context: any, world: World) {
        for (let x = 0; x < world.boardSize; x++) {
            for (let y = 0; y < world.boardSize; y++) {
                if (!(world.coordinates.at(new Coordinate(x,y)) instanceof Empty)) {
                    context.point(x,y);
                }
            }
        }
    }
}



/*
Local Variables:
compile-command: "cd .. ; npm run build && ts-mocha  test/*.ts""
End:
*/



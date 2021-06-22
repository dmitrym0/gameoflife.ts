import * as Gol from './gameoflife';
import * as ctx from 'axel';
import * as fs from 'fs';
const fd = fs.openSync('/dev/stdin', 'rs')
function main() {

    const map = new Gol.CoordinatesMap();
    map.set(new Gol.Coordinate(5,5), new Gol.Cell());
    map.set(new Gol.Coordinate(5,6), new Gol.Cell());
    map.set(new Gol.Coordinate(5,7), new Gol.Cell());
    map.set(new Gol.Coordinate(4,5), new Gol.Cell());
    map.set(new Gol.Coordinate(4,6), new Gol.Cell());
    let currentWorld = new Gol.World(map);

    for (let i = 0; i < 100; ++i) {
        ctx.bg(0,0,0);
        ctx.clear();
        ctx.bg(0,255,0);
        new Gol.WorldPainter().drawWorld(ctx, currentWorld);
        fs.readSync(fd, new Buffer(1));
        currentWorld = new Gol.NextWorldGenerator(currentWorld).nextWorld();
    }

}



main();


/*
Local Variables:
compile-command: "cd .. ; npm run build && ts-mocha  test/*.ts""
End:
*/

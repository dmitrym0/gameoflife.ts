// import * from '../dist/index.js';
import 'assert'
import 'jest'
import 'mocha'
import {expect } from  'chai';
import chai = require('chai');
import 'expect'
import * as Gol  from '../dist/index';
const should = chai.should();
import * as td from 'testdouble'



describe('World', () => {
    it('should return a world', () => {
        const w = new Gol.World(new Gol.CoordinatesMap());
        w.should.be.instanceOf(Gol.World);
    });
});

describe('Coordinates', () => {
    it('should be an empty map', () => {
        const map = new Gol.CoordinatesMap();
        map.size().should.equal(0);
    });
    it('should preserve coordinates in a world', () => {
        const map = new Gol.CoordinatesMap();
        map.set(new Gol.Coordinate(42,42), new Gol.Cell());
        const world = new Gol.World(map);
        world.coordinates.size().should.equal(1);
    });

   });

describe('NextWorldGenerator', () => {
    it('should return a new world thats different from the old world', () => {
        const w = new Gol.World(new Gol.CoordinatesMap());
        const worldGenerator = new Gol.NextWorldGenerator(w);
        const newWorld = worldGenerator.nextWorld();
        w.should.to.not.equal(newWorld);
        w.should.be.instanceOf(Gol.World);
    });

    it('should return an empty world from an empty world', () => {
        const w = new Gol.World(new Gol.CoordinatesMap());
        const worldGenerator = new Gol.NextWorldGenerator(w);
        const newWorld = worldGenerator.nextWorld();
        newWorld.coordinates.size().should.equal(0);
    });

    it('should return a non empty world when a cell has a bunch of neighbours', () => {
        const map = new Gol.CoordinatesMap();
        map.set(new Gol.Coordinate(42,42), new Gol.Cell());
        map.set(new Gol.Coordinate(42,41), new Gol.Cell());
        map.set(new Gol.Coordinate(41,41), new Gol.Cell());
        const w = new Gol.World(map);
        const worldGenerator = new Gol.NextWorldGenerator(w);
        const newWorld = worldGenerator.nextWorld();
        newWorld.coordinates.size().should.equal(4);
    });
});

describe('Neighbours', () => {
    it('there shouldnt be any neighbours in an empty world', () => {
        const map = new Gol.CoordinatesMap();
        const world = new Gol.World(map);
        const newCoord = new Gol.Coordinate(0, 0);
        const neighbours = new Gol.Neighbours(world, newCoord);
        neighbours.getNeighbours().length.should.equal(0);
    });


    it('should return 1 neighbours', () => {
        const map = new Gol.CoordinatesMap();
        map.set(new Gol.Coordinate(41, 42), new Gol.Cell());
        const world = new Gol.World(map);
        const newCoord = new Gol.Coordinate(42, 42);
        const neighbours = new Gol.Neighbours(world, newCoord);
        neighbours.getNeighbours().length.should.equal(1);
    });

});



/*
Local Variables:
compile-command: "cd .. ; ts-mocha  test/*.ts""
End:
*/

// import * from '../dist/index.js';
import 'assert'
import 'jest'
import 'mocha'
import {expect } from  'chai';
import chai = require('chai');
import 'expect'

import * as Gol  from '../dist/gameoflife';
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

    it('should return a non empty world when a cell has a bunch of neighbours and reproduces', () => {
        const map = new Gol.CoordinatesMap();
        map.set(new Gol.Coordinate(42,42), new Gol.Cell());
        map.set(new Gol.Coordinate(42,41), new Gol.Cell());
        map.set(new Gol.Coordinate(41,41), new Gol.Cell());
        const w = new Gol.World(map);
        const worldGenerator = new Gol.NextWorldGenerator(w);
        const newWorld = worldGenerator.nextWorld();
        newWorld.coordinates.size().should.equal(4);
    });

    it('should return an empty world when all cells die ', () => {
        const map = new Gol.CoordinatesMap();
        map.set(new Gol.Coordinate(42,42), new Gol.Cell());
        map.set(new Gol.Coordinate(42,41), new Gol.Cell());
        const w = new Gol.World(map);
        const worldGenerator = new Gol.NextWorldGenerator(w);
        const newWorld = worldGenerator.nextWorld();
        newWorld.coordinates.size().should.equal(0);
    });

    it('should return a  world with one cell because the other two neighbours die', () => {
        const map = new Gol.CoordinatesMap();
        map.set(new Gol.Coordinate(41,41), new Gol.Cell());
        map.set(new Gol.Coordinate(42,42), new Gol.Cell());
        map.set(new Gol.Coordinate(43,43), new Gol.Cell());
        const w = new Gol.World(map);
        const worldGenerator = new Gol.NextWorldGenerator(w);
        const newWorld = worldGenerator.nextWorld();

        expect(newWorld.coordinates.at(new Gol.Coordinate(41,42))).to.be.an.instanceOf(Gol.Empty);
        expect(newWorld.coordinates.at(new Gol.Coordinate(43,42))).to.be.an.instanceOf(Gol.Empty);
        newWorld.coordinates.size().should.equal(1);
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


    it('should return right number of neighbours', () => {
        const map = new Gol.CoordinatesMap();
        map.set(new Gol.Coordinate(42,42), new Gol.Cell());
        map.set(new Gol.Coordinate(41,42), new Gol.Cell());
        map.set(new Gol.Coordinate(43,42), new Gol.Cell());
        const w = new Gol.World(map);

        new Gol.Neighbours(w, new Gol.Coordinate(42,42)).getNeighbours().length.should.equal(2);
        new Gol.Neighbours(w, new Gol.Coordinate(41,42)).getNeighbours().length.should.equal(1);
        new Gol.Neighbours(w, new Gol.Coordinate(43,42)).getNeighbours().length.should.equal(1);
    });
});



/*
Local Variables:
compile-command: "cd .. ; ts-mocha  test/*.ts""
End:
*/

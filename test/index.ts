// import * from '../dist/index.js';
import 'assert'
import 'jest'
import 'mocha'
import {expect } from  'chai';
var chai = require('chai')
import 'expect'
import * as Gol  from '../dist/index';
var should = chai.should();
describe('Typescript usage suite', () => {
  it('should be able to execute a test', () => {
      expect(true).to.equal(true);
      const w = new Gol.World();
      w.should.be.instanceOf(Gol.World);
  });
});

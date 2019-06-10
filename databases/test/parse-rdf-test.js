'use strict';

const fs = require('fs');
const expect = require('chai').expect;

const rdf = fs.readFileSync(`${__dirname}/pg1.rdf`);
const parseRDF = require('../lib/parse-rdf')
console.log(parseRDF);

describe('parseRDF', () => {
  it('should be a function', () => {
    expect(praseRDF).to.be.a('Function');
  });
});

it('should parse RDF content', () => {
  const book = parseRDF(rdf);
  expect(book).to.be.a('object');
  expect(book).to.have.a.property('id', 1);
  expect(book).to.have.a.property('title', 'The Declaration of Independence of the United States of America');
  expect(book).to.have.a.property('authors')
    .that.is.an('array').with.lengthOf(1)
    .and.contains('Jefferson, Thomas');
  expect(book).to.have.a.property('subjects')
    .that.is.an('array').with.lengthOf(2)
    .and.contains('United States -- History -- Revolution, 1775-1783 -- Sources')
    .and.contains('United States. Declaration of Independence');
});

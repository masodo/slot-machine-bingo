import Ember from "ember";
import { test, moduleFor } from 'ember-qunit';
import Cell from 'slingo-ember/models/cell';

moduleFor('model:board', 'Board', {
  // Specify the other units that are required for this test.
  needs: ['model:cell']
});

test('it exists', function() {
  var model = this.subject();
  ok(model);
});

test('.boardComplete', function() {
  var model = this.subject();

  // mock some cells
  var cellMock = [];
  for(var i = 0; i < 25; i++) {
    cellMock.push(Cell.create({value: 'X'}));
  }
  model.set('cells', cellMock);

  equal(model.get('boardComplete'), true);
});

test('.diagnalComplete', function() {
  var model = this.subject();

  // mock some cells
  var cellMock = [];
  for(var i = 0; i < 25; i++) {
    cellMock.push(Cell.create({value: 'X'}));
  }
  model.set('cells', cellMock);

  equal(model.get('diagnalComplete'), 2);
});

test('.verticalComplete', function() {
  var model = this.subject();

  // mock some cells
  var cellMock = [];
  for(var i = 0; i < 25; i++) {
    cellMock.push(Cell.create({value: 'X'}));
  }
  model.set('cells', cellMock);

  equal(model.get('verticalComplete'), 5);
});

test('.horizontalComplete', function() {
  var model = this.subject();

  // mock some cells
  var cellMock = [];
  for(var i = 0; i < 25; i++) {
    cellMock.push(Cell.create({value: 'X'}));
  }
  model.set('cells', cellMock);

  equal(model.get('horizontalComplete'), 5);
});

test('.getCellIndex', function() {
  expect(3);

  var model = this.subject();
  equal(model.getCellIndex(0, 0), 0);
  equal(model.getCellIndex(0, 5), 25);
  equal(model.getCellIndex(1, 2), 11);
});

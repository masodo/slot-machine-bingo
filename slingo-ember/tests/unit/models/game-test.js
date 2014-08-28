import { test, moduleFor } from 'ember-qunit';

moduleFor('model:game', 'Game', {
  // Specify the other units that are required for this test.
  needs: ['model:board']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
  ok(model.get('board'));
});

test('score is correct', function() {
  expect(3);

  var model = this.subject();
  equal(model.get('score'), 0);
  model.addScoreValue(100);
  equal(model.get('score'), 100);
  model.addScoreValue(-100);
  equal(model.get('score'), 0);
});

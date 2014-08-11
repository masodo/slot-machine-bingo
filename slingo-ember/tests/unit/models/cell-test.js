import { test, moduleFor } from 'ember-qunit';

moduleFor('model:cell', 'Cell', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

test('.isCovered', function() {
  var model = this.subject();
  model.set('value', 'X');
  equal(model.get('isCovered'), true);
});

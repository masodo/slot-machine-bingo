import Ember from 'ember';

var Router = Ember.Router.extend({
  location: SlingoEmberENV.locationType
});

Router.map(function() {
  this.resource('application', { path: '/' });
});

export default Router;

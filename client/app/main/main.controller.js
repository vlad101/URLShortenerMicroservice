'use strict';

(function() {

class MainController {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.awesomeThings = [];

    this.host = this.$location.host();
    this.port = this.$location.port();
    
    // $http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    // });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('workspaceApp')
  .controller('MainController', MainController);

})();
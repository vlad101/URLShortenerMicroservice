'use strict';

(function() {

class MainController {

  constructor($http, $location, $routeParams) {
    this.$http = $http;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.awesomeThings = [];

    this.host = this.$location.host();
    this.port = this.$location.port();
    var urlParam = this.$routeParams.params;

    $http.get('/api/shortener/getUrl/' + urlParam).then(response => {
      this.redirectUrl = response.data;
      if(this.redirectUrl.length > 0){
        window.location.href = this.redirectUrl[0].original_url;
      }
    });
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
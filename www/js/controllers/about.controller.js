angular
		.module('starter')
		.controller('AboutController', AboutController);

AboutController.$inject = ['$scope'];

function AboutController($scope) {
  $scope.title = "About My Awesome App";
}
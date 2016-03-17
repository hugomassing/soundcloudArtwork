'use strict';

/**
 * @ngdoc function
 * @name soundcloudArtworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soundcloudArtworkApp
 */
angular.module('soundcloudArtworkApp')
  .controller('MainCtrl', function ($scope, Soundcloud) {

    $scope.loading = false;
    $scope.error = false;
    $scope.noArtwork = false;
    $scope.track = {};

    $scope.getLargeArtwork = function (url) {
      if (url === null) {
        $scope.noArtwork = true;
        return;
      }
      return url.replace('large', 't500x500');
    };

    $scope.getArtwork = function (track) {
      $scope.loading = true;
      $scope.error = false;
      $scope.noArtwork = false;

      Soundcloud.getArtwork(track).success(function (trackInfo) {
        $scope.track = trackInfo;
        $scope.loading = false;
      }).error(function (err) {
        $scope.loading = false;
        $scope.error = true;
        console.log(err);
      });
    };
  });

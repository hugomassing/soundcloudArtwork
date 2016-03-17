'use strict';

/**
 * @ngdoc service
 * @name soundcloudArtworkApp.Soundcloud
 * @description
 * # Soundcloud
 * Service in the soundcloudArtworkApp.
 */
angular.module('soundcloudArtworkApp')
  .service('Soundcloud', function ($http) {

    var _soundCloud = {
      baseUrl : 'http://api.soundcloud.com/',
      clientId : '25a6312cd0379dbf2b4d8fce66d4f112'
    };

    var _xhr = {
      getArtwork : function(track) {
        return $http.get( _soundCloud.baseUrl + '/resolve?url=' + track + '&client_id=' + _soundCloud.clientId);
      }
    };

    var _srv = {
      getArtwork : function(track) {
        return _xhr.getArtwork(track);
      },
      getClientId : function () {
        return _soundCloud.clientId;
      }
    };

    return _srv;

  });

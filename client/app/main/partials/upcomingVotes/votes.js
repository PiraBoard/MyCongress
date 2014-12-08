'use strict';

angular.module('myCongressApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upcomingVotes', {
        url: '/upcomingVotes/:zip',
        templateUrl: 'app/main/partials/upcomingVotes/votes.html',
        controller: 'upcomingVotesController'
      });
  })

  .filter('sectorNameConversion', function(sectorCodes) {
    return function(input) {
      return sectorCodes[input];
    };
  })

  //uistateref to add multiple or duplicate partials to a page
  .controller('upcomingVotesController', function($scope, $stateParams, Bills, Politicians, Profile, Donors, Sunlight) {
    $scope.repVotes = {};
    $scope.sunriseIdToTransparencyId = {};
    $scope.transparencyIdToSunriseId = {};
    $scope.topDonorsByRep = {};
    $scope.topIndustriesByRep = {};
    $scope.topSectorsByRep = {};
    $scope.zip = $stateParams.zip;
    console.log(Sunlight.getRepsByZip({id: '94115'}));
    // Bills.getUpcomingBills().then(function(data){
    //   var bills = data.data.results;
    //   $scope.upcomingBills = bills;
    // });
    Sunlight.getRepsByZip({id: $scope.zip})
    .$promise
    .then(function (data) {
      var representatives = data.results;
      console.log('DATASTREAMFROMBACKEND', representatives);
      var senators = [];
      var congressmen = [];

            //Order by Senators first
      // for(var i=0; i<representatives.length; i++){
      //   var rep = representatives[i];

      //   if(rep.title === 'Sen'){
      //     senators.push(rep);
      //   } else {
      //     congressmen.push(rep);
      //   }
      //   console.log(rep.first_name + '+' + rep.last_name);
      //   Donors.getPolitician(rep.first_name + '+' + rep.last_name).then(function(data){
      //     console.log('getPolitician data: ', data);
      //     var transparencyId = data.data[0].id;
      //     $scope.sunriseIdToTransparencyId[rep.bioguide_id] = transparencyId;
      //     $scope.transparencyIdToSunriseId[transparencyId] = rep.bioguide_id;

      //     Donors.getTopContributorsofPolitician(transparencyId).then(function(data){
      //       console.log('top contrib', data.data);
      //       $scope.topDonorsByRep[this.bioguide_id] = data.data;
      //       console.log($scope.topDonorsByRep);
      //     }.bind(this));

      //     Donors.getTopSectorsofPolitician(transparencyId).then(function(data){
      //       console.log('top sector ', data.data);
      //       $scope.topSectorsByRep[this.bioguide_id] = data.data;
      //       console.log($scope.topDonorsByRep);
      //     }.bind(this));

      //     Donors.getTopIndustriesofPolitician(transparencyId).then(function(data){
      //       console.log('top industry ', data.data);
      //       $scope.topIndustriesByRep[this.bioguide_id] = data.data;
      //       console.log($scope.topDonorsByRep);
      //     }.bind(this));

      //   }.bind(rep));
      // }
    })

    Politicians.getRepsByZip($scope.zip).then(function(data){
      var representatives = data.data.results;
      var senators = [];
      var congressmen = [];

      //Order by Senators first
      for(var i=0; i<representatives.length; i++){
        var rep = representatives[i];

        if(rep.title === 'Sen'){
          senators.push(rep);
        } else {
          congressmen.push(rep);
        }
        console.log(rep.first_name + '+' + rep.last_name);
        Donors.getPolitician(rep.first_name + '+' + rep.last_name).then(function(data){
          console.log('getPolitician data: ', data);
          var transparencyId = data.data[0].id;
          $scope.sunriseIdToTransparencyId[rep.bioguide_id] = transparencyId;
          $scope.transparencyIdToSunriseId[transparencyId] = rep.bioguide_id;

          Donors.getTopContributorsofPolitician(transparencyId).then(function(data){
            console.log('top contrib', data.data);
            $scope.topDonorsByRep[this.bioguide_id] = data.data;
            console.log($scope.topDonorsByRep);
          }.bind(this));

          Donors.getTopSectorsofPolitician(transparencyId).then(function(data){
            console.log('top sector ', data.data);
            $scope.topSectorsByRep[this.bioguide_id] = data.data;
            console.log($scope.topDonorsByRep);
          }.bind(this));

          Donors.getTopIndustriesofPolitician(transparencyId).then(function(data){
            console.log('top industry ', data.data);
            $scope.topIndustriesByRep[this.bioguide_id] = data.data;
            console.log($scope.topDonorsByRep);
          }.bind(this));

        }.bind(rep));
      }
      $scope.reps = senators.concat(congressmen);
      });
  });


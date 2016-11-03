(function(){
'use strict';

angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrow = this;
		narrow.narrowsearch = function (searchTerm) {
			narrow.found = MenuSearchService.getMatchedMenuItems(searchTerm);

			// promise.then(function (response) {
			// 	// console.log(response.data);
			// })
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this

		service.getMatchedMenuItems = function (searchTerm) {
			var response = $http({
				method: "GET",
				url: ApiBasePath
			})
			 .then(function (response) {
			 	var foundItems = [];
			 	console.log(searchTerm);
			 	console.log(response.data.menu_items.length);
			 	console.log(response.data.menu_items[0]);
			 	for (var i = 0; i < response.data.menu_items.length; i++) {
			 		var desc = response.data.menu_items[i].description;
			 		if (desc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
			 			foundItems.push(response.data.menu_items[i]);
			 		}
			 	}
			 	console.log(foundItems);
			 	// return response;
			 })
			
		}
	}


})();
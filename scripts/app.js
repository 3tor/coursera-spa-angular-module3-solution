(function(){
'use strict';

angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
	.directive('foundItems', foundItemsDirective);

	function foundItemsDirective() {
		var ddo = {
			templateUrl: 'founditems.html',
			scope: {
				found: '<',
				searcherror: '<',
				onRemove: '&'	
			},
			controller: NarrowItDownController,
			controllerAs: 'narrowctrl',
			bindToController: true
		}
		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrow = this;
		narrow.searcherror = false;
		narrow.narrowsearch = function (searchItem) {
			console.log(searchItem);
			if( searchItem === undefined){
				narrow.searcherror = true;
			}
			else {
				narrow.searcherror = false;
			var promise = MenuSearchService.getMatchedMenuItems(searchItem);
			
			promise.then(function (response) {
				narrow.found = response;
				console.log(narrow.found);
			})
			.catch(function (error) {
				console.log("Error: ", error.message);
			})
			}
			
		}

		narrow.removeItem = function (itemIndex) {
			narrow.found.splice(itemIndex, 1);
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this

		service.getMatchedMenuItems = function (searchItem) {
			var promise = $http({
				method: "GET",
				url: ApiBasePath
			})
			 .then(function (response) {
			 	var foundItems = [];
			 	for (var i = 0; i < response.data.menu_items.length; i++) {
			 		var desc = response.data.menu_items[i].description;
			 		if (desc.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1) {
			 			foundItems.push(response.data.menu_items[i]);
			 		}
			 	}
			 	console.log(foundItems);
			 	return foundItems;
			 })
			return promise;	
		}
	}


})();
ebay.controller('searchController', function ($scope, $http, $window,$state) {
	
	$http({
        method: "POST",
        url: "/getSearchSession",
    }).success(function (data) {
        if(data.statusCode == 401)
        {
        	$window.location = "/";
        }
        else if(data.statusCode == 200)
        {
        	$scope.items = data.data;
        }
        else
    	{
        	$window.location = "/";
    	}
    	}).error(function (error) {
    		$window.location = "/";
    	});	
	
	$scope.product = function(item_id)
	{
		$http({
	        method: "POST",
	        url: "/getSearchSession",
	    }).success(function (data) {
	        if(data.statusCode == 401)
	        {
	        	$window.location = "/";
	        }
	        else if(data.statusCode == 200)
	        {
	        	$scope.items = data.data;
	        }
	        else
	    	{
	        	$window.location = "/";
	    	}
	    	}).error(function (error) {
	    		$window.location = "/";
	    	});
	}
});
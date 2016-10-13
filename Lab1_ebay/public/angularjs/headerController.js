ebay.controller('headerController', function ($scope, $http, $window,$state,$rootScope) {
	$scope.search_category = "All Categories";
	$scope.mylink = "/login";
	$scope.header_name = "Sign In";
	$scope.logout_lbl = true;
	$rootScope.items = null;
	
	$http({
        method: "POST",
        url: "/getLoginSessionValues",
    }).success(function (data) {
        if(data.statusCode == 401)
        {
        	$scope.header_name = "Sign In";
        	$scope.mylink = "/login";
        	$scope.logout_lbl = true;
        }
        else if(data.statusCode == 200)
        {
        	$scope.header_name = "Hi " + data.data.first_name;
        	$scope.mylink = "/"+data.data.handle;
        	$scope.logout_lbl = false;
        }
        else
    	{
        	$scope.header_name = "Sign In";
        	$scope.mylink = "/login";
        	$scope.logout_lbl = true;
    	}
    }).error(function (error) {
    	$scope.header_name = "Sign In";
    	$scope.mylink = "/login";
    });
	
	$scope.logout = function () {
		$http({
	        method: "POST",
	        url: "/logout"
	    }).success(function (data) {
        	if(data.statusCode == 200)
    		{
        		$scope.logout_lbl = true;
        		window.location = '/';
    		}
	    }).error(function (error) {
	    	$window.alert('Something went wrong. Please try again.');
	    });
	};
	
	$scope.search = function() {
		$http({
	        method: "POST",
	        url: "/searchQ",
	        data : {
	        	"search_txt":$scope.search_txt,
	        	"search_category": $scope.search_category
	        }
	    }).success(function (data) {
        	if(data.statusCode == 200)
    		{
        		$window.location = '/search';
    		}
        	else if(data.statusCode == 403)
    		{
        		$window.alert('No items found for search category. Please try again.');
    		}
        	else
    		{
        		$window.alert('Something went wrong. Please try again.');
    		}
	    }).error(function (error) {
	    	$window.alert('Something went wrong. Please try again.');
	    });
	}
});
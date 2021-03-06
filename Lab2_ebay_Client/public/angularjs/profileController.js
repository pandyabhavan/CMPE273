ebay.controller('profileController', function ($scope, $http, $window,$routeParams) {
	
	 $('#sellLink').click(function() {
		 $('#purchase').hide();
		 $('#profile_update').hide();
         $('#sell').show();
         return true;
     });
	 
	 $('#purchaseLink').click(function() {
		 $('#purchase').show();
		 $('#profile_update').hide();
         $('#sell').hide();
         return true;
     });
	 
	 $('#profileLink').click(function() {
		 $('#purchase').hide();
		 $('#profile_update').show();
         $('#sell').hide();
         return true;
     });

	$scope.category = "1";
	$scope.quantity = 1;
	
	$scope.scrollTo = function (hash) {
        $location.hash(hash);
    };
	
	$scope.change = function()
	{
		$scope.quantity = 1;
	};

	$scope.basic = function()
	{
		$http({
			method: "POST",
			url: "/getPurchaseHistory",
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "#login";
			}
			else if(data.statusCode == 200)
			{
				$scope.purchases = data.data;
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});

		$http({
			method: "POST",
			url: "/getSellingHistory",
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "#login";
			}
			else if(data.statusCode == 200)
			{
				$scope.selling = data.data;
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});

		$http({
			method: "POST",
			url: "/getProfile",
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "#login";
			}
			else if(data.statusCode == 200)
			{
				$scope.profile = data.data;
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});
	};
	$scope.basic();

	$scope.removeItem = function(item_id)
	{
		$http({
			method: "POST",
			url: "/removeItem",
			data:{
				"item_id":item_id
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "#login";
			}
			else if(data.statusCode == 200)
			{
				$scope.basic();
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});
	};

	$scope.addItem = function () 
	{
		$http({
			method: "POST",
			url: "/addItem",
			data:{
				"name":$scope.name,
				"description":$scope.description,
				"price":$scope.price,
				"bidding":$scope.bidding,
				"quantity":$scope.quantity,
				"category":$scope.category
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "#login";
			}
			else if(data.statusCode == 200)
			{
				$window.alert('Item added successfully');
				$scope.basic();
			}
			else if(data.statusCode == 405)
			{
				$window.alert('You need to complete the profile first to sell the product.');
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});
	};

	$scope.updateProfile = function()
	{
		if($scope.profile.birth_day > new Date() || $scope.profile.contact.length !== 10 || $scope.profile.pin_code !== 5)
			$window.alert('Please enter data correctly');
		else
		{	
			$http({
				method: "POST",
				url: "/updateProfile",
				data:{
					"profile":$scope.profile
				}
			}).success(function (data) {
				if(data.statusCode == 401)
				{
					$window.alert('Your session expired. Please Login again.');
					$window.location = '#login';
				}
				else
				{
					$window.alert('Profile Updated Successfully.');
					$scope.basic();
				}
			}).error(function (error) {
				$window.alert('Something went wrong. Please try again');
			});
		}
	};

	$scope.logData = function(file,place)
	{
		$http({
			method: "POST",
			url: "/logData",
			data:{
				"file":file,
				"place":place
			}
		}).success(function (data) {
		}).error(function (error) {
		});
	};
});
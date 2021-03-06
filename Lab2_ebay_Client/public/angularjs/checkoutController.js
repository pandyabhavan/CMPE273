ebay.controller('checkoutController', function ($scope, $http, $window) {
	$scope.total = 0;
	$http({
		method: "POST",
		url: "/getCheckoutSession"
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			$window.alert('Please log in first');
			$window.location = '#login';
		}
		else if(data.statusCode == 200)
		{
			$scope.total = data.data;
		}
		else
		{
			$window.location = "/";
		}
	}).error(function (error) {
		$window.alert('Something went wrong. Please try agian.');
		$window.location = "/";
	});

	$scope.checkout = function()
	{
		var cardNumber = $scope.card_number;
		var cvv = $scope.cvv;
		var expiry_year = $scope.expiry_year;
		var date = new Date().getTime();
		var expiry = new Date(expiry_year).getTime();

		if((cardNumber.toString().length !== 16 ) || (cvv.toString().length !== 3) || expiry<date)
		{
			$window.alert('Please enter the valid credit card details');
		}
		else
		{
			$http({
				method: "POST",
				url: "/productSold",
			}).success(function (data) {
				if(data.statusCode == 401)
				{
					$window.alert('Your session expired. Please login again.');
					$window.location = "#login";
				}
				else if(data.statusCode == 200)
				{
					$window.alert('Your order is placed successfully.');
					$window.location = '/';
				}
				else
				{
					$window.alert('Something went wrong. Please try agian.');
				}
			}).error(function (error) {
				$window.alert('Something went wrong. Please try agian.');
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
ebay.controller('productController', function ($scope, $http, $window,$state) {
	$scope.quantity = 1;
	$scope.success = true;
	$scope.failure = true;
	$scope.already = true;
	$scope.bids = false;
	$scope.button1 = "Add to cart"
	
	$http({
		method: "POST",
		url: "/getProductSession",
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			$window.location = "/";
		}
		else if(data.statusCode == 200)
		{
			$scope.product = data.data[0];
			if($scope.product.bid == 1)
			{
				$scope.bids = true;
				$scope.button1 = "Place Bid";
				$scope.bidding = $scope.product.highest_bid+1;
			}
		}
		else
		{
			$window.location = "/";
		}
	}).error(function (error) {
		$window.location = "/";
	});

	$scope.change = function(value) {
		if ($scope.quantity> $scope.product.quantity_remaining){
			$window.alert('Quantity can\'t be greater than remaining items.');
			$scope.quantity = 1;
		}
	};

	$scope.add_to_cart = function()
	{
		if($scope.product.bid == 1)
		{
			if($scope.bidding < $scope.product.highest_bid)
			{
				$window.alert('Please place higher bid.');
			}
			else
			{
				$http({
					method: "POST",
					url: "/placebid",
					data : {
						"item_id":$scope.product.id,
						"bid":$scope.bidding
					}
				}).success(function (data) {
					if(data.statusCode == 401)
					{
						$window.alert('You need to login first to place a bid.');
						$window.location = "/login";
					}
					else if(data.statusCode == 200)
					{
						$window.alert('Bid Placed Sucessfully');
						$scope.product.highest_bid = $scope.bidding;
					}
					else if(data.statusCode == 405)
					{
						$window.alert('Bidding time is over.Product already sold.');
						$window.location = '/home';
					}	
					else
						$window.alert('Something went wrong.Please try again.');
				}).error(function (error) {
					$window.alert('Something went wrong.Please try again.');
				});
			}	
		}
		else
		{	
			$http({
				method: "POST",
				url: "/addtocart",
				data : {
					"item_id":$scope.product.id,
					"quantity":$scope.quantity
				}
			}).success(function (data) {
				if(data.statusCode == 401)
				{
					$window.alert('You need to login first.');
					$window.location = "/login";
				}
				else if(data.statusCode == 200)
				{
					$scope.success = false;
					$scope.already = true;
					$scope.failure = true;
					$window.location = "/cart";
				}
				else
				{
					$scope.success = true;
					$scope.failure = true;
					$scope.already = false;
				}
			}).error(function (error) {
				$window.alert('Something went wrong.Please try again.');
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
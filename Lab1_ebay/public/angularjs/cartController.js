ebay.controller('cartController', function ($scope, $http, $window,$state) {

	$scope.no_item = false;
	$scope.div = true;
	$scope.deleted = true;
	var quantity = [];

	$scope.getCart = function()
	{
		$http({
			method: "POST",
			url: "/getCart",
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$scope.no_item = false;
				$scope.div = true;
			}
			else if(data.statusCode == 200)
			{
				$scope.no_item = true;
				$scope.div = false;
				$scope.carts = data.data;
				$scope.subtotal = 0;
				$scope.sales_tax = 0;
				$scope.total = 0;
				for(var i=0;i<data.data.length;i++)
				{
					$scope.subtotal += Number(data.data[i].price);
				}
				$scope.sales_tax = Number((0.09*$scope.subtotal).toFixed(2));
				$scope.total = Number(($scope.subtotal + $scope.sales_tax).toFixed(2));
			}
			else
			{
				$scope.no_item = false;
				$scope.div = true;
				$window.location = "/";
			}
		}).error(function (error) {
			$window.alert('Something went wrong. Please try agian.');
			$window.location = "/";
		});
	};
	$scope.getCart();

	$scope.removeFromCart = function(item_id)
	{

		$http({
			method: "POST",
			url: "/removeFromCart",
			data:{
				"item_id":item_id
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('Something went wrong. Please try agian.');
			}
			else if(data.statusCode == 200)
			{
				$scope.deleted = false;
				$scope.getCart();
			}
			else
			{
				$window.alert('Something went wrong. Please try agian.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong. Please try agian.');
			$window.location = "/";
		});
	};

	$scope.checkout = function()
	{
		$window.alert('Hi');
		$window.location = '/checkout';
		for(var i =0;i<$scope.carts.length;i++)
		{
			quantity.push({"item_id":$scope.carts[i].id,"quantity":$scope.carts[i].quantity});
			console.log({"item_id":$scope.carts[i].id,"quantity":$scope.carts[i].quantity});
		}
		$http({
			method: "POST",
			url: "/checkOut",
			data : {
				"quantity":quantity,
				"total":$scope.total
			} 
		}).success(function (data) {
			$window.location = "/checkout";
		}).error(function (error) {
			$window.alert('Something went wrong. Please try agian.');
			$window.location = "/";
		});
	};
});
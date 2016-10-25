ebay.controller('loginController', function ($scope, $http, $window) {

	$scope.invalid_login = true;
	$scope.login = function (username, password) {
		$http({
			method: "POST",
			url: "/Login",
			data: {
				"username": username,
				"password": password
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$scope.invalid_login = false;
			}
			else if(data.statusCode == 200)
			{
				$scope.invalid_login = true;
				window.location = "#home";
			}
			else
			{
				$scope.invalid_login = false;
			}
		}).error(function (error) {
			$scope.invalid_login = false;
		});
	};

	$scope.register = function () 
	{
		$window.alert($scope.email + '\n' + $scope.reenteremail + '\n' + $scope.password_register + '\n' + $scope.first_name + '\n' + $scope.last_name);
		if($scope.email === $scope.reenteremail)
		{
			$http({
				method: "POST",
				url: "/Register",
				data: {
					"email": $scope.email,
					"password": $scope.password_register,
					"first_name":$scope.first_name,
					"last_name":$scope.last_name,
					"handle": ($scope.first_name+"."+$scope.last_name).toLowerCase()
				}
			}).success(function (data) {
				if(data.statusCode == 401)
				{
					$scope.alert('Email already registered.');
				}
				else if(data.statusCode == 200)
				{
					$scope.invalid_login = true;
					$window.alert('Registration Successful '+data.data);
					window.location = "#home";
				}
				else
				{
					$scope.invalid_login = false;
				}
			}).error(function (error) {
				$scope.invalid_login = false;
			});
		}
		else
		{
			$window.alert('Emails do not match');
		}
	};

	$scope.forgotPassword = function (emailId) {
		$window.alert('If you are registered customer, you should receive email shortly.');
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
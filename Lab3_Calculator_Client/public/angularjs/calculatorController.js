var calculator = angular.module('calculator', []);

calculator.controller('calculatorController',function($scope,$http,$window)
{
	$scope.no_output = true;
    $scope.invalid = true;
    $scope.operation = "Addition";
    $scope.caculate = function ()
    {
        $http({
            method: "POST",
            url: "/calculate",
            data: {
                "number1": $scope.number1,
                "number2": $scope.number2,
                "operation": $scope.operation
            }
        }).success(function (data) {
            if(data.statusCode == 401)
            {
                $scope.invalid = false;
                $scope.no_output = true;
                $window.alert('Something went wrong.Please try again.');
            }
            else
            {
                $scope.invalid = true;
                $scope.no_output = false;
                $scope.number1 = data.data;
                $scope.number2 = null;
                $scope.output = data.data;
            }
        }).error(function (error) {
            $scope.no_output = false;
            $scope.invalid = true;
            $window.alert('Something went wrong.Please try again.');
        });
    };
});
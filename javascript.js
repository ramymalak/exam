var app = angular.module('Exam', ['ngMaterial']);
app.controller('AppCtrl', function ($scope,$http) {
    $scope.test_mode=1;
    $scope.title="Test";
    $scope.current = 0;
    $scope.list_length = comming_list.length;
    //$scope.selected=1;
    $scope.loadlist = function () {
        comming_list[$scope.current].body = $scope.question;
        comming_list[$scope.current].option1 = $scope.first;
        comming_list[$scope.current].option2 = $scope.second;
        comming_list[$scope.current].option3 = $scope.third;
        comming_list[$scope.current].option4 = $scope.fourth;
        comming_list[$scope.current].selected_one = $scope.group1;
        $scope.group1 = null;
    };
    $scope.loadtemp = function () {
        $scope.question = comming_list[$scope.current].body;
        $scope.first = comming_list[$scope.current].option1;
        $scope.second = comming_list[$scope.current].option2;
        $scope.third = comming_list[$scope.current].option3;
        $scope.fourth = comming_list[$scope.current].option4;
        $scope.group1 = comming_list[$scope.current].selected_one;
    };
    $scope.increment = function () {
        if ($scope.current >= ($scope.list_length - 1)) {
            comming_list[$scope.current].selected_one = $scope.group1;
            var result=[];
            for(var i=0;i<$scope.list_length;i++){
                result[i]={"id":comming_list[i].id,"answer":comming_list[i].selected_one};
            }
            $http.post('http://localhost:3000/result', {msg:result}).
                    then(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $scope.title="Test Result";
                        $scope.test_mode=0;
                        $scope.result=response.data;
                    }, function (error) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.log("ERROR OCCUERED");
                    });
        }else{
            $scope.loadlist();
            $scope.current++;
            $scope.loadtemp();

        }
        

    };
    $scope.decrement = function () {
        $scope.loadlist();
        if ($scope.current >= 1) {
            $scope.current--;
        }

        $scope.loadtemp();
    };
    
    $scope.doreload = function () {
        location.reload();
    };

    $scope.loadtemp();

});

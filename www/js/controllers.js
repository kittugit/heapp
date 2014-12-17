angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {
})

.controller('ExpenseCategoryCtrl', function($scope, Expense, $http) {
    $scope.categorizedExpenses =  {};
	
	$http.get('http://heservice.herokuapp.com/expenses/bycategory').success(function(data, status, headers, config) {
	  console.log(data);
	  $scope.categorizedExpenses = data;
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	console.log(data);
  });
  })

.controller('ExpenseItemCtrl', function($scope, $stateParams, Expense, $http) {
   $scope.byCategory = [];
   
   $http.get('http://heservice.herokuapp.com/expenses/bycategory/' + $stateParams.category).success(function(data, status, headers, config) {
	  console.log(data);
	  $scope.byCategory = data;
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	console.log(data);
  });
   $scope.category = $stateParams.category;
})



.controller('GroupCtrl', function($scope, Expense, $cordovaContacts, $cordovaToast) {
    $scope.group = {date: '2014-12-25'};
	$scope.group.name = '';
	var now = new Date();
    $scope.group.date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() 
	$scope.contact = {};
	$scope.contact.name = "Yazhnila";
	
	$scope.saveGroup = function() {
	   console.log("Add Group" + $scope.group);
	   Expense.addGroup($scope.group);   
	};
	
	
   $scope.pickParticipant = function(){
        $cordovaContacts.pickContact(function(result){
	      $scope.contact.name = contact.name;
		  $cordovaToast.showShortTop('result');
        //console.log('The following contact has been selected:' + JSON.stringify(contact));
    },function(err){
	    $scope.contact.name = 'error';
        //console.log('Error: ' + err);
		$cordovaToast.showShortTop('Error');
    });
   };
	
})

.controller('ExpenseCtrl', function($scope, Expense) {
    $scope.byCategory = Expense.addGroup();
   $scope.category = $stateParams.category;
})

.controller('ExpenseCtrl', function($scope, Expense, $cordovaContacts, $cordovaToast, $http) {

   $scope.group = Expense.getGroup();
	init();
   $scope.saveExpense = function(expin){
        //Expense.add(expin);;
		
	 $http.post('http://heservice.herokuapp.com/expenses', expin).success(function(data, status, headers, config) {
	  console.log(data);
	  init();
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	console.log(data);
	$cordovaToast.showShortTop('Expense is added');
  });
	
   };
   
  
   function init(){
    $scope.expense={amount:'Amount', category: 'Groceries', date: '2014-12-25'};
    var now = new Date();
   $scope.expense.date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() ;

   }
});
	
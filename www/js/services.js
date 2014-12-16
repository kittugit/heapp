angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Expense', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  
  var expenses = [
    // expense:  id, group_id, amount, date, description, category
	// {id:0, date:'2014-12-12', category: 'Gas', amount: 23.78, description: 'Honda Car' } ,
	// {id:1, date:'2014-12-1', category: 'Gas', amount: 43.78, description: 'Tour Car' } ,
	// {id:2, date:'2014-12-1', category: 'Gas', amount: 43.78, description: '2nd Car' } ,
	// {id:3, date:'2014-12-1', category: 'Groceries', amount: 76.00, description: '2nd Car' }
  ];
  
  
  
  var expense_group = [ {id: 0, date: '2014-12-01', name: 'Dec 2014'}, 
						{id: 1, date: '2014-11-01', name: 'Nov 2014'},
						{id: 2, date: '2014-10-01', name: 'Oct 2014'},];

  return {
    all: function() {
	  $http.get('http://localhost:3000/expenses').success(function(data, status, headers, config) {
	  console.log(data);
	  expenses = data;
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	console.log(data);
  });
      return expenses;
    },
    get: function(expenseId) {
      // Simple index lookup
      return expenses[expenseId];
    },
	add: function(expense) {
	console.log("Expense:" + expense.group_id);
	if(!expense.id){
	   expense.id = expenses.length+1;
	}
	   expenses.push(expense);
	},
	groupByCategory: function(){
	
	  var byCategory = {};
	     $http.get('http://localhost:3000/expenses/bycategory').success(function(data, status, headers, config) {
	  console.log(data);
	  byCategory = data;
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
	console.log(data);
  });
      return byCategory;
    },
	getByCategory: function(icategory){
	      var byCategory = [];
		  for(i in expenses){
			if(expenses[i].category == icategory){
				byCategory.push(expenses[i]);
			}
		  }
		 return byCategory;		  
	},
	getGroup: function(){
	  return expense_group;
	},
	addGroup: function(group){
	if(!group.id){
	   group.id = expense_group.length+1;
	}
	
	   expense_group.push(group);
	}
  }
});

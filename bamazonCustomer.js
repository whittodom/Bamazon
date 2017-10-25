var mysql = require("mysql");
var inquirer = require("inquirer");

// Connection for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
});

connection.connect(function(error) {
	if (error) throw error;
	display();
});

//display items available for sale: include ids, names, prices
function display(){
	connection.query('SELECT * from products', function(error, results) {
		if (error) throw error;

		console.log('----------');
		results.forEach(function(item) {
			
			console.log(item.item_id + ' || ' + 'PRODUCT: ' + item.product_name +  '|| ' + 'PRICE: ' + item.price)
		})
		console.log('----------');
		start();
	});
};

function start() {
	connection.query('SELECT * from products', function(error, results) {
		if (error) throw error;	

		inquirer
		.prompt([
		{
			name: "listChoice",
			type: "list",		

			choices: function() {
				var choiceArray = [];
				for (var i = 0; i < results.length; i++) {
					choiceArray.push(results[i].item_id.toString());
				}
				return choiceArray;
			},	
          	//#1: Ask ID of product they want to buy
          	message: "Which item would you like to buy? Please select by user ID!"	
        },
        {
          	name: 'unitChoice',
          	type: 'input',

			//#2: Ask how many units of the product to buy
			message: 'How many would you like to buy?',
			validate: function(value) {
				if(isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}
		]).then(function(answer) {

			var chosenItem; //store item ordered
			//match prompt answer to database item
			for (var i = 0; i < results.length; i++) {
				if (results[i].item_id.toString() === answer.listChoice) {
					chosenItem = results[i];
				};			
			};

			//store quantity ordered
		    var chosenQuantity = answer.unitChoice;

		    //total cost of purchse
		    var totalCost = chosenItem.price * chosenQuantity;

        	//check if store has inventory to fulfill order
        	//If not enough inventory...
        	if (chosenItem.stock_quantity < chosenQuantity) {
        	    console.log("--------------------"); 	
        		console.log("INSUFFICIENT INVENTORY! Please start again.");
        		console.log("--------------------");  
        		start();       		
        	} else { //Update database to reflect remaining quantity
        		connection.query(
        			'UPDATE products SET ? WHERE ?',
        			[
        				{ 
        					stock_quantity: chosenItem.stock_quantity - chosenQuantity
        				},
        				{
        					item_id: chosenItem.item_id
        				}
        			],
        			function(error) {
        				if (error) throw error;

		        		console.log("--------------------");        	
		        		console.log("ORDER PLACED!");
		        		console.log("SUMMARY: " + chosenItem.product_name + " || " + "Total Cost: " + "$" + totalCost);  
		        		display();      				
        			}
        		);
        	};		
	    });
	});
};	
		

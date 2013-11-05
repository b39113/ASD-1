// Mark Henry
// 1311
// personal code-template


$('#index').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addGuitar').on('pageinit', function(){

		var myForm = $('#guitarForm'),
			addGuitarerrorslink = $('#addGuitarerrorslink')
			;
		    myForm.validate({
			invalidHandler: function(form, validator) {
				addGuitarerrorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
				}
				$("#addGuitarerrors ul").html(html);
			},
	
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		},
		

});
    

		//This function saves input data to local storage.
		var storeData = function(data, key){
	
		//If there is no key, this means this is a brand new item and it will need a new key.
    	if(!key){
    	
    	var id                  = Math.floor(Math.random()*100000001);
    	
    	}else{
        //Set the id to the existing key being edited to save data.
        //The key is the same key has been passed from the Submit event handler.
        //Goes next to validate function and then passed here, into the storeData function.
        id = key;
    	}
        
    	//This collects all of the form field values and stores them in an object.
    	//Object properties contain arrays with the form labels and input values.
    	var item                    = {};
        	item.brand    			= ["Brand:", $('#brand').val()];
        	item.guitarType         = ["Guitar Type:", $('#guitarType').val()];
        	item.model              = ["Guitar Model:", $('#model').val()];
        	item.strings			= ["# of Strings:", $('#strings').val()];
        	item.pickupType         = ["Pickup Type:", $('#pickupType').val()];
        	item.finish           	= ["Finish:", $('#finish').val()];
        	item.cost               = ["Cost $:", $('#cost').val()];
        	item.rate            	= ["Rating:", $('#rate').val()];
        	item.date           	= ["Date Saved:", $('#date').val()];
            
    	//This saves the data to the local storage. Stringify converts object back into a string.
    	localStorage.setItem(id, JSON.stringify(item));
    	alert("Guitar Saved. Your List has been updated.");
     
		}
		

	function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There aren't any guitars are in your list at this time.");
        }
    }

	

$('#json').on('click', function(){
	$.ajax({
		url			: "js/json.js",
		type		: "GET",
		dataType	: "json",
		success		: function(data, status) {
			console.log(data, status);
		},
		error		: function(error, parseerror){
			console.log(error, parseerror);
		}
	});

})


/*
	var editLink = '<a href="#" data-key="' + key + '">Edit Guitar</a>';
	editLink.on('click',editItem);
	
	
	var deleteLink = '<a href="#" data-key="' + key + '">Delete Guitar</a>';
	editLink.on('click',deleteItem);

*/


	
	//any other code needed for addItem page goes here


	//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	
	

	

	

});

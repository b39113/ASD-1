// Mark Henry
// 1311
// personal code-template



$('#index').on('pageinit', function(){
	 var addGuitar = $('#addGuitar');
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
				};
				$("#addGuitarerrors ul").html(html);
			},
	
			submitHandler: function() {
		var data = myForm.serializeArray();			
			storeData(data);
			
		}

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
    	var item                = {};
        	item.brand    		= ["Brand:", 		$('#brand')		 .val()];
        	item.guitarType     = ["Guitar Type:", 	$('#guitarType') .val()];
        	item.model          = ["Guitar Model:", $('#model')		 .val()];
        	item.strings		= ["Strings:", 		$('#strings')	 .val()];
        	item.pickupType     = ["Pickup Type:", 	$('#pickupType') .val()];
        	item.finish         = ["Finish:", 		$('#finish')	 .val()];
        	item.cost           = ["Cost: $", 		$('#cost')		 .val()];
        	item.rate           = ["Rating:", 		$('#rate')		 .val()];
        	item.comments		= ["Comments:", 	$('#comments')	 .val()];
        	item.date           = ["Date Saved:", 	$('#date')		 .val()];
            
    	//This saves the data to the local storage. Stringify converts object back into a string.
    	localStorage.setItem(id, JSON.stringify(item));
    	window.location.reload();
    	alert("Guitar Saved. Your List has been updated.");
     
		};
	
						
		
		//This creates edit and delete functions
    	function editItem() {
        	var key = $(this).data("key");
        	var grabValue = localStorage.getItem(key);
        	var item = JSON.parse(grabValue);
        	$("#brand")		  .val(item.brand[1]);
        	$("#guitarType")  .val(item.guitarType[1]);
        	$("#model")		  .val(item.model[1]);
        	$("#strings")	  .val(item.strings[1]);
        	$("#pickupType")  .val(item.pickupType[1]);
        	$("#finish")	  .val(item.finish[1]);
        	$("#cost")		  .val(item.cost[1]);
        	$("#rate")		  .val(item.rate[1]);
        	$("#comments")	  .val(item.comments[1]);
        	$("#date")		  .val(item.date[1]);
        		
        	$("#updateList")
            	.val("Edit Item")
            	.data(this.key);

        	var editSave = $("#updateList");
        	editSave.key = this.key;
    }


    
    //Delete single item function
	function deleteItem(){
    	var ask = confirm("Are you sure you want to delete this guitar?");
    	if(ask){
    		localStorage.removeItem($(".deleteLink").data("key"));
    		alert("That guitar has been deleted!");
    		
    	}else{
    		alert("This guitar was NOT deleted and will remain in your list.");
    	}window.location.reload();
    };
    
    
    
    function getData(){

        if(localStorage.length === 0){
        	alert("There's nothing in local storage.");
        }

       $("#guitarDisplay ul").html(" ");
       var guitarData = "";
       for (var i=0, j=localStorage.length; i<j; i++){
               var key = localStorage.key(i);
               var keyValue = localStorage.getItem(key);
               var object = JSON.parse(keyValue);

       for (var p in object){
           if (object[p][0] === "Name: ") continue;
           guitarData += "<li>" + object[p][0] + " " + object[p][1] + " " + "</li>";
       
   }

       guitarData += '<li><a href="#addGuitar" class="editLink" style="display: block" data-key="' + key + '">Edit Item</a></li>';
       guitarData += '<li><a href="#addGuitar" class="deleteLink" style="display: block" data-key="' + key + '">Delete Item</a></li>' + "<br>";
             
       }
        
       $("#guitarDisplay ul").append(guitarData);
       $(".editLink").on("click", editItem);
       $(".deleteLink").on("click", deleteItem);

};
    
       

//Get ajax JSON data
$('#displayGuitars').on('pageinit', function(){
   
        $("#jsonbtn").on("click", function(){
                console.log("JSON button clicked!");
           /*$('#guitarDisplay').empty();*/
           $.ajax({
                url: "xhr/data.json",
                data:{},
                type: "GET",
                dataType: "jsonp",
                success: function(response){
                	console.log(data, status);
                    for(var i=0, j=data.item.length; i<j; i++){
                        var jsonDisplay = data.item[i];
                        $(''+
                            '<div>' +
                                '<ul>' +
                                  '<li>' + jsonDisplay.brand 		+ '</li>' +
                                  '<li>' + jsonDisplay.guitarType 	+ '</li>' +
                                  '<li>' + jsonDisplay.model 		+ '</li>' +
                                  '<li>' + jsonDisplay.strings 		+ '</li>' +
                                  '<li>' + jsonDisplay.pickupType 	+ '</li>' +
                                  '<li>' + jsonDisplay.finish 		+ '</li>' +
                                  '<li>' + jsonDisplay.cost 		+ '</li>' +
                                  '<li>' + jsonDisplay.rate 		+ '</li>' +
                                  '<li>' + jsonDisplay.comments 	+ '</li>' +
                                  '<li>' + jsonDisplay.date 		+ '</li>' +
                                '</ul>' +
                            '</div>'
                        ).appendTo("#guitarDisplay");
                    }; 
                }
            });  
        });
});








/*
//XML Data
$('#displayGuitars').on('pageinit', function(){
   
        $("#xmlbtn").on("click", function(){
                console.log("XML button clicked!");
           $.ajax({
                url: "../xhr/data.xml",
                type: "GET",
                dataType: "json",
                success: function(data){
                	console.log(data);
                    for(var i=0, j=data.item.length; i<j; i++){
                        var jsonDisplay = data.item[i];
                        $(''+
                            '<div>' +
                                '<ul>' +
                                  '<li>' + jsonDisplay.brand 		+ '</li>' +
                                  '<li>' + jsonDisplay.guitarType 	+ '</li>' +
                                  '<li>' + jsonDisplay.model 		+ '</li>' +
                                  '<li>' + jsonDisplay.strings 		+ '</li>' +
                                  '<li>' + jsonDisplay.pickupType 	+ '</li>' +
                                  '<li>' + jsonDisplay.finish 		+ '</li>' +
                                  '<li>' + jsonDisplay.cost 		+ '</li>' +
                                  '<li>' + jsonDisplay.rate 		+ '</li>' +
                                  '<li>' + jsonDisplay.comments 	+ '</li>' +
                                  '<li>' + jsonDisplay.date 		+ '</li>' +
                                '</ul>' +
                            '</div>'
                        ).appendTo("#guitarDisplay");
                    }; 
                }
            });  
        });
});
*/



/*	
$(function(){

	$('#phpDisplay').empty();
	$.ajax({
		url: 	  'xhr/list.php',
		type: 	  'GET',
		dataType: 'json',
		success: function(response){
			for(var i=0, j=response.languages.length; i<j; i++){
				var lang = response.languages[i];
				$(''+
					'<div class="language">'+
						'<h2>'+ lang.name +'</h2>'+
						'<p>'+ lang.description +'</p>'+
						'<p>'+ lang.version +'</p>'+
					'</div>'				
				).appendTo('#phpDisplay');
			};
		}
	});
});
*/
    
    
    //This clears all of the data.
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There aren't any guitars in your list at this time.");
        }else{
        	var ask = confirm("Are you sure you want to delete your entire list?");
        	if(ask){
            	localStorage.clear();
            	alert("Your entire list has been deleted.");
            	window.location.reload();
            }else{
    			alert("Your list was NOT deleted and will remain intact.");
    		}
        }
    }


	//This sets the link and submits the clicked events.
    var clearData = $('#clearData');
    clearData.on("click", clearLocal);
    
    
    $("#guitarDisplay").on("click", function(){
        $("#guitarDisplay ul").html(" ");
        guitarData = " ";
        getData(); 

    }); 
    
    
    var displayData = $('#displayData');
    displayData.on("click", getData);
    
    
	
	//any other code needed for addItem page goes here


	//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	

});
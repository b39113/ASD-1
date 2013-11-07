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
    	var item                = {};
        	item.brand    		= ["Brand:", 		$('#brand')		.val()];
        	item.guitarType     = ["Guitar Type:", 	$('#guitarType').val()];
        	item.model          = ["Guitar Model:", $('#model')		.val()];
        	item.strings		= ["# of Strings:", $('#strings')	.val()];
        	item.pickupType     = ["Pickup Type:", 	$('#pickupType').val()];
        	item.finish         = ["Finish:", 		$('#finish')	.val()];
        	item.cost           = ["Cost $:", 		$('#cost')		.val()];
        	item.rate           = ["Rating:", 		$('#rate')		.val()];
        	item.comments		= ["Comments:", 	$('#comments')	.val()];
        	item.date           = ["Date Saved:", 	$('#date')		.val()];
            
    	//This saves the data to the local storage. Stringify converts object back into a string.
    	localStorage.setItem(id, JSON.stringify(item));
    	alert("Guitar Saved. Your List has been updated.");
     
		}
		
		//This gets the data from local storage.
		function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There aren't any guitars in your list at this time so JSON data was added.");
            jsonData();
        }
        //This writes the data from the local storage to the browser.
        var makeDiv = document.createElement('div');   	       //Creates div
        makeDiv.setAttribute("id", "items");                   //Sets ID
        var makeList = document.createElement('ul');   	       //Creates a list.
        makeDiv.appendChild(makeList);                     	   //Adds the list to div.
        document.body.appendChild(makeDiv);                	   //Adds div to the body.
        $('items').style.display = "block";            		   //This makes sure the items display when data is retrieved.
        for (var i=0, len=localStorage.length; i<len; i++){
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            
            //This converts string from local storage back into an object using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');  	//This creates a sub ul.
            makeli.appendChild(makeSubList);
            var appType = obj.appointmentType[1];
            getImage(appType, makeSubList);
            for(var n in obj){
               var makeSubli = document.createElement('li');
               makeSubList.appendChild(makeSubli);
               var optSubText = obj[n][0]+" "+obj[n][1];
               makeSubli.innerHTML = optSubText;
               makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);  //This will make the edit and delete buttons/links for each item in local storage.
        }
    }
    
    //This gets the correct image for the Appointment Type(s) that have been checked.
    function getImage(imgName, makeSubList){
    	var iconLi = document.createElement('li');
    	for (var n in imgName){
    		var newImg = document.createElement('img');
    		var setSrc = newImg.setAttribute("src", "images/ " + imgName[n] + ".png");
    		iconLi.appendChild(newImg);
    	}
    	makeSubList.appendChild(iconLi);
    }
    
   //This Auto Populates the Local Storage with JSON Data for TESTING Purposes.
    function jsonData(){
    	//The actual JSON OBJECT data required for this function to work is coming from our json.js file, which is loaded from our HTML page.
    	//Now store the JSON OBJECT into Local Storage.
    	for(var n in json){
    		var id = Math.floor(Math.random()*100000001);
    		localStorage.setItem(id, JSON.stringify(json[n]));
    	}
    }
    
    //Make Item Links
    //This creates the edit and delete links for each stored item when displayed.
    function makeItemLinks(key, linksLi){
    	//add edit single item link
    	var editLink  = document.createElement('a');
    	editLink.href = "#";
    	editLink.key  = key;
    	var editText  = "Edit This Guitar";
    	editLink.on("click", editItem);
    	editLink.innerHTML = editText;
    	linksLi.appendChild(editLink);
    	
    	//This adds a line break.
    	var breakTag = document.createElement('br');
    	linksLi.appendChild(breakTag);
    	
    	//This adds a delete single item link.
    	var deleteLink  = document.createElement('a');
    	deleteLink.href = "#";
    	deleteLink.key  = key;
    	var deleteText  = "Delete This Guitar";
    	deleteLink.on("click", deleteItem);
    	deleteLink.innerHTML = deleteText;
    	linksLi.appendChild(deleteLink);
    }
    
    

/*
//(ERROR) - This gives back an error of "Uncaught SyntaxError: Unexpected identifier 	main.js:85"
//JSON Data
$('#json').on('click', function(){
	$.ajax({
		url			: "xhr/data.json",
		type		: "GET",
		dataType	: "json",
		success		: function(data, status) {
			console.log(data, status);
			var serializedItem = JSON.stringify(item);  
				console.log(serializedItem).appendTo('#jsonDisplay');
		},
		error		: function(error, parseerror){
			console.log(error, parseerror);
			
		}
		  
	});

})
*/

/*
//(ERROR) - This gives back an error of "Uncaught SyntaxError: Unexpected token ; 	main.js:178"
//XML Data
$('#xml').on('click', function(){
    $.ajax({
        url: 	  'xhr/data.xml',
        type: 	  'GET',
        dataType: 'xml',
        success: function(xml){
        var data  = $.parseXML(xml);
        var items = $(data);
        items.find("item").each(function(){
        	var item = $(this);
        	console.log("Brand:", item.find("brand")).appendTo('#xmlDisplay');
                
});
*/


/*	//(ERROR) - OPTIONS file:///Users/Mark/Desktop/ASD/GuitarWishList/xhr/list.php Origin null is not allowed by Access-Control-Allow-Origin. jquery.js:5446
	//(ERROR) -	XMLHttpRequest cannot load file:///Users/Mark/Desktop/ASD/GuitarWishList/xhr/list.php. Origin null is not allowed by Access-Control-Allow-Origin. index.html?brand=Gibson&guitarType=Electric&model=sdf&strings=6+String&pickupType=EMG&finish=sdf&co…:1
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
            localStorage.clear();
            alert("Your list has been deleted.");
            window.location.reload();
            return false;
        }
    }


	//This sets the link and submits the clicked events.
    var clearData = $('#clearData');
    clearData.on("click", clearLocal);
    var displayData = $('#displayData');
    displayData.on("click", getData);
    
    
	
	//any other code needed for addItem page goes here


	//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	
	

	

	

});

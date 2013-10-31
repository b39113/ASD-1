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
        	item.type              	= ["Guitar Type:", $('#type').val()];
        	item.model              = ["Guitar Model:",$('#model').val()];
        	item.pickUpType         = ["Pickup Type:", $('#pickUpType').val()];
        	item.finish           	= ["Finish:", $('#finish').val()];
        	item.cost               = ["Cost:", $('#cost').val()];
        	item.rate            	= ["Rating:", $('#rate').val()];
        	item.yourDate           = ["Date Saved:", $('#yourDate').val()];
            
    	//This saves the data to the local storage. Stringify converts object back into a string.
    	localStorage.setItem(id, JSON.stringify(item));
    	alert("Your appointment request has been successfully submitted. Someone will contact you shortly to verify your Appointment Date, Time, and Details.");
     
		}
		
		
		function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("No appointments exist for you at this time so JSON data was added.");
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
	
	
    
    //This sets the link and submits the clicked events.
    var saveData = $('submit');
    
    var clearData = $('clearData');
    
    var displayData = $('displayData');
    
    
    
	
	  //any other code needed for addItem page goes here
	  
	




	//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	
	

	

	

});
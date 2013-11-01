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

		//This function finds the value of the selected checkbox button.
		function getCheckboxVal(){
        	var checkboxes = document.forms[0].pickupType;
       			checkedVal() = [];                             //This line stores the captured values of the array.
        	for (var i=0, j=checkboxes.length; i<j; i++){       //This line continuously loops through the array until complete.
            	if (checkboxes[i].checked) {                    //This line checks for any set values of the array.
                	var checkedValue = checkboxes[i].val();     //This line captures the value of the checkboxes in the array.
 					checkedVal().push(checkedVal());           
            	}
        	}
    	}

    	//This function finds the value of the selected radio button.
    	function getSelectedRadio(){
        	var radios = document.forms[0].guitarType;
        	for (var i=0; i<radios.length; i++){
            	if(radios[i].checked) {
                	guitarTypeVal() = radios[i].val();
            	}
        	}
    	}
    

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
        	item.cost               = ["Cost:", $('#cost').val()];
        	item.rate            	= ["Rating:", $('#rate').val()];
        	item.date           	= ["Date Saved:", $('#date').val()];
            
    	//This saves the data to the local storage. Stringify converts object back into a string.
    	localStorage.setItem(id, JSON.stringify(item));
    	alert("Guitar Saved. Your List has been updated.");
     
		}
		
		
		function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There aren't any guitars in the list at this time so JSON data was added.");
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
            var appType = obj.pickUpType[1];
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
    		var setSrc = newImg.setAttribute("src", "images/" + imgName[n] + ".png");
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
    	var editText  = "Edit Guitar";
    	editLink.addEventListener("click", editItem);
    	editLink.innerHTML = editText;
    	linksLi.appendChild(editLink);
    	
    	//This adds a line break.
    	var breakTag = document.createElement('br');
    	linksLi.appendChild(breakTag);
    	
    	//This adds a delete single item link.
    	var deleteLink  = document.createElement('a');
    	deleteLink.href = "#";
    	deleteLink.key  = key;
    	var deleteText  = "Delete Guitar";
    	deleteLink.addEventListener("click", deleteItem);
    	deleteLink.innerHTML = deleteText;
    	linksLi.appendChild(deleteLink);
    }
    
    
	   function editItem(){
    	//1st. Grab the data from the item located in local storage.
    	var value = localStorage.getItem(this.key);
    	var item  = JSON.parse(value);
    	
    	//This shows the form.
    	toggleControls("off");
    	
    	//2nd. Populate the form fields with current localStorage values.
    	$('brand').val() 		= item.brand[1];
    	
    	var radios = document.forms[0].guitarType;
    	for(var i=0; i<radios.length; i++){
    		if(radios[i].val() === item.guitarType[1]){
				radios[i].setAttribute("checked", "checked");
			}
		}
		
		$('model').val()		= item.model[1];
		$('strings').val()		= item.strings[1];
		
    	var checkboxes = document.forms[0].pickupType;
    	for(var i=0; i<checkboxes.length; i++){
           for(var j=0; j<item.pickupType[1].length; j++){
              if(checkboxes[i].val() === item.pickupType[1][j]){
                  checkboxes[i].checked = true;
              }
           }
        }
        
    	$('finish').val()		= item.finish[1];
    	$('cost').val()			= item.cost[1];
    	$('rate').val()			= item.rate[1];
    	$('date').value			= item.date[1];
    	
    	//This removes the initial event listener from the input "submit request" button.
    	saveData.removeEventListener("click", storeData);
    	//This changes the "submit request" button value to "edit appointment".
    	$('submit').val() = "Edit Guitar";
    	var editSubmit = $('submit');
    	//This saves the key value established in this function as a property of the editSubmit event
    	//so it can use that value when we save the data we edited.
    	editSubmit.addEventListener("click", validate);
    	editSubmit.key = this.key;
    	
    	//This stops the duplication of the Items after using the "Edit" link and then selecting the "Display Information" link.
    	var dataDiv = document.getElementById("items");
        dataDiv.parentNode.removeChild(dataDiv);
        
    	}
    
		
		//This deletes all of the data.
		function deleteItem(){
    		var ask = confirm("Are you sure you want to delete this Guitar?");
    		if(ask){
    			localStorage.removeItem(this.key);
    			alert("That guitar has been deleted!");
    			window.location.reload();
    		}else{
    			alert("Your guitar was NOT deleted and will still continue to be listed.");
    		}
    	}
		
		
		//This clears all of the data.
    	function clearLocal(){
        	if(localStorage.length === 0){
            	alert("There is nothing in the list at this time.");
        	}else{
            	localStorage.clear();
            	alert("The list has been deleted.");
            	window.location.reload();
            	return false;
        	}
    	}

    
    
    //This sets the link and submits the clicked events.
    var clearData = $('clearData');
    clearData.click(clearLocal);
    var displayData = $('displayData');
    displayData.click(getData);
    
    
	
	//any other code needed for addItem page goes here


	//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	
	

	

	

});
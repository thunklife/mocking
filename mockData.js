var mock = function(){	
	var apiConfig = [];
	var mockDataConfig = [];
	function set(name){				
		return {
			to: function(data){
				mockDataConfig.push({name: name, data: data })
			}
		}
	};

	function whenRelIs(rel){				
		return {
			respondWith: function(name){	
				apiConfig.push({rel: rel, propName: name});		
			}
		}
	}

	function setupApi(){
		var i = apiConfig.length;
		while(i--){
			console.log(apiConfig[i]);			
		}
	}

	function setupData(){
		var i = mockDataConfig.length, currentItem;
		while(i--){
			currentItem = mockDataConfig[i];
			mock[currentItem.name] = currentItem.data;
			console.log(currentItem);
			console.log(mock[currentItem.name]);
		}
	}

	function bootstrap(){
		setupApi();
		setupData();
	}
	return {
		data: {
			set: set,
		},
		api: {
			whenRelIs: whenRelIs
		},
		bootstrap: bootstrap
	}
}();
(function(){
	var jesse = {id: 1, name: "Jesse"};
	var justin = {id: 2, name: "Justin"};
	var tom = {id: 3, name: "Tom"};

	mock.data.set("jesse").to(jesse);
	mock.data.set("justin").to(justin);
	mock.data.set("tom").to(tom);
	mock.api.whenRelIs("most-awesomest").respondWith("jesse");
})();
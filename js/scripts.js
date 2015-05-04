$(document).ready(function(){

	console.log("INIT");

	//grab data
	$.ajax({
	    url: 'https://inventory.data.gov/api/action/datastore_search?resource_id=38625c3d-5388-4c16-a30f-d105432553a4&q=NY',
	    dataType: 'jsonp',
	    success: function(data) {
	      var arr = createUniArray(data);
	      var abcArr = sortArr(arr);
	      putOnPage(abcArr);
	      runSearch();
	    }
    });

	function createUniArray(data){

		//create new array
		var unis = [];

		_.each(data.result.records,function(r,index){

			//form new object to pass to template
			var institution = {
				url:'http://'+r.WEBADDR,
				name:r.INSTNM
			}

			//add to new array
			unis.push(institution);

		});

		return unis;

	}

	function sortArr(arr){
		//sort in alphabetical order
		var abcOrder = _.sortBy(arr,'name');
		return abcOrder
	}

	function putOnPage(arr){

		//define underscore template
		var listItemTemplate = _.template("<li><a target='_blank' href='<%= url %>'><h3><%= name %> &raquo;</h3></a></li>");

		_.each(arr,function(uni,index){
			//pass object to list item template
			var listItem = listItemTemplate(uni);

			//append to page
			$('#uni-list').append(listItem);
		});

	}

	//after everything is on the page
	function runSearch(){

		var rows = $('#uni-list li');
		$('#search-box').keyup(function(){
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			rows.show().filter(function(){
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});

	}	


});
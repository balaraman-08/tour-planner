function compandchange(stn_tc, spots) {
		// console.log(stn_tc);
		var small = {}
		var tc_small = 999.0;
		for(var i=0; i<10; ++i) {
			if((Math.abs(stn_tc - spots[i].tc)) < tc_small) {
				small = spots[i];
				tc_small = Math.abs(stn_tc - spots[i].tc);
			}
		}
		$('#sname').html(small.name);
		$('#rating').html(small.pop);
		$("#rhead").show();
		return small
}

function main() {
	console.log("Yes");
	$('#go').on('click', function(){
		console.log('Go');
		var spots = {}
		var next = {}
		//Get spot's TC
		$.ajax({
			url: "https://data.convalesce34.hasura-app.io/v1/query",
			contentType: "application/json",
			data: JSON.stringify({
		      "type": "select",
		      "args": {
		            "table": "spots",
		            "columns": [
		                  "*"
		            ]
		      }
			}),
			type: "POST",
			dataType: "json"
		}).done(function(json) {
			console.log(json);
			spots = json
		}).fail(function(xhr, status, errorThrown) {
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});

		//Get station's TC
		$.ajax({
			url: "https://data.convalesce34.hasura-app.io/v1/query",
			contentType: "application/json",
			data: JSON.stringify({
			    "type": "select",
			    "args": {
			        "table": "stations",
			        "columns": [
			            "tc"
			        ],
			        "where": {
			            "name": {
			                "$eq": $("#stn_list").val()
			            }
			        }
			    }
			}),
			type: "POST",
			dataType: "json"
		}).done(function(json) {
			console.log(json);
			next = compandchange(json[0].tc, spots);
			console.log(next);
		}).fail(function(xhr, status, errorThrown) {
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	});
	
}


$(document).ready(main);
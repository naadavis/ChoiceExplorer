// function that takes a list
// and turns it into an object representation of that list
function listToObject( l )
{
	var r = {};
	r.length = l.length;
	console.log("Testing")
	for( var i = 0; i < l.length; i++ )
		r[i.toString()] = l[i];
	if( ! $.isPlainObject(r) )
	{
		console.log("It wasn't a plain object!");
		r = {};
	}
	return r;
}

// Bind this function to the add/remove functions/clicks on the view
// uses Active from data, so this has to be correct
// also relaunches the visualization
var submit_form = function(e) {
	var tosend = listToObject(data.Active);
	//console.log(tosend);
	$.getJSON($SCRIPT_ROOT + '/_get_recs', tosend, function(result) {
		data = result;
		// now reload the visulization
	});
	return false;
}

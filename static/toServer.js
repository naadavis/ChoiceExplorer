// function that takes a list
// and turns it into an object representation of that list
function listToObject( l )
{
	var r = {};
	r.length = l.length;
	//console.log("Testing")
	for( var i = 0; i < l.length; i++ )
		r[i.toString()] = l[i];
	if( ! $.isPlainObject(r) )
	{
		console.log("It wasn't a plain object!");
		r = {};
	}
	return r;
}

// Gets a new list of recommendations
// uses Active from data, so this has to be correct
// also relaunches the visualization
function get_new_recs() {
	var tosend = listToObject(data.Active);
	//console.log(tosend);
	$.getJSON($SCRIPT_ROOT + '/_get_recs', tosend, function(result) {
		data = result;
		// now reload the visulization
		removeVisualization();
		updateVisualization();
	});
	return false;
}

// Removes an item from Active
function removeItem( element )
{
	var item = element.__data__;
	var pos = data.Active.indexOf( item );
	if( pos != -1 )
		data.Active.splice(pos,1);
	get_new_recs();
}

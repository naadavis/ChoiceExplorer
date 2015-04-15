/*
Nicholas Davis
Panel 1 Functions/Formatting
*/

function updatePanel1()
{
	var activeR = svg1.selectAll("rect").filter(".users")
		.data( dataPoints.data.slice(0,12), function(d) { return d.id; } );
	var activeT = svg1.selectAll("text").filter(".text.users")
		.data( dataPoints.data.slice(0,12), function(d) { return d.id; } );
	// Remove Inactive items
	activeR.exit().remove();
	activeT.exit().remove();
	// Update Existing Rectangles
	activeR.each( updateRect( 1 , 0 ) );
	// Update Text
	activeT.each( updateText( 1 , 0 ) )
		.text( function(d) {
			return "User #" + d.id + " score " + d.score; });
	// Add New Items
	activeR.enter()
		.append("rect")
		.attr("class","users")
		.attr("onmouseout","mouseOut()")
		.attr("onmouseover","mouseOverPanel1(evt.target)")
		.attr("onclick","changeUser(evt.target)")
		.each( formatRect( 1, 0 ) )
		.each( updateRect( 1, 0 ) )
		.attr( "width",rWidth)
		.attr( "height",rHeight)
		.attr("fill","lightgreen");

	activeT.enter()
		.append("text")
		.attr("class","text users")
		.text( function(d) {
			return "User #" + d.id + " score " + d.score; })
		.attr("onmouseover","mouseOverText1(evt.target)")
		.attr("onmouseout","mouseOut()")
		.attr("onclick","changeUserText(evt.target)")
		.each( formatText( 1, 0 ) )
		.attr("opacity",1);
}

function shiftRight( dx )
{
	return function(d,i) 
	{
		var current = parseInt( this.getAttribute("x") );
		svg1.select("#" + this.id)
			.transition()
			.attr("x", current + 20 )
			.remove();
	}
}

function moveRight(dx)
{
	var current = this.getAttribute("x");
	return current + dx;
}

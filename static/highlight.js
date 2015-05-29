/*
Nicholas Davis
*/
// Milisecond variables to affect delay and duration of highlighting effects
var delay = 300;
var duration = 350;

// Function to see if an item is present in a list
function inArray(list,item)
{
	for( var i = 0; i < list.length; i++ )
		if( item == list[i] )
			return true
	return false
}

// Remove highlighting effects on rectangles and remove paths
function mouseOut()
{
	canvas.selectAll( ".col1 rect,.col3 rect,.col2 rect" )
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("opacity",.7)
		.attr("stroke-width",2);
	canvas.selectAll( "path" )
		.transition()
		.duration(duration)
		.delay(50)
		.remove();
	canvas.selectAll( ".info" )
		.transition()
		.duration(duration)
		.delay(50)
		.remove()
}

// Mouse Over User effects
function mouseOverEndPanel(element)
{
	var item = element.__data__;
	// match with users
	var matches = col2.selectAll("rect").filter( function(d) { return inArray(d[1],item); } );
	var misses = col2.selectAll("rect").filter( function(d) { return !inArray(d[1],item); } );

	misses.transition()
		.duration(duration)
		.delay(delay)
		.attr("opacity",.2);

	matches.each( function(d,i) { connect( element, this ); } );

	// dim other items
	var notcurr = canvas.selectAll(".col1 rect,.col3 rect")
		.data( [item], function(d) { return d;});

	notcurr.exit()
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("opacity",.2);

	// highlight currently selected user

	// Display Info Box
	canvas.append("svg:image")
		.attr("class","info")
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("xlink:href", function(d) { return "/static/recs/" + item.replace(/ /g,"") + ".png"; } )
		.attr("viewBox","0 0 270 615")
		.attr("preserveAspectRatio", "none")
		.attr("x",INFO_LEFT)
		.attr("y",TOP_MARGIN)
		.attr("width",270)
		.attr("height",615);

		//.attr("x",3*PANEL_W + LEFT_MARGIN - 20 )
}

function mouseOverPanel2(element)
{
	var clist = element.__data__[1];
	var name = element.__data__[0];
	// Dim Courses not connected with user
	var matches = canvas.selectAll( ".col1 rect,.col3 rect" )
		.data( clist, function(d) { return d;})

	matches.exit()
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("opacity",.2);

	// Connect Courses that user has
	matches.each( function(d,i) { connect( element, this ) });

	// dim other users
	var notcurr = col2.selectAll("rect").filter( function(d) { return d[0] != element.__data__[0]; } );

	notcurr
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("opacity",.2);


	// Highlight Currently Selected User
	canvas.append("rect")
		.attr("class","info")
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("stroke","black")
		.attr("stroke-width",2)
		.attr("height",150)
		.attr("width",160)
		.attr("x",INFO_LEFT - 80 + 270/2 )
		.attr("y",TOP_MARGIN + 15 );
	canvas.append("svg:image")
		.attr("class","info")
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("xlink:href", "/static/pics/" + name.replace(/ /g,"") + ".jpg" )
		.attr("height",150)
		.attr("width",160)
		.attr("x",3*PANEL_W + LEFT_MARGIN - 100 + 270/2 )
		.attr("y",TOP_MARGIN + 15 );
	canvas.append("text")
		.attr("class","info")
		.attr("fill","white")
		.attr("font","sans-serif")
		.attr("font-size","28px")
		.attr("text-anchor","middle")
		.transition()
		.duration(duration)
		.delay(delay)
		.text(name)
		.attr("x",INFO_LEFT + 270/2 )
		.attr("y",TOP_MARGIN + 15 + 180 );
	canvas.append("text")
		.attr("class","info")
		.attr("fill","white")
		.attr("font","sans-serif")
		.attr("font-size","18px")
		.attr("text-anchor","start")
		.transition()
		.duration(duration)
		.delay(delay)
		.text("Listens To:")
		.attr("x",INFO_LEFT + 15 )
		.attr("y",TOP_MARGIN + 15 + 230 );
	canvas.selectAll( ".info")
		.data( clist, function(d) { return d;})
		.enter()
		.append("text")
		.attr("class","info")
		.attr("fill","white")
		.attr("font","sans-serif")
		.attr("font-size","14px")
		.attr("text-anchor","start")
		.transition()
		.duration(duration)
		.delay(delay)
		.text( function(d) { return "+ " +  d; } )
		.attr("x", INFO_LEFT + 25 )
		.attr("y", function(d,i) { return TOP_MARGIN + 270 + 20*i } );
	




}

function mouseOverText2( element )
{
	var rect = d3.select(element.parentNode).select("rect");
	mouseOverPanel2(rect[0][0]);
}

function mouseOverEndText( element )
{
	var rect = d3.select(element.parentNode).select("rect");
	mouseOverEndPanel(rect[0][0]);
}

// Mouse Over Course Effects
// Works with both current courses and recommended courses
function mouseOverPanel0(element)
{
	var courseID = element.__data__;
	if( element.__data__.hasOwnProperty("id") )
	{
		courseID = element.__data__.id.slice(1);
	}
	// Fade non-matches
	svg1.selectAll("rect")
		.filter( function(d) {
			return ! ( typeof d === 'undefined' || ( d.hasOwnProperty("courses") && inArray( courseID, d.courses ) ) ); })
		.transition()
		.delay(delay)
		.duration(duration)
		.attr("opacity",.2);
	// Highlight current
	svg1.select("#" + element.id ).transition().delay(delay).attr("opacity",.9).attr("stroke-width","3px");
	//connect matches
	svg1.selectAll("rect")
		.filter( function(d) {
			return ( ( ! (typeof d === 'undefined') ) && ( d.hasOwnProperty("courses") && inArray( courseID, d.courses ) ) ); })
		.each( function(d,i) { connect( element, this ) });
}

function mouseOverText0(element)
{
	rectID = "rect" + element.id.slice(4,element.id.length);
	rect = document.getElementById(rectID);
	mouseOverPanel0(rect);
}

// Function to create path variables between two elements
function connect( element1, element2 )
{
	el1 = d3.transform(d3.select(element1.parentNode).attr("transform"));
	el2 = d3.transform(d3.select(element2.parentNode).attr("transform"));
	// Fix order of x position of elements if needed
	var e1 = el1.translate;
	var e2 = el2.translate;
	if( e1[0] > e2[0] )
	{
		e1 = el2.translate;
		e2 = el1.translate;
	}
	// Calculate the middle of what will be the final position of the rectangles
	// Create Path variables
	var x1 = e1[0] + RECT_W;
	var y1 = e1[1] + RECT_H / 2;
	var x2 = e2[0];
	var y2 = e2[1] + RECT_H / 2;
	drawPath( x1, y1, x2, y2 );
}

// Handles the actual drawing of the path
function drawPath( x1, y1, x2, y2 )
{
	var M = "M " + x1 + " " + y1 + " ";
	var H1 = "L " + ( x1 + 10 ) + " " + y1 + " ";
	var L = "L " + ( x2 - 10 ) + " " + y2 + " ";
	var H2 = "L " + x2 + " " + y2;
	canvas.append("svg:path")
		.style("opacity",0)
		.transition()
		.delay(delay)
		.duration(duration)
		.style("opacity",.8)
		.attr("d", M + H1 + L + H2 )
		.style("stroke-width",3)
		.style("stroke","steelblue")
		.style("fill","none");
}

/*
Nicholas Davis
*/
// Milisecond variables to affect delay and duration of highlighting effects
var delay = 300;
var duration = 350;

// Key Functions to use as parameters in d3js data selections
function dataKey1( point )
{
	if( typeof point === 'undefined' )
		return "UNMATCHED";
	if( point.hasOwnProperty("id") )
		return point.id;
	else
		return "c" + point;
}

function dataKey2( point )
{
	if( typeof point === 'undefined' )
		return 'UNMATCHED';
	if( point.hasOwnProperty("id") )
	{
		return point.id;
	}
	else
	{
		return point;
	}
}

// Remove highlighting effects on rectangles and remove paths
function mouseOut()
{
	svg1.selectAll( "rect" )
		.transition()
		.duration(duration)
		.delay(delay)
		.attr("opacity",.7)
		.attr("stroke-width",2);
	svg1.selectAll( "path" )
		.transition()
		.duration(duration)
		.delay(50)
		.remove();
}

// Mouse Over User effects
function mouseOverPanel1(element)
{
	var clist = element.__data__.courses;
	// Dim Courses not connected with user
	svg1.selectAll( "rect" )
		.data( clist, dataKey1)
		.exit()
		.transition()
		.delay(delay)
		.duration(duration)
		.attr("opacity",.2);
	// Connect Courses that user has
	svg1.selectAll( "rect" )
		.data( clist, dataKey1)
		.each( function(d,i) { connect( element, this ) });
	// Highlight Currently Selected User
	svg1.select( "#" + element.id ).transition().delay(delay).attr("opacity",.9).attr("stroke-width","3px");
	// Highlight Company + Connect
	company = "co" + element.__data__.company;
	svg1.selectAll( "rect" )
		.data(  [ company ], dataKey2 )
		.each( function(d,i) { connect( element, this ) })
		.transition().delay(delay).duration(duration).attr("opacity",.7);
	
}

function mouseOverText1( element )
{
	rectID = "rect" + element.id.slice(4,element.id.length);
	rect = document.getElementById(rectID);
	mouseOverPanel1(rect);
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

// Mouse Over Company Effects
function mouseOverCompany( element )
{
	var comp = element.__data__;
	// handle cases of mis-binded data
	if ( comp.hasOwnProperty("id") )
	{
		comp = element.__data__.id.slice(2);
	}
	else
	{
		comp = comp.slice(2);
	}
	//Fade non-matches
	svg1.selectAll("rect")
		.filter( function(d) {
			return ! ( typeof d === 'undefined' || ( d.hasOwnProperty("company") && d.company == comp  ) ); })
		.transition()
		.delay(delay)
		.duration(duration)
		.attr("opacity",.2);
	// Highlight current
	svg1.select("#" + element.id ).transition().delay(delay).attr("opacity",.9);
	//connect matches
	svg1.selectAll("rect")
		.filter( function(d) {
			return ( ! ( typeof d === 'undefined' ) && d.hasOwnProperty("company") && d.company == comp  ); })
		.each( function(d,i) { connect( element, this ) });
}

function mouseOverTextCompany(element)
{
	rectID = "rect" + element.id.slice(4,element.id.length);
	rect = document.getElementById(rectID);
	mouseOverCompany(rect);
}

// Function to create path variables between two elements
function connect( element1, element2 )
{
	// Fix order of x position of elements if needed
	var e1 = element1;
	var e2 = element2;
	if ( parseInt( e1.getAttribute("x") ) > parseInt( e2.getAttribute("x") ) )
	{
		e1 = element2;
		e2 = element1;
	}
	// Calculate the middle of what will be the final position of the rectangles
	e1y = Math.floor( ( e1.getAttribute("y") - tHeight ) / hPadding ) * hPadding + tHeight;
	e2y = Math.floor( ( e2.getAttribute("y") - tHeight ) / hPadding ) * hPadding + tHeight;
	// Create Path variables
	var x1 = parseInt( e1.getAttribute("x") ) + parseInt( e1.getAttribute("width") );
	var y1 = parseInt( e1y ) + parseInt( e1.getAttribute("height") ) / 2;
	var x2 = e2.getAttribute("x");
	var y2 = parseInt( e2y ) + parseInt( e2.getAttribute("height") ) / 2;
	drawPath( x1, y1, x2, y2 );
}

// Handles the actual drawing of the path
function drawPath( x1, y1, x2, y2 )
{
	var M = "M " + x1 + " " + y1 + " ";
	var H1 = "L " + ( x1 + 10 ) + " " + y1 + " ";
	var L = "L " + ( x2 - 10 ) + " " + y2 + " ";
	var H2 = "L " + x2 + " " + y2;
	svg1.append("svg:path")
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

// Old function no longer in use
// deprecated by drawpath
function drawLine( x1, y1, x2, y2 )
{
	svg1.append("svg:line")
		.attr("x1", x1 )
		.attr("y1", y1 )
		.attr("x2", x2 )
		.attr("y2", y2 )
		.attr("opacity",.7)
		.style("stroke-width","3px")
		.style("stroke","blue"); 
}

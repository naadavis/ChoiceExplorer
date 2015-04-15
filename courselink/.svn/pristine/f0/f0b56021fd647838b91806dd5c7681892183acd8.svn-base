/* 
Nicholas Davis
*/

// Titles
var titles = [ "Current Courses", "Courses", "Companies", "Your Profile", "Similar Students", "Recommendations" ];

svg1.selectAll("text").data( titles.slice(3), function(d) { return d; } )
	.enter().append("text")
	.attr("text-anchor","middle")
	.attr("dominant-baseline","middle")
	.attr("y", tHeight / 2 )
	.attr("x", function(d,i) { return i*pWidth + pWidth/2; })
	.attr("font-family", "sans-serif" )
	.attr("fill","green" )
	.attr("font-size","25px" )
	.attr("font-weight", "bolder" )
	.text( function(d) { return d; } );

// General Formatting for Panelled Text and Rectangles
function formatText( panel, addI )
{
	return function (d,i) {
		this.id = "text" + panel + "" + ( i + addI );
		svg1.select("#" + this.id)
		.attr("opacity",0)
		.attr("y", ( i + addI ) * hPadding + tHeight + rHeight/2 + 4 )
		.attr("x", panel*pWidth + ( pWidth - rWidth  ) / 2 + rXY );
	};
}

function updateText( panel, addI )
{
	return function (d,i) {
		this.id = "Temptext";
		svg1.select("#" + this.id)
			.transition()
			.delay(30)
			.attr("opacity",1)
			.attr("y", ( i + addI ) * hPadding + tHeight + rHeight/2 + 4 )
			.attr("x", panel*pWidth + ( pWidth - rWidth  ) / 2 + rXY );
		this.id = "text" + panel + "" + ( i + addI );
	};
}

function formatSubTText( panel, addi )
{
	return function (d, i ) {
		this.id = "text" + panel + "" + ( i + addi );
		svg1.select("#" + this.id)
		.attr("text-anchor", "left")
		.attr("y", ( i + addi ) * hPadding + tHeight + rHeight/2 + 4 )
		.attr("x", panel*pWidth + ( pWidth - rWidth )/2)
		.attr("font-family", "sans-serif")
		.attr("font-size", "14px" )
		.attr("font-weight", "bold" )
		.attr("opacity",.7)
		.attr("fill", "green" );
	}
}

function formatRect( panel, addI )
{
	return function (d,i) {
		this.id = "rect" + panel + "" + ( i + addI );
		svg1.select("#" + this.id)
			.attr("opacity", 0)
			.attr("rx",rXY)
			.attr("ry",rXY)
			.attr("width",rWidth)
			.attr("height",rHeight)
			.attr("stroke", "black")
			.attr("stroke-width",2);
	};
}

function updateRect( panel, addI )
{
	return function( d, i )
	{
		// create a temp id to do transformations on
		this.id = "temporaryRECT";
		svg1.select("#" + this.id)
			.transition()
			.delay(30)
			.attr("y", ( i + addI ) * hPadding + tHeight )
			.each( function(d) {  y = ( i + addI ) * hPadding + tHeight } )
			.attr("opacity", .7 )
			.attr("x", panel*pWidth + padding );
		this.id = "rect" + panel + "" + ( i + addI );
	};
}

function createView()
{
// Panel 0
	// Sub Title 
	svg1.append("text").datum( titles[0] )
		.text( titles[0] ).each( formatSubTText( 0, 0 ) ).attr("fill","blue");

	svg1.selectAll("rect")
		.data(user.courses, function(d) { return "c" + d })
		.enter()
		.append("rect")
		.attr("class","currentCourses")
		.attr("onmouseout","mouseOut()")
		.attr("onmouseover","mouseOverPanel0(evt.target)")
		.attr("onclick","removeCourse(evt.target)")
		.each( formatRect( 0, 1 ) )
		.each( updateRect( 0, 1 ) )
		.attr("fill","lightblue");

	svg1.selectAll("text")
		.data(user.courses, function(d) { return "c" + d})
		.enter()
		.append("text")
		.attr("class","text cCourses")
		.attr("onmouseover","mouseOverText0(evt.target)")
		.attr("onmouseout","mouseOut()")
		.attr("onclick","removeCourseText(evt.target)")
		.text( function(d) {
			return "Course #" + d; })
		.each( formatText( 0, 1 ) )
		.attr("opacity",1);

// Panel 1
	svg1.selectAll("rect")
		.data(dataPoints.data.slice(0,12), function(d) { return d.id;})
		.enter()
		.append("rect")
		.attr("class","users")
		.attr("onmouseout","mouseOut()")
		.attr("onmouseover","mouseOverPanel1(evt.target)")
		.attr("onclick","changeUser(evt.target)")
		.each( formatRect( 1, 0 ) )
		.each( updateRect( 1, 0 ) )
		.attr("fill","lightgreen");

	svg1.selectAll("text")
		.data(dataPoints.data.slice(0,12), function(d) { return d.id;})
		.enter()
		.append("text")
		.attr("class","text users")
		.text( function(d) {
			return "User #" + d.id + " score " + d.score; })
		.attr("onmouseover","mouseOverText1(evt.target)")
		.attr("onmouseout","mouseOut()")
		.attr("onclick","changeUserText(evt.target)")
		.each( formatText( 1, 0 ) )
		.attr("opacity",1);

// Course Recommendations
	svg1.append("text").datum( titles[1] )
		.text( titles[1] ).each( formatSubTText( 2, 0 ) ).attr("fill","blue");

	svg1.selectAll("rect")
		.data(recs.rankedCourse.slice(0,7), function(d) { return d.id;})
		.enter()
		.append("rect")
		.attr("class","recommendedCourses")
		.attr("onmouseout","mouseOut()")
		.attr("onmouseover","mouseOverPanel0(evt.target)")
		.attr("onclick","addCourse(evt.target)")
		.each( formatRect( 2, 1 ) )
		.each( updateRect( 2, 1 ) )
		.attr("fill","lightblue");

	svg1.selectAll("text")
		.data(recs.rankedCourse.slice(0,7), function(d) {return d.id;})
		.enter()
		.append("text")
		.attr("class","text rCourses")
		.attr("onclick","addCourse(evt.target)")
		.attr("onmouseover","mouseOverText0(evt.target)")
		.attr("onmouseout","mouseOut()")
		.text( function(d) {
			return  "Course #" + d.id.slice(1) + " : " + Math.round(d.score * 100 ) / 100; })
		.each( formatText( 2, 1 ) )
		.attr("opacity",1)
		.attr("fill","black");

// Company Recommendations
	svg1.append("text").datum( titles[2] )
		.text( titles[2] ).each( formatSubTText( 2, 8 ) ).attr("fill","blue");

	svg1.selectAll("rect")
		.data(recs.rankedComp, function(d) {return d.id;})
		.enter()
		.append("rect")
		.attr("class","rCompanies")
		.attr("onmouseover","mouseOverCompany(evt.target)")
		.attr("onmouseout","mouseOut()")
		.each( formatRect( 2, 9 ) )
		.each( updateRect( 2, 9 ) )
		.attr("fill","pink");

	svg1.selectAll("text")
		.data(recs.rankedComp, function(d) {return d.id})
		.enter()
		.append("text")
		.attr("class","text rCompanies")
		.text( function(d) { return "Company #" + d.id.slice(2) +" : " + Math.round(d.score * 100)/100; } )
		.attr("onmouseover","mouseOverTextCompany(evt.target)")
		.attr("onmouseout","mouseOut()")
		.each( formatText(2, 9) )
		.attr("opacity",1);

	svg1.append("rect")
		.attr("width",1.7*pWidth)
		.attr("height",hPadding*7)
		.attr("stroke","black")
		.each( updateRect( 3 , 1 ) )
		.attr("class","staticRect")
		.attr("fill","lightgrey");

	var tips = [
				"Courses",
				"Mouse over courses to see which users have taken the course.",
				"Click on the course to add or remove it from your current courses.",
				"Similar Students",
				"Mouse over a student to see which courses they have taken.",
				"Click on a student to replace your courses with theirs."
			];

	svg1.selectAll(".info")
		.data( tips, function(d) {return d;} )
		.enter()
		.append("text")
		.attr("class","info")
		.text( function(d,i) {if( i % 3 == 0 ) return " " + d; return "-- " + d;} )
		.each( formatText( 3 , 2 ) )
		.attr("opacity",1);

	svg1.append("text")
		.attr("class","info header")
		.text("User Tips")
		.each( formatText(3,1) )
		.attr("transform","translate(220,0)")	// temporary fix, set x instead after formatting
		.attr("opacity",1);
}

function destroyView()
{
	svg1.selectAll("rect").data([-1,-1], function(d) { return d; }).exit().remove();
	svg1.selectAll("text").data(titles.slice(3), function(d) { return d; }).exit().remove();
	svg1.selectAll( "path" ).remove();
}

function updateView()
{
	// Remove Highlighting and connections
	svg1.selectAll( "path" ).remove();
	svg1.selectAll( "rect" ).attr( "opacity", .7 );
	
	// Update The Panels
	updatePanel0();
	updatePanel1();
	updatePanel2();
}

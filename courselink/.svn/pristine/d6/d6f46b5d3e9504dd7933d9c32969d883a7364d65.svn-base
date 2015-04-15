/*
Nicholas Davis
Panel 0 Functions/Formatting
*/

function updatePanel0()
{
	//Panel 0
	// Remove Non-existent Items
	svg1.selectAll("rect").filter(".currentCourses")
		.data(user.courses, function(d) { return "c" + d })
		.exit()
		.remove();

	svg1.selectAll("text").filter(".text.cCourses")
		.data(user.courses, function(d) { return "c" + d })
		.exit()
		.remove();

	// Update Existing Rectangles and Text
	svg1.selectAll("rect").filter(".currentCourses")
		.data(user.courses, function(d) { return "c" + d })
		.each( updateRect( 0 , 1 ) );

	svg1.selectAll("text").filter(".text.cCourses")
		.data(user.courses, function(d) { return "c" + d })
		.each( updateText( 0 , 1 ) );

	// Add New Rectangles
	svg1.selectAll("rect").filter(".currentCourses")
		.data(user.courses, function(d) { return "c" + d })
		.enter()
		.append("rect")
		.attr("class","currentCourses")
		.attr("onmouseout","mouseOut()")
		.attr("onmouseover","mouseOverPanel0(evt.target)")
		.attr("onclick","removeCourse(evt.target)")
		.each( formatRect( 0 , 1 ) )
		.each( updateRect( 0 , 1 ) )
		.attr( "width",rWidth)
		.attr( "height",rHeight)
		.attr("fill","lightblue");
	// Add New Text
	svg1.selectAll("text").filter(".text.cCourses")
		.data(user.courses, function(d) { return "c" + d })
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
}

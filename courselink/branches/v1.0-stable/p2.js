/*
Nicholas Davis
Panel 2 Functions/Formatting
*/

function updatePanel2()
{
	// Get data points to be shown
	var activeR = svg1.selectAll("rect").filter(".recommendedCourses")
		.data(recs.rankedCourse.slice(0,7), function(d) { return  d.id; });
	
	var activeT = svg1.selectAll("text").filter(".text.rCourses")
		.data(recs.rankedCourse.slice(0,7), function(d) { return  d.id; });

	// Remove any Items that are not active
	activeR.exit().remove();
	activeT.exit().remove();

	// Update Existing Rectangles
	activeR = svg1.selectAll("rect").filter(".recommendedCourses")
		.data(recs.rankedCourse.slice(0,7), function(d) { return  d.id; });
	activeR.each( updateRect( 2 , 1 ) )
		.attr( "fill", "lightblue");
	// Update Text
	activeT.each( updateText( 2 , 1 ) )
		.text( function(d) {
			return  "Course #" + d.id.slice(1) + " : " + Math.round(d.score * 100 ) / 100; });

	// Add any New Items
	svg1.selectAll("rect").filter(".recommendedCourses")
		.data(recs.rankedCourse.slice(0,7), function(d) { return  d.id; })
		.enter()
		.append("rect")
		.attr("class","recommendedCourses")
		.attr("onmouseout","mouseOut()")
		.attr("onmouseover","mouseOverPanel0(evt.target)")
		.attr("onclick","addCourse(evt.target)")
		.each( formatRect( 2, 1 ) )
		.each( updateRect( 2, 1 ) )
		.attr("width",rWidth)
		.attr("height",rHeight)
		.attr("fill","lightblue");


	svg1.selectAll("text").filter(".text.rCourses")
		.data(recs.rankedCourse.slice(0,7), function(d) { return d.id; })
		.enter()
		.append("text")
		.attr("class","text rCourses")
		.attr("onclick","addCourse(evt.target)")
		.attr("onmouseover","mouseOverText0(evt.target)")
		.attr("onmouseout","mouseOut()")
		.text( function(d) {
			return  "Course #" + d.id.slice(1) + " : " + Math.round(d.score * 100 ) / 100; })
		.each( formatText( 2 , 1 ) )
		.each( updateText( 2, 1 ) )
		.attr("fill","black");

	// Bring text to front
	svg1.selectAll(".text.rCourses").moveToFront();
	updateCompanies();
}

function updateCompanies()
{
	var activeR = svg1.selectAll("rect").filter(".rCompanies")
		.data(recs.rankedComp, dataKey2);
	var activeT = svg1.selectAll("text").filter(".text.rCompanies")
		.data(recs.rankedComp, function(d) { return d.id; });

	// Remove any Items that are not active
	activeR.exit().remove();
	activeT.exit().remove();

	// Update Existing Items
	activeR.each( updateRect( 2, 9 ) );
	activeT.each( updateText( 2, 9 ) )
		.text( function(d) { return "Company #" + d.id.slice(2) +" : " + Math.round(d.score * 100)/100; } );

	// for now thats it. change later
	//-----TO DO-----------
	// adding new companies


}

d3.selection.prototype.moveToFront = function()
{
	return this.each(function() {
		this.parentNode.appendChild(this);
		});
};

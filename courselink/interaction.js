/* 
Nicholas Davis
*/

// Functions that govern the effect of clicking on elements

function addCourse( element )
{
	var rectID = "rect" + element.id.slice(4);
	var textID = "text" + element.id.slice(4);
	var rect = document.getElementById( rectID );
	var text = document.getElementById( textID );
	// get data and push it to current course list
	// Two different ways to retrieve the data, as data format changes unexpectedly
	var course =  element.__data__;
	if( element.__data__.hasOwnProperty("id") )
	{
		course = parseInt(element.__data__.id.slice(1));
	}
	user.courses.push(course);
	// modify element data as well
	rect.__data__ = course;
	text.__data__ = course;
	// allow other modifications to happen elsewhere
	addCourseRect( rect );
	addCourseText( text );
	// update
	update();
}

function addCourseRect( element )
{
	// change class of selected course
	svg1.select("#" + element.id )
		.attr("class","currentCourses")
		.attr("onclick","removeCourse(evt.target)");
}

function addCourseText( element )
{
	// change class
	svg1.select("#" + element.id )
		.attr("class","text cCourses")
		.text( function(d) { return "Course #" + d; })
		.attr("onclick","removeCourseText");
}

function removeCourse( element )
{
	var course = element.__data__;
	var pos = user.courses.indexOf( course );
	user.courses.splice(pos,1);
	update();
}

function removeCourseText( element )
{
	var rectID = "rect" + element.id.slice(4);
	var rect = document.getElementById( rectID );
	removeCourse( rect );
}

function changeUser( element )
{
	var courselist = element.__data__.courses;
	user.courses = [];
	for( var i = 0; i < courselist.length; i++ )
	{
		user.courses.push( courselist[i] );
	}
	update();
}

function changeUserText( element )
{
	var rectID = "rect" + element.id.slice(4);
	var rect = document.getElementById( rectID );
	changeUser( rect );
}


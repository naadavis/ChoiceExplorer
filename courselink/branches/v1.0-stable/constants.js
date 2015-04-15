/*
Nicholas Davis
4Eyes Lab Summer Project
Header-like File to Define constants
*/

// Layout Constants
var pWidth = 300;	// Width of entire panel
var rWidth = 200;	// Size of rectangle inside panel
var rHeight = 30;	// Height of Rectangle
var hPadding = 40;	// Padding in-between rectangles
var rXY = 7;		// curvature of rectangle edges
var padding = (pWidth - rWidth ) / 2;	// Width of padding on each side of panel
var tHeight = 55;	// Height of Titles of each column

// SVG Canvas area
var svg1 = d3.select("body")
	.append("svg")
	.attr("width", 5 * pWidth)
	.attr("height", 1000);

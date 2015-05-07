var data = {
	"Active": ["list","of","user","artists"],
	"Relevant" : [
		["Person 1", ["list","of","person1","artists"] ],
		["Person 2", ["list","of","person2","artists"] ],
	],
	"Rec": ["list","of","recommended","artists"]
}

var PANEL_W = 300;
var RECT_W = 200;
var RECT_H = 30;
var H_MARGIN = ( PANEL_W - RECT_W ) / 2;
var V_MARGIN = 10;
var TOP_MARGIN = 50;
var RXY = 7;

var width = 1000,
	height = 700;

// global vars that point to selections

var canvas,col1,col2,col3;

window.onload = function createVisualization() {

canvas = d3.select(".canvas")
	.attr("width",width)
	.attr("height",height);

updateVisualization();

}

// Creates the three column visualization based on data object
function updateVisualization() {

col1 = canvas.selectAll("g .col1").data(data.Active)
	.enter().append("g")
	.attr("class","col1")
	.attr("transform", function(d,i) { 
		return "translate(" + H_MARGIN + "," + ( i * ( 30 + V_MARGIN ) + TOP_MARGIN ) + ")"; });

col1.append("rect")
	.attr("width",RECT_W)
	.attr("height",RECT_H)
	.attr("onmouseover","mouseOverEndPanel(evt.target)")
	.attr("onmouseout","mouseOut()")
	.attr("onclick","removeItem(evt.target)")
	.attr("rx",RXY)
	.attr("ry",RXY);

col1.append("text")
	.attr("x", 10 )
	.attr("y", RECT_H / 2 )
	.attr("dy", ".35em" )
	.attr("onmouseover","mouseOverEndText(evt.target)")
	.attr("onmouseout","mouseOut()")
	.attr("onclick","removeItem(evt.target)")
	.text(function(d) { return d; } );

col2 = canvas.selectAll("g .col2").data(data.Relevant)
	.enter().append("g")
	.attr("class","col2")
	.attr("transform", function(d,i) {
		return "translate(" + ( H_MARGIN + PANEL_W ) + "," + ( i * ( 30 + V_MARGIN ) + TOP_MARGIN ) + ")"; });

col2.append("rect")
	.attr("width",RECT_W)
	.attr("height",RECT_H)
	.attr("onmouseover","mouseOverPanel2(evt.target)")
	.attr("onmouseout","mouseOut()")
	.attr("rx",RXY)
	.attr("ry",RXY);

col2.append("text")
	.attr("x", 10 )
	.attr("y", RECT_H / 2 )
	.attr("dy", ".35em" )
	.attr("onmouseover","mouseOverText2(evt.target)")
	.attr("onmouseout","mouseOut()")
	.text(function(d) { return d[0]; } );

col3 = canvas.selectAll("g .col3").data(data.Rec)
	.enter().append("g")
	.attr("class","col3")
	.attr("transform", function(d,i) {
		return "translate(" + ( H_MARGIN + 2*PANEL_W ) + "," + ( i * ( 30 + V_MARGIN ) + TOP_MARGIN ) + ")"; });

col3.append("rect")
	.attr("width",RECT_W)
	.attr("height",RECT_H)
	.attr("onmouseover","mouseOverEndPanel(evt.target)")
	.attr("onmouseout","mouseOut()")
	.attr("rx",RXY)
	.attr("ry",RXY);

col3.append("text")
	.attr("x", 10 )
	.attr("y", RECT_H / 2 )
	.attr("dy", ".35em" )
	.attr("onmouseover","mouseOverEndText(evt.target)")
	.attr("onmouseout","mouseOut()")
	.text(function(d) { return d; } );
}

function removeVisualization()
{
	col1.remove();
	col2.remove();
	col3.remove();
}

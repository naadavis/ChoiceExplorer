var data = {
	"Active": ["Daughter","The National","Damien Rice"],
	"Relevant" : [
	],
	"Rec": ["list","of","recommended","artists"]
}

var PANEL_W = 350;
var RECT_W = 200;
var RECT_H = 70;
var H_MARGIN = ( PANEL_W - RECT_W ) / 2;
var V_MARGIN = 10;
var TOP_MARGIN = 150;
var LEFT_MARGIN = 50;
var RXY = 7;
var INFO_LEFT = 3*PANEL_W + LEFT_MARGIN - 20;

/*
var width = 1400,
	height = 500;
	*/
var width = window.innerWidth,
	height = window.innerHeight;

// global vars that point to selections

var canvas,col1,col2,col3;

window.onload = function createVisualization() {

canvas = d3.select(".canvas")
	.attr("width",width)
	.attr("height",height);

// create static parts of display
canvas.append("text")
	.attr("x",LEFT_MARGIN + RECT_W/2 )
	.attr("y",TOP_MARGIN - 30 )
	.attr("class","titleText")
	.text("My Profile");

canvas.append("text")
	.attr("x",LEFT_MARGIN + PANEL_W + RECT_W/2 )
	.attr("y",TOP_MARGIN - 30 )
	.attr("class","titleText")
	.text("Similar People");

canvas.append("text")
	.attr("x",LEFT_MARGIN + 2*PANEL_W + RECT_W/2 )
	.attr("y",TOP_MARGIN - 30 )
	.attr("class","titleText")
	.text("Recommendations");

canvas.append("rect")
	.attr("class","headerRect")
	.attr("x",10)
	.attr("y",10)
	.attr("rx",RXY)
	.attr("height",60)
	.attr("width",400);

canvas.append("text")
	.attr("x",10+200)
	.attr("y",52)
	.attr("font-size","40px")
	.attr("font-weight","bold")
	.attr("text-anchor","middle")
	.attr("fill","white")
	.text("Choice Explorer")

canvas.append("rect")
	.attr("class","headerRect")
	.attr("x",LEFT_MARGIN + 3*PANEL_W)
	.attr("y",10)
	.attr("rx",RXY)
	.attr("height",60)
	.attr("width",300);

canvas.append("text")
	.attr("x",LEFT_MARGIN + 3*PANEL_W + 150)
	.attr("y",50)
	.attr("font-size","30px")
	.attr("font-weight","bold")
	.attr("text-anchor","middle")
	.attr("fill","white")
	.text("Domain: Music")

canvas.append("rect")
	.attr("fill","grey")
	.attr("x", INFO_LEFT )
	.attr("y",TOP_MARGIN)
	.attr("width",270)
	.attr("height",615)
/*
canvas.append("text")
	.text("Hover Over an Item\n to See More Information!")
	.attr("x", INFO_LEFT + 270/2 )
	.attr("y", TOP_MARGIN + 20 )
	.attr("text-anchor","middle")
	.attr("font","14px sans-serif");
*/

updateVisualization();
get_new_recs();

}

// Creates the three column visualization based on data object
function updateVisualization() {

col1 = canvas.selectAll("g .col1").data(data.Active)
	.enter().append("g")
	.attr("class","col1")
	.attr("transform", function(d,i) { 
		return "translate(" + ( LEFT_MARGIN ) + "," + ( i * ( RECT_H + V_MARGIN ) + TOP_MARGIN ) + ")"; });

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
	.attr("class","rectText")
	.attr("dy", ".35em" )
	.attr("onmouseover","mouseOverEndText(evt.target)")
	.attr("onmouseout","mouseOut()")
	.attr("onclick","removeItem(evt.target)")
	.text(function(d) { return d; } );

col2 = canvas.selectAll("g .col2").data(data.Relevant)
	.enter().append("g")
	.attr("class","col2")
	.attr("transform", function(d,i) {
		return "translate(" + ( LEFT_MARGIN + ( PANEL_W ) ) + "," + ( i * ( RECT_H + V_MARGIN ) + TOP_MARGIN ) + ")"; });

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
	.attr("class","rectText")
	.attr("dy", ".35em" )
	.attr("onmouseover","mouseOverText2(evt.target)")
	.attr("onmouseout","mouseOut()")
	.text(function(d) { return d[0]; } );

col2.append("svg:image")
	.attr("xlink:href", function(d) { return "/static/pics/" + d[0].replace(/ /g,"") + ".jpg" } )
	.attr("x", RECT_W - 70 )
	.attr("y", RECT_H/2 - 50/2)
	.attr("width",60)
	.attr("height",50)
	.attr("stroke-width",1)
	.attr("stroke-fill","black");

col3 = canvas.selectAll("g .col3").data(data.Rec)
	.enter().append("g")
	.attr("class","col3")
	.attr("transform", function(d,i) {
		return "translate(" + ( LEFT_MARGIN + ( 2*PANEL_W ) ) + "," + ( i * ( RECT_H + V_MARGIN ) + TOP_MARGIN ) + ")"; });

col3.append("rect")
	.attr("width",RECT_W)
	.attr("height",RECT_H)
	.attr("onmouseover","mouseOverEndPanel(evt.target)")
	.attr("onmouseout","mouseOut()")
	.attr("onclick","addItem(evt.target)")
	.attr("rx",RXY)
	.attr("ry",RXY);

col3.append("text")
	.attr("x", 10 )
	.attr("y", RECT_H / 2 )
	.attr("class","rectText")
	.attr("dy", ".35em" )
	.attr("onmouseover","mouseOverEndText(evt.target)")
	.attr("onmouseout","mouseOut()")
	.attr("onclick","addItem(evt.target)")
	.text(function(d) { return d; } );
}

function removeVisualization()
{
	col1.remove();
	col2.remove();
	col3.remove();
	canvas.selectAll(".info").remove();
	removePaths();
}

function removePaths()
{
	canvas.selectAll( "path" )
		.remove();
}

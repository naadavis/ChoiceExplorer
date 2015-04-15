/* 
Nicholas Davis
*/
function runModel() 
{
	dataPoints.correlate(user);

	recs.calculateWeights(dataPoints.data);

	recs.normalizeAndRank(user);

	dataPoints.sort();
}

dataPoints.data = students.students;

runModel();

createView();

function update()
{
	dataPoints.reset();
	recs.reset();
	runModel();
//	destroyView();
	updateView();
//	createView();
}

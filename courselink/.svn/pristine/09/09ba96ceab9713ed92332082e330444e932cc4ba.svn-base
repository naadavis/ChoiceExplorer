// Nicholas Davis
// Underlying Model for Courselink
// Computes correlations and rankings
// Not dependent on other aspects
function inArray( item, array)
{
	for( var i = 0; i < array.length; i++)
	{
		if ( item == array[i] )
			return true;
	}
	return false;
}


// Holds the results of the reccomendations
var recs =
{
	compWeights : {},
	rankedComp : [],
	maxComp : -1,
	courseWeights: {},
	rankedCourse : [],
	maxCourse : -1,
	// functions
	reset : function()
	{
		this.maxComp = this.maxCourse = -1;
		// reset comp and course scores
		for( var key in this.compWeights )
			if (this.compWeights.hasOwnProperty(key))
				this.compWeights[key] = 0;

		for( var key in this.courseWeights )
			if(this.courseWeights.hasOwnProperty(key))
				this.courseWeights[key] = 0;
		// empty rankings
		while( this.rankedCourse.length > 0 )
			this.rankedCourse.pop();
		while( this.rankedComp.length > 0 )
			this.rankedComp.pop()
	},

	calculateWeights : function( data )
	{
		for( var i = 0; i < data.length; i ++ )
		{
			// courses
			for ( var j = 0; j < data[i].courses.length; j ++ )
			{
				course = data[i].courses[j];
				if( this.courseWeights.hasOwnProperty(course) )
				{
					this.courseWeights[course] += data[i].score;
					if( this.courseWeights[course] > this.maxCourse )
						this.maxCourse = this.courseWeights[course];
				}
				else
				{
					this.courseWeights[course] = data[i].score;
					if( this.courseWeights[course] > this.maxCourse )
						this.maxCourse = this.courseWeights[course];
				}
			}

			// companies
			if( this.compWeights.hasOwnProperty( data[i].company ) )
			{
				this.compWeights[data[i].company] += data[i].score;
				if( this.compWeights[data[i].company] > this.maxComp )
					this.maxComp = this.compWeights[data[i].company ];
			}
			else
			{
				this.compWeights[data[i].company] = data[i].score;
				if( this.compWeights[data[i].company] > this.maxComp )
					this.maxComp = this.compWeights[data[i].company ];
			}
		}
	},
	normalizeAndRank : function ( user )
	{
		for ( var key in this.compWeights )
		{
			if (this.compWeights.hasOwnProperty(key) && this.maxComp != 0 )
				this.compWeights[key] /= this.maxComp;
			this.rankedComp.push({id : "co" + key, score : this.compWeights[key] });
		}
		// need to fill rankedComp before sorting is worth anything
		this.rankedComp.sort(function(a,b){ return b.score - a.score;});
		/*
		for( var k = 0; k < 3; k++ )
			console.log( this.rankedComp[k].id + " : " + this.rankedComp[k].score );
	*/	
		for( var key in this.courseWeights )
		{
			if( this.courseWeights.hasOwnProperty(key) && this.maxCourse != 0 )
				this.courseWeights[key] /= this.maxCourse;
			if( ! inArray( key, user.courses) )
			{
				// ranked course should be empty before this
				this.rankedCourse.push({id : "c" + key, score : this.courseWeights[key] });
			}
		}

		this.rankedCourse.sort(function(a,b) { return b.score - a.score; });
		/*
		console.log("____________MODEL DATA___________________");
		var maxIndex = this.rankedCourse.length;
		if ( maxIndex > 7 )
			maxIndex = 7;
		for( var k = 0; k < maxIndex; k++ )
		{
			console.log( "" + this.rankedCourse[k].id + " : " + this.rankedCourse[k].score );
		}
		console.log("____________MODEL DATA END___________________");
		*/
	},
	print : function ()
	{
		document.write("Company Scores<br>");
		for( var key in this.compWeights )
		{
			if( this.compWeights.hasOwnProperty(key) )
				document.write("	company: " + key + " score: " + this.compWeights[key] + "<br>");
		}
		document.write("<br>Course Scores<br>")
		for( var key in this.courseWeights )
		{
			if( this.courseWeights.hasOwnProperty(key) )
				document.write("	course: " + key + " score: " + this.courseWeights[key] + "<br>" );
		}
	}
	
};

// Holds the students
var dataPoints =
{
	data : [],	// array of student objects
	// functions
	// calculate correlation scores for all points in data
	reset :	function()
	{
		for ( var i = 0; i < this.data.length; i++ )
			this.data[i].score = 0;
	},

	correlate : function( user )
	{	
		for ( var i = 0; i < this.data.length; i++ )
		{
			//this.data.id = "u" + this.data.id;
			this.data[i].score = this.calcScore( user.courses, this.data[i].courses );
		}
	},
	// return number of matches in two arrays
	calcScore : function( array1, array2 )
	{
		matches = 0;
		for( var i = 0; i < array1.length; i++ )
		{
			for( var j = 0; j < array2.length; j++ )
			{
				if( array1[i] == array2[j] ) // match
				{
					++matches;
					break;	// try to match next course in array1
				}
			}
		}
		return matches;
	},
	sort : function ()
	{
		this.data.sort(function( a , b ) { return b.score - a.score; } );
	}
};

// Active user, values are just for test
var user =
{
	courses : [ 3, 7, 16, 17, 20, 8]
};

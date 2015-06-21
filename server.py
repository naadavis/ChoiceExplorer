from __future__ import division
from random import randint
from flask import Flask, jsonify, render_template, request
import topN
app = Flask(__name__)

# Nicholas Davis
# 2015


# Jaccard distance metric to calculate similarity
def sjaccard( a, b ):
	return len( a & b ) / len( a | b )

# Finds the 10 most popular items from a set of profiles 
# not including those already in user's profile
def getOrderedRecs(user,sets):
	d = dict()
	for s in sets:
		for item in s:
			if item in user:
				continue
			elif item in d:
				d[item] += 1
			else:
				d[item] = 1
	r = sorted(d.items(),key = lambda x: x[1])
	return map( lambda x: x[0], r[:6] )
	
# Our global dictionary and topN profiles
prof_dict = {}

# file to get profile data from
f = open('bandData.tsv','r')

# Gets user number from file uses it as a dictionary key
# the dictionary value is the set of bands/artists
for line in f:
	l = line.rstrip('\n').split('\t')
	prof_dict[int(l[0])] = set(l[1:])

f.close()

# Gets Both Mens and Womens names from file, for demo purposes
men_names = []

f = open('men.txt','r')
for line in f:
	l = line.rstrip('\n')
	men_names.append(l)
f.close()

women_names = []
f = open('women.txt','r')
for line in f:
	l = line.rstrip('\n')
	women_names.append(l)
f.close()

print "Loaded in ",
print len(prof_dict),
print " profiles"

# builds the return JSON object to send back to server
def getResult(l):
	# This result dictionary will be received as a JSON object
	result = {}
	result["Active"] = l
	user = set(l)
	# Calculate Recommendations using top 7 profiles
	top = topN.TopN(7)
	# iterate through all profiles, keeping most similar
	# with the top data structure this is just adding
	for key, value in prof_dict.iteritems():
		top.add((key,value),sjaccard( user, value ) )
	# Assign Fake, Temporary names to the top recommendations
	mens = list(men_names)
	womens = list(women_names)
	names = {}
	for i in range(0,len(top.data)):
		if ( top.data[i][0][0] % 2 ) == 1:
			pos = randint(0,len(mens)-1)
			names[top.data[i][0][0]] = mens[pos]
			del mens[pos]
		else:
			pos = randint(0,len(womens)-1)
			names[top.data[i][0][0]] = womens[pos]
			del womens[pos]
	# Get the Profiles of the top and put them into the "Relevant" within the result structure
	result["Relevant"] = map( lambda x: [ names[x[0][0]] , list(x[0][1]) ] , top.data )
	# Get a ordered list of recommendations based on top profiles
	result["Rec"] = getOrderedRecs(user,map( lambda x: x[0][1], top.data ) )
	return result

def decode(a):
	return a.encode('utf-8')

@app.route('/_get_recs')
def get_recs():
	# Resolve JSON structure into a list
	a = request.args.get('length')
	l = []
	for i in range(0,int(a)):
		l.append(request.args.get(str(i)).encode('utf-8'))
	r = getResult(l)
	return jsonify(**r)

@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=False)

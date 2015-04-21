from __future__ import division
from flask import Flask, jsonify, render_template, request
import topN
app = Flask(__name__)

# Nicholas Davis
# 2015


# Jaccard distance metric to calculate similarity
def sjaccard( l1, l2 ):
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
				d[key] = 1
#	sorted_items = sorted(d.items(), k=operator.
	r = d.items().sort(key = lambda x: x[1])
	return r[:10]
	
# Our global dictionary and topN profiles
top = topN.TopN(7)
prof_dict = {}

# file to get profile data from
f = open('music.tsv','r')

for line in f:
	l = line.rstrip('\n').split('\t')
	prof_dict[l[0]] = set(l[1:])

f.close()

print "Loaded in ",
print len(prof_dict),
print " profiles"

# builds the return JSON object to send back to server
def getResult(l):
	result = {}
	result["Active"] = l
	user = set(l)
	# iterate through all profiles, keeping most similar
	for key, value in prof_dict.iteritems():
		top.add((key,value),sjaccard( user, value ) )
	result["Relevant"] = map( lambda x: [x[0]] + list(x[1]), top.data )
	result["Rec"] = getOrderedRecs(user,map( lambda x: x[1], top.data ) )
	return result

def decode(a):
	return a.encode('utf-8')

@app.route('/_get_recs')
def get_recs():
	a = request.args.get('length')
	l = []
	for i in range(0,int(a)):
		l.append(request.args.get(str(i)).encode('utf-8'))
	# old results for testing
	#r = { "result": l }
	#r = { "result": [ ['a',l[0]],['b',l[1]],['r',l[0]+l[1]] ] }
	r = getResult(l)
	return jsonify(**r)

# HTML/JS isn't quite prepared yet
@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=False)

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
	return map( lambda x: x[0], r[:10] )
	
# Our global dictionary and topN profiles
prof_dict = {}

# file to get profile data from
f = open('musicData3.tsv','r')
#f = open('smallData.tsv','r')

for line in f:
	l = line.rstrip('\n').split('\t')
	prof_dict[int(l[0])] = set(l[1:])

f.close()

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

print len(women_names)
print len(men_names)

print "Loaded in ",
print len(prof_dict),
print " profiles"

# builds the return JSON object to send back to server
def getResult(l):
	result = {}
	result["Active"] = l
	user = set(l)
	top = topN.TopN(7)
	# iterate through all profiles, keeping most similar
	for key, value in prof_dict.iteritems():
		top.add((key,value),sjaccard( user, value ) )
	mens = list(men_names)
	womens = list(women_names)
	names = {}
	for i in range(0,len(top.data)):
		print i
		if ( top.data[i][0][0] % 2 ) == 1:
			pos = randint(0,len(mens)-1)
			print pos
			names[top.data[i][0][0]] = mens[pos]
			del mens[pos]
		else:
			pos = randint(0,len(womens)-1)
			print pos
			names[top.data[i][0][0]] = womens[pos]
			del womens[pos]
	result["Relevant"] = map( lambda x: [ names[x[0][0]] , list(x[0][1]) ] , top.data )
	result["Rec"] = getOrderedRecs(user,map( lambda x: x[0][1], top.data ) )
	for i in range(0,len(top.data)):
		print names[top.data[i][0][0]],
		print top.data[i][1]
	#top.printSmall()
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
	#print l
	r = getResult(l)
	#print r["Relevant"]
	#print r["Rec"]
	return jsonify(**r)

# HTML/JS isn't quite prepared yet
@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=False)

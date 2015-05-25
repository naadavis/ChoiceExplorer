# Nicholas Davis
#
# A Data Structure To Hold the top N items as tuples, with <item,score>
# value is calculated outside of this structure and fed into the structure with the item

class TopN:
	def __init__(self,n):
		self.data = []
		self.N = n

	def add(self,name,value):
		i = len(self.data)
		if i == 0:	# Set is Empty, add the name,value pair
			self.data.append((name,value))
		else:
			i -= 1
			while( i > -1 ): 	# Iterate through list from the end
				if value > self.data[i][1]:
					i -= 1
				else:
					break
			i += 1
			# i now holds position for insertion based on value
			self.data.insert(i,(name,value))
			# keep only the top N
			if len(self.data) > self.N:
				self.data.pop()
	
	def printSelf(self):
		for i in range(0,len(self.data)):
			print self.data[i]
	
	def printSmall(self):
		for i in range(0,len(self.data)):
			print self.data[i][1]


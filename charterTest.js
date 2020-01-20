// According to the question, every transaction:
// 	$50-$100 part: give user 1 point for each bucks, 
// 	above $100 part: will give user 2 points for each bucks.

// We can change it to for each transaction:
// 	above $50 part: give user 1 point for each bucks,
// 	above $100 part: give user 1 point for each bucks.



// The whole workflow will be: Valid data -> calculate points -> update result with the new points


var validData = function(data){
	let res = true
	var months = ['Jan', 'Feb', 'Mar']
	data.forEach(record => {
		if(record.length !== 3 || !Number.isInteger(record[1]) || !months.includes(record[2])){
			res = false
			return
		}
	})
	return res
}

var calculatePointsByPurchase = function(transaction) {
	let onePointThreshold = 50
	let extraPointThreshold = 100
	let onePoint = transaction - onePointThreshold
	let extraPoint = transaction - extraPointThreshold > 0 ? transaction - extraPointThreshold : 0

	return onePoint > 0 ? onePoint + extraPoint : 0
}

var getUserNewRecord = function(userPrevPoints, month, newPoints) {
	let arrayIndex
	if(month === 'Jan'){
		arrayIndex = 1
	} else if(month === 'Feb'){
		arrayIndex = 2
	} else {
		arrayIndex = 3
	}
	userPrevPoints[arrayIndex] += newPoints
	userPrevPoints[4] += newPoints

	return userPrevPoints
}

var getAllUsersPoints = function(testData) {
	let isValid = validData(testData)
	if(!isValid){
		console.log("Data is invalid")
		return
	}

	let result = {}
	for(let i = 0; i < testData.length; i++){
		let record = testData[i]
		let user = record[0]
		let points = calculatePointsByPurchase(record[1])
		let month = record[2]

		if(!result[user]){
			result[user] = [user, 0, 0, 0, 0]
		}
		let userNewRecord = getUserNewRecord(result[user], month, points)
		result[user] = userNewRecord
	}
	return result
}




// Test Data:

var testData1 = [
	['Jack', 120, 'Jan'],
	['Jack', 20, 'Jan'],
	['Jack', 51, 'Feb'],
	['Tom', 147, 'Feb'],
	['Kate', 9, 'Feb'],
	['Kate', 217, 'Mar'],
	['Jack', 520, 'Mar']
]


let res = getAllUsersPoints(testData1)
console.log(res)








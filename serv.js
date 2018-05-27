var https = require('https');
var fs = require('fs');
var port = 5555;
var options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};
var express = require('express'),
	app = express();
var path = require('path');
app.use('/', express.static(path.join(__dirname + '/')));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
var server = https.createServer(options, app);
server.listen(port, function() {
	let ifaces = require('os').networkInterfaces();
	Object.keys(ifaces).forEach(function(ifname) {
		var alias = 0;
		ifaces[ifname].forEach(function(iface) {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				return;
			}
			if (alias >= 1) {
				console.log('Web Address: https://' + alias, iface.address + ':' + port);
			} else {
				console.log('Web Address: https://' + iface.address + ':' + port);
			}
			++alias;
		});
	});
});
var io = require('socket.io').listen(server);
var JsonDB = require('node-json-db'),
	db = new JsonDB(__dirname + "/json/db", true, false),
	algoDb = new JsonDB(__dirname + "/json/algoDb", true, false);
global.rooms = [], global.activityDetails = {}, clients = {};
io.on('connection', function(socket) {
	socket.on('isLoggedIn', function(deviceKey, fn) {
		socket.id = deviceKey;
		var deviceKeys = Object.keys(clients);
		if (deviceKeys.indexOf(deviceKey) == -1) fn(false);
		else {
			var algosObj = algoDb.getData("/algorithms");
			var algoNamesArr = [];
			for (var i in algosObj) algoNamesArr.push(i);
			if (algoNamesArr.length > 0) socket.emit('setAlgoNames', algosObj);
			else socket.emit('setEmptyAlgoNames');
			socket.emit('setRptSemesters', {
				allSemesters: getRptSemesters(),
				allSections: getRptSections()
			});
			if (clients[deviceKey].userType == "teacher") {
				try {
					if (clients[deviceKey].roomId != null) {
						io.sockets.emit('quickLeave', clients[deviceKey].roomId);
						removeArray(rooms, clients[deviceKey].roomId);
						delete activityDetails[clients[deviceKey].roomId];
						clients[deviceKey].roomId = null;
					}
				} catch (err) {}
			} else if (clients[deviceKey].userType == 'student') {
				try {
					socket.emit('setStdRecordDateTime', getStdRecordDateTime(clients[deviceKey].username));
					if (clients[deviceKey].roomId != null) {
						clients[deviceKey].roomId = null;
					}
				} catch (err) {}
			}
			fn(clients[deviceKey].username);
		}
	});
	socket.on('registerValidation', function(user, fn) {
		var allUsernames = db.getData("/users");
		var allUsernamesArr = [];
		for (var i in allUsernames) allUsernamesArr.push(i);
		if (allUsernamesArr.indexOf(user.username) == -1 && user.userType == "teacher") {
			db.push("/users/" + user.username + "/userType", user.userType, true);
			db.push("/users/" + user.username + "/password", user.password, true);
			fn(true);
		} else if (allUsernamesArr.indexOf(user.username) == -1 && user.userType == "student") {
			db.push("/users/" + user.username + "/userType", user.userType, true);
			db.push("/users/" + user.username + "/title", user.title, true);
			db.push("/users/" + user.username + "/firstName", user.firstName, true);
			db.push("/users/" + user.username + "/lastName", user.lastName, true);
			db.push("/users/" + user.username + "/password", user.password, true);
			db.push("/users/" + user.username + "/records", {}, true);
			fn(true);
		} else fn(false);
	});
	socket.on('loginValidation', function(user, fn) {
		var allUsernames = db.getData("/users");
		var allUsernamesArr = [];
		for (var i in allUsernames) allUsernamesArr.push(i);
		if (allUsernamesArr.indexOf(user.username) != -1 && db.getData("/users/" + user.username + "/password") == user.password) {
			var LoggedInUsers = Object.values(clients);
			var loggedInUser = findLoggedInUser(LoggedInUsers, 'username', user.username);
			if (loggedInUser == null) {
				clients[user.deviceKey] = user.deviceKey;
				clients[user.deviceKey] = {
					username: user.username,
					userType: db.getData("/users/" + user.username + "/userType"),
					roomId: null
				};
				console.log(clients[user.deviceKey].username, 'was logged in.');
				if (db.getData("/users/" + user.username + "/userType") == 'teacher') {
					var algosObj = algoDb.getData("/algorithms");
					var algoNamesArr = [];
					for (var i in algosObj) algoNamesArr.push(i);
					if (algoNamesArr.length > 0) socket.emit('setAlgoNames', algosObj);
					else socket.emit('setEmptyAlgoNames');
					socket.emit('setRptSemesters', {
						allSemesters: getRptSemesters(),
						allSections: getRptSections()
					});
				} else if (db.getData("/users/" + user.username + "/userType") == 'student') {
					socket.emit('setStdRecordDateTime', getStdRecordDateTime(user.username));
				}
				fn(true);
			} else {
				console.log(user.username, 'was logged in (another device).');
				fn(false);
			}
		} else {
			console.log("User not found.");
			fn(false);
		}
	});
	socket.on('createRoom', function(details, fn) {
		do {
			socket.room = String(Math.floor(Math.random() * 9999) + 1);
		} while (rooms.indexOf(socket.room) != -1);
		clients[socket.id].roomId = socket.room;
		rooms.push(socket.room);
		activityDetails[socket.room] = socket.room;
		activityDetails[socket.room] = {
			semester: details.semester,
			section: details.section,
			algoType: details.algoType,
			algoName: details.algoName,
			parametersType: details.parametersType,
			parSortingOrder: details.parSortingOrder,
			desiredStds: details.desiredStds,
			stdIconSprite: details.stdIconSprite,
			parametersArr: [],
			parSorting: details.parSorting,
			targetValueIndex: null,
			targetValue: null,
			sortedParametersArr: [],
			swappedParametersArr: [],
			playingSeq: [],
			playingSeqIndex: 0,
			joinedStds: [],
			joinedStdsNotIos: [],
			shuffledStds: [],
			operator: [],
			actors: [],
			swappedActors: [],
			observers: [],
			dateTime: null,
			time: null,
			successful: null
		};
		if (details.parametersType == 'number') {
			while (activityDetails[socket.room].parametersArr.length < details.desiredStds - 1) {
				var randomnumber = Math.floor(Math.random() * 999999) + 1;
				if (activityDetails[socket.room].parametersArr.indexOf(randomnumber) > -1) continue;
				activityDetails[socket.room].parametersArr[activityDetails[socket.room].parametersArr.length] = randomnumber;
			}
		} else if (details.parametersType == 'animalNames') {}
		if (details.parSorting == "sorted" || details.algoName.match(/binary/gi)) activityDetails[socket.room].parametersArr.sort(function(a, b) {
			return a - b;
		});
		if (details.algoType == "search") {
			activityDetails[socket.room].targetValueIndex = details.targetValueIndex;
			activityDetails[socket.room].targetValue = activityDetails[socket.room].parametersArr[details.targetValueIndex];
		} else if (details.algoType == "sort") {
			activityDetails[socket.room].sortedParametersArr = activityDetails[socket.room].parametersArr.slice();
			if (details.parSortingOrder == "ascending") activityDetails[socket.room].sortedParametersArr.sort(function(a, b) {
				return a - b;
			});
			else if (details.parSortingOrder == "descending") activityDetails[socket.room].sortedParametersArr.sort(function(a, b) {
				return b - a;
			});
			activityDetails[socket.room].swappedParametersArr = activityDetails[socket.room].parametersArr.slice();
		}
		var issueReport = [];
		try {
			if (algoDb.getData("/algorithms/" + details.algoName + "/amtAlgoCode") == 3) {
				var fn2 = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + details.algoName + "/algoCodeFn2")), function(key, value) {
					return eval("(" + value + ")");
				});
				var fn1 = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + details.algoName + "/algoCodeFn1")), function(key, value) {
					return eval("(" + value + ")");
				});
			} else if (algoDb.getData("/algorithms/" + details.algoName + "/amtAlgoCode") == 2) {
				var fn1 = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + details.algoName + "/algoCodeFn1")), function(key, value) {
					return eval("(" + value + ")");
				});
			}
			var thisFn = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + details.algoName + "/algoCodeMain")), function(key, value) {
				return eval("(" + value + ")");
			});
		} catch (err) {
			fn({
				errorMessage: err.message
			});
		}
		if (details.algoType == "search") {
			thisFn(activityDetails[socket.room].parametersArr.slice(), activityDetails[socket.room].targetValue);
			if (searchStringInArray(activityDetails[socket.room].playingSeq, "Scan") == false) issueReport.push("ไม่พบการสแกน!");
			if (activityDetails[socket.room].playingSeq.indexOf("Found") < 0) issueReport.push("ค้นหาไม่พบ!");
		} else if (details.algoType == "sort") {
			thisFn(activityDetails[socket.room].parametersArr.slice(), details.parSortingOrder);
			if (searchStringInArray(activityDetails[socket.room].playingSeq, "Highlight") == false) issueReport.push("ไม่พบการไฮไลท์!");
			if (searchStringInArray(activityDetails[socket.room].playingSeq, "Scan") == false) issueReport.push("ไม่พบการสแกน!");
			if (searchStringInArray(activityDetails[socket.room].playingSeq, "Compare") == false) issueReport.push("ไม่พบการเปรียบเทียบ!");
			if (searchStringInArray(activityDetails[socket.room].playingSeq, "Swap") == false) issueReport.push("ไม่พบการสลับ!");
			if (activityDetails[socket.room].playingSeq.indexOf("Sorted") < 0) issueReport.push("ชุดข้อมูลไม่ถูกจัดเรียง!");
		}
		fn({
			issueReport: issueReport,
			roomId: socket.room,
			parametersArr: activityDetails[socket.room].parametersArr,
			targetValue: activityDetails[socket.room].targetValue,
			sortedParametersArr: activityDetails[socket.room].sortedParametersArr,
			playingSeq: activityDetails[socket.room].playingSeq
		});
	});
	socket.on('reRoom', function(fn) {
		activityDetails[socket.room].parametersArr = [];
		if (activityDetails[socket.room].parametersType == 'number') {
			while (activityDetails[socket.room].parametersArr.length < activityDetails[socket.room].desiredStds - 1) {
				var randomnumber = Math.floor(Math.random() * 999999) + 1;
				if (activityDetails[socket.room].parametersArr.indexOf(randomnumber) > -1) continue;
				activityDetails[socket.room].parametersArr[activityDetails[socket.room].parametersArr.length] = randomnumber;
			}
		} else if (activityDetails[socket.room].parametersType == 'animalNames') {}
		if (activityDetails[socket.room].parSorting == "sorted" || activityDetails[socket.room].algoName.match(/binary/gi)) activityDetails[socket.room].parametersArr.sort(function(a, b) {
			return a - b;
		});
		if (activityDetails[socket.room].algoType == "search") {
			activityDetails[socket.room].targetValueIndex = Math.floor(Math.random() * (activityDetails[socket.room].desiredStds - 1)) + 0;
			activityDetails[socket.room].targetValue = activityDetails[socket.room].parametersArr[activityDetails[socket.room].targetValueIndex];
		} else if (activityDetails[socket.room].algoType == "sort") {
			activityDetails[socket.room].sortedParametersArr = activityDetails[socket.room].parametersArr.slice();
			if (activityDetails[socket.room].parSortingOrder == "ascending") activityDetails[socket.room].sortedParametersArr.sort(function(a, b) {
				return a - b;
			});
			else if (activityDetails[socket.room].parSortingOrder == "descending") activityDetails[socket.room].sortedParametersArr.sort(function(a, b) {
				return b - a;
			});
			activityDetails[socket.room].swappedParametersArr = activityDetails[socket.room].parametersArr.slice();
		}
		try {
			if (algoDb.getData("/algorithms/" + activityDetails[socket.room].algoName + "/amtAlgoCode") == 3) {
				var fn2 = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + activityDetails[socket.room].algoName + "/algoCodeFn2")), function(key, value) {
					return eval("(" + value + ")");
				});
				var fn1 = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + activityDetails[socket.room].algoName + "/algoCodeFn1")), function(key, value) {
					return eval("(" + value + ")");
				});
			} else if (algoDb.getData("/algorithms/" + activityDetails[socket.room].algoName + "/amtAlgoCode") == 2) {
				var fn1 = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + activityDetails[socket.room].algoName + "/algoCodeFn1")), function(key, value) {
					return eval("(" + value + ")");
				});
			}
			var thisFn = JSON.parse(JSON.stringify(algoDb.getData("/algorithms/" + activityDetails[socket.room].algoName + "/algoCodeMain")), function(key, value) {
				return eval("(" + value + ")");
			});
		} catch (err) {}
		activityDetails[socket.room].playingSeq = [];
		if (activityDetails[socket.room].algoType == "search") {
			thisFn(activityDetails[socket.room].parametersArr.slice(), activityDetails[socket.room].targetValue);
		} else if (activityDetails[socket.room].algoType == "sort") {
			thisFn(activityDetails[socket.room].parametersArr.slice(), activityDetails[socket.room].parSortingOrder);
		}
		do {
			activityDetails[socket.room].shuffledStds = shuffledStds(activityDetails[socket.room].joinedStds.slice());
		} while (activityDetails[socket.room].joinedStdsNotIos.indexOf(activityDetails[socket.room].shuffledStds[0]) == -1);
		activityDetails[socket.room].operator = activityDetails[socket.room].shuffledStds.slice(0, 1);
		activityDetails[socket.room].actors = activityDetails[socket.room].shuffledStds.slice(1, activityDetails[socket.room].desiredStds);
		activityDetails[socket.room].observers = activityDetails[socket.room].shuffledStds.slice(activityDetails[socket.room].desiredStds, activityDetails[socket.room].joinedStds.length);
		activityDetails[socket.room].swappedActors = activityDetails[socket.room].actors.slice();
		activityDetails[socket.room].playingSeqIndex = 0;
		activityDetails[socket.room].dateTime = null;
		activityDetails[socket.room].time = null;
		activityDetails[socket.room].successful = null;
		io.sockets.emit('waitingStdsReRoom', {
			roomId: socket.room,
			algoName: activityDetails[socket.room].algoName,
			algoType: activityDetails[socket.room].algoType,
			desiredStds: activityDetails[socket.room].desiredStds,
			operator: activityDetails[socket.room].operator,
			actors: activityDetails[socket.room].actors,
			observers: activityDetails[socket.room].observers,
			parametersArr: activityDetails[socket.room].parametersArr,
			targetValue: activityDetails[socket.room].targetValue,
			stdIconSprite: activityDetails[socket.room].stdIconSprite
		});
		fn({
			parametersArr: activityDetails[socket.room].parametersArr,
			targetValue: activityDetails[socket.room].targetValue,
			operator: activityDetails[socket.room].operator,
			actors: activityDetails[socket.room].actors
		});
	});
	socket.on('joiningRoom', function(details, fn) {
		if (rooms.indexOf(details.roomId) == -1) {
			fn(false);
		} else {
			if (activityDetails[details.roomId].joinedStds.indexOf(details.username) == -1) {
				activityDetails[details.roomId].joinedStds.push(details.username);
				if (details.thisDevice != 'iOS') activityDetails[details.roomId].joinedStdsNotIos.push(details.username);
				socket.join(details.roomId);
				clients[socket.id].roomId = details.roomId;
				io.sockets.emit('joinedStd', {
					roomId: details.roomId,
					username: details.username
				});
				fn(true);
			} else {
				fn(false);
			}
		}
	});
	socket.on('getRandStds', function(fn) {
		if (activityDetails[socket.room].joinedStds.length < activityDetails[socket.room].desiredStds) {
			fn(false);
		} else {
			do {
				activityDetails[socket.room].shuffledStds = shuffledStds(activityDetails[socket.room].joinedStds.slice());
			} while (activityDetails[socket.room].joinedStdsNotIos.indexOf(activityDetails[socket.room].shuffledStds[0]) == -1);
			activityDetails[socket.room].operator = activityDetails[socket.room].shuffledStds.slice(0, 1);
			activityDetails[socket.room].actors = activityDetails[socket.room].shuffledStds.slice(1, activityDetails[socket.room].desiredStds);
			activityDetails[socket.room].observers = activityDetails[socket.room].shuffledStds.slice(activityDetails[socket.room].desiredStds, activityDetails[socket.room].joinedStds.length);
			activityDetails[socket.room].swappedActors = activityDetails[socket.room].actors.slice();
			io.sockets.emit('waitingStds', {
				roomId: socket.room,
				algoName: activityDetails[socket.room].algoName,
				algoType: activityDetails[socket.room].algoType,
				desiredStds: activityDetails[socket.room].desiredStds,
				operator: activityDetails[socket.room].operator,
				actors: activityDetails[socket.room].actors,
				observers: activityDetails[socket.room].observers,
				parametersArr: activityDetails[socket.room].parametersArr,
				targetValue: activityDetails[socket.room].targetValue,
				stdIconSprite: activityDetails[socket.room].stdIconSprite
			});
			fn({
				operator: activityDetails[socket.room].operator,
				actors: activityDetails[socket.room].actors
			});
		}
	});
	socket.on('play', function(roomId) {
		if (activityDetails[roomId].playingSeq.length > 0 && activityDetails[roomId].playingSeqIndex < activityDetails[roomId].playingSeq.length) {
			var playingSeq = activityDetails[roomId].playingSeq;
			var index = Number(activityDetails[roomId].playingSeqIndex);
			if (playingSeq[index].startsWith("Highlight ")) {
				io.emit('standbyTeacher', {
					roomId: roomId,
					playingStatus: "highlighting",
					index: Number(playingSeq[index].substring(10, 12)),
					color: playingSeq[index].substring(19, 27),
					text: playingSeq[index].substring(33, playingSeq[index].length),
				});
			} else if (playingSeq[index].startsWith("Scan ")) {
				io.emit('standbyTeacher', {
					roomId: roomId,
					playingStatus: "scanning",
					index: Number(playingSeq[index].substring(5, playingSeq[index].length))
				});
				io.emit('standbyActors', {
					roomId: roomId,
					playingStatus: "scanning",
					index: Number(playingSeq[index].substring(5, playingSeq[index].length))
				});
				io.emit('standbyOperator', {
					roomId: roomId,
					playingStatus: "scanning",
					index: Number(playingSeq[index].substring(5, playingSeq[index].length))
				});
			} else if (playingSeq[index].startsWith("Compare ")) {
				if (playingSeq[index].substring(11, 12) == "<") {
					if (activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(8, 10))] < activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(13, playingSeq[index].length))])
						var comparingResult = true;
					else
						var comparingResult = false;
				} else if (playingSeq[index].substring(11, 12) == ">") {
					if (activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(8, 10))] > activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(13, playingSeq[index].length))])
						var comparingResult = true;
					else
						var comparingResult = false;
				}
				io.emit('standbyTeacher', {
					roomId: roomId,
					playingStatus: "comparing",
					indexA: Number(playingSeq[index].substring(8, 10)),
					indexB: Number(playingSeq[index].substring(13, playingSeq[index].length)),
					symbol: playingSeq[index].substring(11, 12),
					comparingResult: comparingResult
				});
				io.emit('standbyActors', {
					roomId: roomId,
					playingStatus: "comparing"
				});
				io.emit('standbyOperator', {
					roomId: roomId,
					playingStatus: "comparing",
					indexA: Number(playingSeq[index].substring(8, 10)),
					indexB: Number(playingSeq[index].substring(13, playingSeq[index].length)),
					symbol: playingSeq[index].substring(11, 12),
					comparingResult: comparingResult
				});
				if (activityDetails[roomId].observers.length > 0) {
					io.emit('standbyObservers', {
						roomId: roomId,
						playingStatus: "comparing",
						indexA: Number(playingSeq[index].substring(8, 10)),
						indexB: Number(playingSeq[index].substring(13, playingSeq[index].length)),
						symbol: playingSeq[index].substring(11, 12),
						comparingResult: comparingResult
					});
				}
			} else if (playingSeq[index].startsWith("Swap ")) {
				var tempA = activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(5, 7))];
				activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(5, 7))] = activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(12, playingSeq[index].length))];
				activityDetails[roomId].swappedParametersArr[Number(playingSeq[index].substring(12, playingSeq[index].length))] = tempA;
				var tempB = activityDetails[roomId].swappedActors[Number(playingSeq[index].substring(5, 7))];
				activityDetails[roomId].swappedActors[Number(playingSeq[index].substring(5, 7))] = activityDetails[roomId].swappedActors[Number(playingSeq[index].substring(12, playingSeq[index].length))];
				activityDetails[roomId].swappedActors[Number(playingSeq[index].substring(12, playingSeq[index].length))] = tempB;
				io.emit('standbyTeacher', {
					roomId: roomId,
					playingStatus: "swapping",
					indexA: Number(playingSeq[index].substring(5, 7)),
					indexB: Number(playingSeq[index].substring(12, playingSeq[index].length)),
					swappedActors: activityDetails[roomId].swappedActors,
					swappedParametersArr: activityDetails[roomId].swappedParametersArr
				});
				io.emit('standbyActors', {
					roomId: roomId,
					playingStatus: "swapping",
					indexA: Number(playingSeq[index].substring(5, 7)),
					indexB: Number(playingSeq[index].substring(12, playingSeq[index].length)),
					swappedActors: activityDetails[roomId].swappedActors,
					swappedParametersArr: activityDetails[roomId].swappedParametersArr
				});
				io.emit('standbyOperator', {
					roomId: roomId,
					playingStatus: "swapping",
					swappedActors: activityDetails[roomId].swappedActors,
					swappedParametersArr: activityDetails[roomId].swappedParametersArr
				});
			} else if (playingSeq[index].startsWith("Value ")) {
				if (playingSeq[index + 1].startsWith("Found"))
					var valueFound = true;
				else
					var valueFound = false;
				io.emit('standbyTeacher', {
					roomId: roomId,
					playingStatus: "searching",
					index: Number(playingSeq[index].substring(6, 8)),
					valueFound: valueFound
				});
				io.emit('standbyOperator', {
					roomId: roomId,
					playingStatus: "searching",
					index: Number(playingSeq[index].substring(6, 8)),
					valueFound: valueFound
				});
				io.emit('standbyObservers', {
					roomId: roomId,
					playingStatus: "searching",
					index: Number(playingSeq[index].substring(6, 8)),
					valueFound: valueFound
				});
			} else if (playingSeq[index].startsWith("Found")) {
				activityDetails[roomId].successful = true;
				io.emit('resultantTeacher', {
					roomId: roomId,
					searchingResultIndex: Number(playingSeq[index - 1].substring(6, 8)),
					sortingResult: null
				});
			} else if (playingSeq[index].startsWith("Sorted")) {
				activityDetails[roomId].successful = true;
				io.emit('resultantTeacher', {
					roomId: roomId,
					searchingResultIndex: null,
					sortingResult: null
				});
			}
			activityDetails[roomId].playingSeqIndex++;
		} else {
			activityDetails[roomId].successful = false;
			io.emit('resultantTeacher', {
				roomId: roomId,
				searchingResultIndex: null,
				sortingResult: null
			});
		}
	});
	socket.on('scanned', function(details) {
		io.emit('standbyTeacher', {
			roomId: details.roomId,
			playingStatus: "scanned",
			value: details.value
		});
	});
	socket.on('saveReport', function (details, fn) {
		if (activityDetails[socket.room].successful == true) {
			activityDetails[socket.room].dateTime = details.dateTime;
			activityDetails[socket.room].time = details.mins + ' นาที ' + details.secs + ' วินาที';
			if (activityDetails[socket.room].algoType == 'search') {
				db.push("/reports/" + details.dateTime + "/targetValue", activityDetails[socket.room].targetValue, true);
				db.push("/reports/" + details.dateTime + "/targetValueIndex", activityDetails[socket.room].targetValueIndex, true);
				db.push("/reports/" + details.dateTime + "/result", details.result, true);
				for (var i in activityDetails[socket.room].joinedStds)
					db.push("/users/" + activityDetails[socket.room].joinedStds[i] + "/records/" + details.dateTime + "/result", details.result, true);
			} else if (activityDetails[socket.room].algoType == 'sort') {
				db.push("/reports/" + details.dateTime + "/sortedParametersArr", activityDetails[socket.room].sortedParametersArr, true);
			}
			db.push("/reports/" + details.dateTime + "/semester", activityDetails[socket.room].semester, true);
			db.push("/reports/" + details.dateTime + "/section", activityDetails[socket.room].section, true);
			db.push("/reports/" + details.dateTime + "/algoType", activityDetails[socket.room].algoType, true);
			db.push("/reports/" + details.dateTime + "/algoName", activityDetails[socket.room].algoName, true);
			db.push("/reports/" + details.dateTime + "/parametersType", activityDetails[socket.room].parametersType, true);
			db.push("/reports/" + details.dateTime + "/desiredStds", activityDetails[socket.room].desiredStds, true);
			db.push("/reports/" + details.dateTime + "/parametersArr", activityDetails[socket.room].parametersArr, true);
			db.push("/reports/" + details.dateTime + "/playingSeq", activityDetails[socket.room].playingSeq, true);
			db.push("/reports/" + details.dateTime + "/joinedStds", activityDetails[socket.room].joinedStds, true);
			db.push("/reports/" + details.dateTime + "/shuffledStds", activityDetails[socket.room].shuffledStds, true);
			db.push("/reports/" + details.dateTime + "/operator", activityDetails[socket.room].operator, true);
			db.push("/reports/" + details.dateTime + "/actors", activityDetails[socket.room].actors, true);
			db.push("/reports/" + details.dateTime + "/observers", activityDetails[socket.room].observers, true);
			db.push("/reports/" + details.dateTime + "/time", activityDetails[socket.room].time, true);
			for (var i in activityDetails[socket.room].joinedStds) {
				db.push("/users/" + activityDetails[socket.room].joinedStds[i] + "/records/" + details.dateTime + "/algoType", activityDetails[socket.room].algoType, true);
				db.push("/users/" + activityDetails[socket.room].joinedStds[i] + "/records/" + details.dateTime + "/algoName", activityDetails[socket.room].algoName, true);
				if (activityDetails[socket.room].operator.indexOf(activityDetails[socket.room].joinedStds[i]) == 0)
					db.push("/users/" + activityDetails[socket.room].joinedStds[i] + "/records/" + details.dateTime + "/userType", "operator", true);
				else if (activityDetails[socket.room].actors.indexOf(activityDetails[socket.room].joinedStds[i]) > -1)
					db.push("/users/" + activityDetails[socket.room].joinedStds[i] + "/records/" + details.dateTime + "/userType", "actor", true);
				else if (activityDetails[socket.room].observers.indexOf(activityDetails[socket.room].joinedStds[i]) > -1)
					db.push("/users/" + activityDetails[socket.room].joinedStds[i] + "/records/" + details.dateTime + "/userType", "observer", true);
				db.push("/users/" + activityDetails[socket.room].joinedStds[i] + "/records/" + details.dateTime + "/time", details.mins + ' นาที ' + details.secs + ' วินาที', true);
			}
			socket.emit('setRptSemesters', {
				allSemesters: getRptSemesters(),
				allSections: getRptSections()
			});
			io.emit('resultantStds', {
				roomId: clients[socket.id].roomId,
				result: details.result
			});
		} else {
			io.emit('resultantStds', {
				roomId: clients[socket.id].roomId,
				result: null
			});
		}
		fn(true);
	});
	socket.on('saveRecord', function(details, fn) {
		try {
			if (details.answer > 0 && activityDetails[details.roomId].successful == true) {
				var allRecords = db.getData("/users/" + details.username + "/records");
				var allRecordsArr = [];
				for (var i in allRecords) allRecordsArr.push(i);
				var lastRecord = allRecordsArr[allRecordsArr.length - 1];
				db.push("/users/" + details.username + "/records/" + lastRecord + "/answer", details.answer, true);
				db.push("/users/" + details.username + "/records/" + lastRecord + "/correctAnswer", details.correctAnswer, true);
				if (details.result != null) db.push("/users/" + details.username + "/records/" + lastRecord + "/result", details.result, true);
			}
			socket.emit('setStdRecordDateTime', getStdRecordDateTime(details.username));
		} catch (err) {}
		fn(true);
	});
	socket.on('leaveRoom', function(fn) {
		try {
			socket.leave(clients[socket.id].roomId);
			clients[socket.id].roomId = null;
		} catch (err) {}
		fn(true);
	});
	socket.on('getLastRecord', function(details, fn) {
		try{
			if(activityDetails[details.roomId].successful == true){
				var allRecords = db.getData("/users/" + details.username + "/records");
				var allRecordsArr = [];
				for (var i in allRecords) allRecordsArr.push(i);
				var lastRecord = allRecordsArr[allRecordsArr.length - 1];
				fn(allRecords[lastRecord].time);
			}else{
				fn(null);
			}
		}catch(err){
			
		}
	});
	socket.on('getRptDateTime', function(details, fn) {
		var allReports = db.getData("/reports");
		var allRptDateTime = [];
		for (var i in allReports) {
			if (allReports[i].semester == details.semester && allReports[i].section == details.section) allRptDateTime.push(i);
		}
		fn(allRptDateTime);
	});
	socket.on('getReport', function(dateTime, fn) {
		try {
			var allReports = db.getData("/reports");
			var optAnswer = db.getData("/users/" + allReports[dateTime].operator[0] + "/records/" + dateTime + "/answer");
			var optCorrectAnswer = db.getData("/users/" + allReports[dateTime].operator[0] + "/records/" + dateTime + "/correctAnswer");
			var obsAnswer = [],
				obsCorrectAnswer = [];
			for (var i = 0; i < allReports[dateTime].observers.length; i++) {
				obsAnswer[i] = db.getData("/users/" + allReports[dateTime].observers[i] + "/records/" + dateTime + "/answer");
				obsCorrectAnswer[i] = db.getData("/users/" + allReports[dateTime].observers[i] + "/records/" + dateTime + "/correctAnswer");
			}
			if (allReports[dateTime].algoType == 'search') {
				var details = {
					targetValue: allReports[dateTime].targetValue,
					targetValueIndex: allReports[dateTime].targetValueIndex,
					result: allReports[dateTime].result,
					algoType: 'search',
					algoName: allReports[dateTime].algoName,
					parametersType: allReports[dateTime].parametersType,
					parametersArr: allReports[dateTime].parametersArr,
					desiredStds: allReports[dateTime].desiredStds,
					playingSeq: allReports[dateTime].playingSeq,
					joinedStds: allReports[dateTime].joinedStds,
					shuffledStds: allReports[dateTime].shuffledStds,
					operator: allReports[dateTime].operator,
					optAnswer: optAnswer,
					optCorrectAnswer: optCorrectAnswer,
					actors: allReports[dateTime].actors,
					observers: allReports[dateTime].observers,
					obsAnswer: obsAnswer,
					obsCorrectAnswer: obsCorrectAnswer,
					time: allReports[dateTime].time
				}
			} else if (allReports[dateTime].algoType == 'sort') {
				var details = {
					dateTime: dateTime,
					sortedParametersArr: allReports[dateTime].sortedParametersArr,
					algoType: 'sort',
					algoName: allReports[dateTime].algoName,
					parametersType: allReports[dateTime].parametersType,
					parametersArr: allReports[dateTime].parametersArr,
					desiredStds: allReports[dateTime].desiredStds,
					playingSeq: allReports[dateTime].playingSeq,
					joinedStds: allReports[dateTime].joinedStds,
					shuffledStds: allReports[dateTime].shuffledStds,
					operator: allReports[dateTime].operator,
					optAnswer: optAnswer,
					optCorrectAnswer: optCorrectAnswer,
					actors: allReports[dateTime].actors,
					observers: allReports[dateTime].observers,
					obsAnswer: obsAnswer,
					obsCorrectAnswer: obsCorrectAnswer,
					time: allReports[dateTime].time
				}
			}
			fn(details);
		} catch (err) {
			console.log("socket.on('getReport'): " + err.message);
		}
	});
	socket.on('getRecord', function(details, fn) {
		var allRecords = db.getData("/users/" + details.username + "/records/" + details.dateTime);
		if (allRecords.userType == "operator" || allRecords.userType == "observer") {
			var thisCorrectAnswer = allRecords.correctAnswer;
			var thisAnswer = allRecords.answer
		} else {
			var thisCorrectAnswer = 0;
			var thisAnswer = 0;
		}
		fn({
			algoName: allRecords.algoName,
			time: allRecords.time,
			result: allRecords.result,
			correctAnswer: thisCorrectAnswer,
			answer: thisAnswer
		});
	});
	socket.on('getAlgoDetails', function(algoName, fn) {
		fn(algoDb.getData("/algorithms/" + algoName));
	});
	socket.on('addAlgo', function(details, fn) {
		var algosObj = algoDb.getData("/algorithms");
		var algoNamesArr = [];
		for (var i in algosObj) algoNamesArr.push(i);
		if (algoNamesArr.indexOf(details.algoName) == -1) {
			algoDb.push("/algorithms/" + details.algoName + "/algoType", details.algoType, true);
			algoDb.push("/algorithms/" + details.algoName + "/amtAlgoCode", details.amtAlgoCode, true);
			algoDb.push("/algorithms/" + details.algoName + "/algoCodeMain", details.algoCodeMain, true);
			if (details.amtAlgoCode == 2) {
				algoDb.push("/algorithms/" + details.algoName + "/algoCodeFn1", details.algoCodeFn1, true);
			} else if (details.amtAlgoCode == 3) {
				algoDb.push("/algorithms/" + details.algoName + "/algoCodeFn1", details.algoCodeFn1, true);
				algoDb.push("/algorithms/" + details.algoName + "/algoCodeFn2", details.algoCodeFn2, true);
			}
			algoDb.push("/algorithms/" + details.algoName + "/algoGuideBe", details.algoGuideBe, true);
			algoDb.push("/algorithms/" + details.algoName + "/algoGuideAf", details.algoGuideAf, true);
			algoDb.push("/algorithms/" + details.algoName + "/algoText", details.algoText, true);
			var newAlgosObj = algoDb.getData("/algorithms");
			var newAlgoNamesArr = [];
			for (var i in newAlgosObj) newAlgoNamesArr.push(i);
			if (newAlgoNamesArr.length > 0) socket.emit('setAlgoNames', newAlgosObj);
			else socket.emit('setEmptyAlgoNames');
			socket.emit('setRptSemesters', {
				allSemesters: getRptSemesters(),
				allSections: getRptSections()
			});
			fn(true);
		} else fn(false);
	});
	socket.on('editAlgo', function(details, fn) {
		algoDb.delete("/algorithms/" + details.algoNameOld);
		algoDb.push("/algorithms/" + details.algoNameNew + "/algoType", details.algoTypeNew, true);
		algoDb.push("/algorithms/" + details.algoNameNew + "/amtAlgoCode", details.amtAlgoCode, true);
		algoDb.push("/algorithms/" + details.algoNameNew + "/algoCodeMain", details.algoCodeMain, true);
		if (details.amtAlgoCode == 2) {
			algoDb.push("/algorithms/" + details.algoNameNew + "/algoCodeFn1", details.algoCodeFn1, true);
		} else if (details.amtAlgoCode == 3) {
			algoDb.push("/algorithms/" + details.algoNameNew + "/algoCodeFn1", details.algoCodeFn1, true);
			algoDb.push("/algorithms/" + details.algoNameNew + "/algoCodeFn2", details.algoCodeFn2, true);
		}
		algoDb.push("/algorithms/" + details.algoNameNew + "/algoGuideBe", details.algoGuideBe, true);
		algoDb.push("/algorithms/" + details.algoNameNew + "/algoGuideAf", details.algoGuideAf, true);
		algoDb.push("/algorithms/" + details.algoNameNew + "/algoText", details.algoText, true);
		var newAlgosObj = algoDb.getData("/algorithms");
		var newAlgoNamesArr = [];
		for (var i in newAlgosObj) newAlgoNamesArr.push(i);
		if (newAlgoNamesArr.length > 0) socket.emit('setAlgoNames', newAlgosObj);
		else socket.emit('setEmptyAlgoNames');
		socket.emit('setRptSemesters', {
			allSemesters: getRptSemesters(),
			allSections: getRptSections()
		});
		fn(true);
	});
	socket.on('delAlgo', function(algoName, fn) {
		algoDb.delete("/algorithms/" + algoName);
		var newAlgosObj = algoDb.getData("/algorithms");
		var newAlgoNamesArr = [];
		for (var i in newAlgosObj) newAlgoNamesArr.push(i);
		if (newAlgoNamesArr.length > 0) socket.emit('setAlgoNames', newAlgosObj);
		else socket.emit('setEmptyAlgoNames');
		socket.emit('setRptSemesters', {
			allSemesters: getRptSemesters(),
			allSections: getRptSections()
		});
		fn(true);
	});
	socket.on('delRoom', function() {
		try {
			io.sockets.emit('waitingStdsResultant', clients[socket.id].roomId);
			removeArray(rooms, clients[socket.id].roomId);
			delete activityDetails[clients[socket.id].roomId];
			clients[socket.id].roomId = null;
		} catch (err) {}
	});
	socket.on('logout', function(deviceKey, fn) {
		try {
			console.log(clients[socket.id].username, 'was logged out.');
			delete clients[socket.id];
			fn(true);
		} catch (err) {
			fn(false);
		}
	});
	socket.on('disconnect', function() {});
	function cmd_highlight(index, color = "", text = "") {
		try {
			if (activityDetails[socket.room].playingSeq.indexOf("Found") < 0 && activityDetails[socket.room].playingSeq.indexOf("Sorted") < 0) {
				if (index < 10) index = '0' + index;
				activityDetails[socket.room].playingSeq.push("Highlight " + index + " Color " + colourNameToHex(color) + " Text " + text);
			}
		} catch (err) {
			console.log('cmd_highlight: ' + err.message);
		}
	};
	function cmd_scan(index) {
		try {
			if (activityDetails[socket.room].playingSeq.indexOf("Found") < 0 && activityDetails[socket.room].playingSeq.indexOf("Sorted") < 0) {
				if (index < 10) index = '0' + index;
				activityDetails[socket.room].playingSeq.push("Scan " + index);
			}
		} catch (err) {
			console.log('cmd_scan: ' + err.message);
		}
	};
	function cmd_compare(indexA, symbol, indexB) {
		try {
			if (activityDetails[socket.room].playingSeq.indexOf("Found") < 0 && activityDetails[socket.room].playingSeq.indexOf("Sorted") < 0) {
				if (indexA < 10) indexA = '0' + indexA;
				if (indexB < 10) indexB = '0' + indexB;
				if (symbol == "<") activityDetails[socket.room].playingSeq.push("Compare " + indexA + " < " + indexB);
				else if (symbol == ">") activityDetails[socket.room].playingSeq.push("Compare " + indexA + " > " + indexB);
			}
		} catch (err) {
			console.log('cmd_compare: ' + err.message);
		}
	};
	function cmd_swap(indexA, indexB) {
		try {
			if (activityDetails[socket.room].playingSeq.indexOf("Found") < 0 && activityDetails[socket.room].playingSeq.indexOf("Sorted") < 0) {
				if (indexA < 10) indexA = '0' + indexA;
				if (indexB < 10) indexB = '0' + indexB;
				activityDetails[socket.room].playingSeq.push("Swap " + indexA + " and " + indexB);
			}
		} catch (err) {
			console.log('cmd_swap: ' + err.message);
		}
	};
	function cmd_is_sorted(array, sortingOrder = 'ascending') {
		try {
			if (JSON.stringify(array.slice()) === JSON.stringify(activityDetails[socket.room].sortedParametersArr.slice()) && activityDetails[socket.room].playingSeq.indexOf("Sorted") < 0) activityDetails[socket.room].playingSeq.push("Sorted");
		} catch (err) {
			console.log('cmd_is_sorted: ' + err.message);
		}
	};
	function cmd_is_found(index, targetValue) {
		try {
			if (activityDetails[socket.room].playingSeq.indexOf("Found") < 0) {
				if (index < 10) index = '0' + index;
				if (activityDetails[socket.room].playingSeq.indexOf("Value " + index + " = " + targetValue) < 0) activityDetails[socket.room].playingSeq.push("Value " + index + " = " + targetValue);
				if (activityDetails[socket.room].parametersArr[Number(index)] == targetValue) activityDetails[socket.room].playingSeq.push("Found");
			}
		} catch (err) {
			console.log('cmd_is_found: ' + err.message);
		}
	};
});
function searchStringInArray(array, string) {
	var regString = new RegExp(string, "gi");
	for (var j = 0; j < array.length; j++) {
		if (array[j].match(regString)) return true;
	}
	return false;
};
function colourNameToHex(colour) {
	var colours = {
		"aliceblue": "0xf0f8ff",
		"antiquewhite": "0xfaebd7",
		"aqua": "0x00ffff",
		"aquamarine": "0x7fffd4",
		"azure": "0xf0ffff",
		"beige": "0xf5f5dc",
		"bisque": "0xffe4c4",
		"black": "0x000000",
		"blanchedalmond": "0xffebcd",
		"blue": "0x0000ff",
		"blueviolet": "0x8a2be2",
		"brown": "0xa52a2a",
		"burlywood": "0xdeb887",
		"cadetblue": "0x5f9ea0",
		"chartreuse": "0x7fff00",
		"chocolate": "0xd2691e",
		"coral": "0xff7f50",
		"cornflowerblue": "0x6495ed",
		"cornsilk": "0xfff8dc",
		"crimson": "0xdc143c",
		"cyan": "0x00ffff",
		"darkblue": "0x00008b",
		"darkcyan": "0x008b8b",
		"darkgoldenrod": "0xb8860b",
		"darkgray": "0xa9a9a9",
		"darkgreen": "0x006400",
		"darkkhaki": "0xbdb76b",
		"darkmagenta": "0x8b008b",
		"darkolivegreen": "0x556b2f",
		"darkorange": "0xff8c00",
		"darkorchid": "0x9932cc",
		"darkred": "0x8b0000",
		"darksalmon": "0xe9967a",
		"darkseagreen": "0x8fbc8f",
		"darkslateblue": "0x483d8b",
		"darkslategray": "0x2f4f4f",
		"darkturquoise": "0x00ced1",
		"darkviolet": "0x9400d3",
		"deeppink": "0xff1493",
		"deepskyblue": "0x00bfff",
		"dimgray": "0x696969",
		"dodgerblue": "0x1e90ff",
		"firebrick": "0xb22222",
		"floralwhite": "0xfffaf0",
		"forestgreen": "0x228b22",
		"fuchsia": "0xff00ff",
		"gainsboro": "0xdcdcdc",
		"ghostwhite": "0xf8f8ff",
		"gold": "0xffd700",
		"goldenrod": "0xdaa520",
		"gray": "0x808080",
		"green": "0x008000",
		"greenyellow": "0xadff2f",
		"honeydew": "0xf0fff0",
		"hotpink": "0xff69b4",
		"indianred ": "0xcd5c5c",
		"indigo": "0x4b0082",
		"ivory": "0xfffff0",
		"khaki": "0xf0e68c",
		"lavender": "0xe6e6fa",
		"lavenderblush": "0xfff0f5",
		"lawngreen": "0x7cfc00",
		"lemonchiffon": "0xfffacd",
		"lightblue": "0xadd8e6",
		"lightcoral": "0xf08080",
		"lightcyan": "0xe0ffff",
		"lightgoldenrodyellow": "0xfafad2",
		"lightgrey": "0xd3d3d3",
		"lightgreen": "0x90ee90",
		"lightpink": "0xffb6c1",
		"lightsalmon": "0xffa07a",
		"lightseagreen": "0x20b2aa",
		"lightskyblue": "0x87cefa",
		"lightslategray": "0x778899",
		"lightsteelblue": "0xb0c4de",
		"lightyellow": "0xffffe0",
		"lime": "0x00ff00",
		"limegreen": "0x32cd32",
		"linen": "0xfaf0e6",
		"magenta": "0xff00ff",
		"maroon": "0x800000",
		"mediumaquamarine": "0x66cdaa",
		"mediumblue": "0x0000cd",
		"mediumorchid": "0xba55d3",
		"mediumpurple": "0x9370d8",
		"mediumseagreen": "0x3cb371",
		"mediumslateblue": "0x7b68ee",
		"mediumspringgreen": "0x00fa9a",
		"mediumturquoise": "0x48d1cc",
		"mediumvioletred": "0xc71585",
		"midnightblue": "0x191970",
		"mintcream": "0xf5fffa",
		"mistyrose": "0xffe4e1",
		"moccasin": "0xffe4b5",
		"navajowhite": "0xffdead",
		"navy": "0x000080",
		"oldlace": "0xfdf5e6",
		"olive": "0x808000",
		"olivedrab": "0x6b8e23",
		"orange": "0xffa500",
		"orangered": "0xff4500",
		"orchid": "0xda70d6",
		"palegoldenrod": "0xeee8aa",
		"palegreen": "0x98fb98",
		"paleturquoise": "0xafeeee",
		"palevioletred": "0xd87093",
		"papayawhip": "0xffefd5",
		"peachpuff": "0xffdab9",
		"peru": "0xcd853f",
		"pink": "0xffc0cb",
		"plum": "0xdda0dd",
		"powderblue": "0xb0e0e6",
		"purple": "0x800080",
		"rebeccapurple": "0x663399",
		"red": "0xff0000",
		"rosybrown": "0xbc8f8f",
		"royalblue": "0x4169e1",
		"saddlebrown": "0x8b4513",
		"salmon": "0xfa8072",
		"sandybrown": "0xf4a460",
		"seagreen": "0x2e8b57",
		"seashell": "0xfff5ee",
		"sienna": "0xa0522d",
		"silver": "0xc0c0c0",
		"skyblue": "0x87ceeb",
		"slateblue": "0x6a5acd",
		"slategray": "0x708090",
		"snow": "0xfffafa",
		"springgreen": "0x00ff7f",
		"steelblue": "0x4682b4",
		"tan": "0xd2b48c",
		"teal": "0x008080",
		"thistle": "0xd8bfd8",
		"tomato": "0xff6347",
		"turquoise": "0x40e0d0",
		"violet": "0xee82ee",
		"wheat": "0xf5deb3",
		"white": "0xffffff",
		"whitesmoke": "0xf5f5f5",
		"yellow": "0xffff00",
		"yellowgreen": "0x9acd32"
	};
	if (typeof colours[colour.toLowerCase()] != 'undefined') return colours[colour.toLowerCase()];
	return "0x000000";
};
function shuffledStds(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};
function getRptSemesters() {
	var allReports = db.getData("/reports");
	var allSemesters = [];
	for (var i in allReports) allSemesters.push(allReports[i].semester);
	allSemesters = Array.from(new Set(allSemesters));
	return allSemesters;
};
function getRptSections() {
	var allReports = db.getData("/reports");
	var allSections = [];
	for (var i in allReports) allSections.push(allReports[i].section);
	allSections = Array.from(new Set(allSections));
	return allSections;
};
function getStdRecordDateTime(username) {
	var allRecordDateTime = db.getData("/users/" + username + "/records");
	var allRecordDateTimeArr = [];
	for (var i in allRecordDateTime) allRecordDateTimeArr.push(i);
	return allRecordDateTimeArr;
};
function findLoggedInUser(array, key, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			return true;
		}
	}
	return null;
};
function getParameters(min, max) {
	var temp = [];
	while (max >= min) temp.push(max--);
	temp.sort(function() {
		return .5 - Math.random();
	});
	return temp;
};
function removeArray(arr) {
	var what,
		a = arguments,
		L = a.length,
		ax;
	while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax = arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
		}
	}
	return arr;
};
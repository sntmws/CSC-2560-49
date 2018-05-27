function TeacherMenu() {
	Phaser.State.call(this);
};
TeacherMenu.prototype.create = function() {
	background();
	app.global.roomId = null;
	app.global.algoName = null;
	app.global.algoType = null;
	app.global.stdIconSprite = [];
	app.global.parametersArr = [];
	app.global.swappedParametersArr = [];
	app.global.targetValue = null;
	app.global.desiredStds = 0;
	app.global.dateTime = null;
	app.global.time = null;
	app.global.result = null;
	app.global.popupOn = false;
	app.global.operator = [];
	app.global.actors = [];
	var mainMenuFrame = app.add.sprite(app.world.centerX, app.world.centerY, 'ui-12');
	mainMenuFrame.anchor.set(0.5);
	mainMenuFrame.alpha = 0.9;
	mainMenuFrame.width = app.width * 0.7;
	mainMenuFrame.height = app.height * 0.9;
	var title = app.add.text(mainMenuFrame.x, mainMenuFrame.y * 0.2, 'เมนูผู้สอน', {
		font: "128px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#911315',
		strokeThickness: 7,
		align: "center"
	});
	title.anchor.set(0.5);
	var createRoomButton = app.add.sprite(mainMenuFrame.x, mainMenuFrame.y * 0.645, 'bt-13');
	createRoomButton.anchor.set(0.5);
	createRoomButton.inputEnabled = true;
	createRoomButton.events.onInputOver.add(function() {
		createRoomButton.loadTexture('bt-14', 0, false);
		createRoomButtonText.stroke = '#6DC300';
	}, this);
	createRoomButton.events.onInputOut.add(function() {
		createRoomButton.loadTexture('bt-13', 0, false);
		createRoomButtonText.stroke = '#00B0DC';
	}, this);
	createRoomButton.events.onInputDown.add(function() {
		createRoomButton.loadTexture('bt-13', 0, false);
		createRoomButtonText.stroke = '#00B0DC';
		app.paused = true;
		$("#createRoomModal").modal();
	}, this);
	var createRoomButtonText = app.add.text(createRoomButton.x, createRoomButton.y - 12, 'เพิ่มการทำกิจกรรม', {
		font: "96px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	createRoomButtonText.anchor.set(0.5);
	createRoomButtonText.inputEnabled = true;
	createRoomButtonText.events.onInputOver.add(function() {
		createRoomButton.loadTexture('bt-14', 0, false);
		createRoomButtonText.stroke = '#6DC300';
	}, this);
	createRoomButtonText.events.onInputOut.add(function() {
		createRoomButton.loadTexture('bt-13', 0, false);
		createRoomButtonText.stroke = '#00B0DC';
	}, this);
	createRoomButtonText.events.onInputDown.add(function() {
		createRoomButton.loadTexture('bt-13', 0, false);
		createRoomButtonText.stroke = '#00B0DC';
		app.paused = true;
		$("#createRoomModal").modal();
	}, this);
	var algoManagerButton = app.add.sprite(mainMenuFrame.x, createRoomButton.y + 152, 'bt-13');
	algoManagerButton.anchor.set(0.5);
	algoManagerButton.inputEnabled = true;
	algoManagerButton.events.onInputOver.add(function() {
		algoManagerButton.loadTexture('bt-14', 0, false);
		algoManagerButtonText.stroke = '#6DC300';
	}, this);
	algoManagerButton.events.onInputOut.add(function() {
		algoManagerButton.loadTexture('bt-13', 0, false);
		algoManagerButtonText.stroke = '#00B0DC';
	}, this);
	algoManagerButton.events.onInputDown.add(function() {
		algoManagerButton.loadTexture('bt-13', 0, false);
		algoManagerButtonText.stroke = '#00B0DC';
		app.paused = true;
		document.getElementById("addAlgoButton").disabled = true;
		document.getElementById("editAlgoButton").disabled = true;
		$("#algoManagerModal").modal();
	}, this);
	var algoManagerButtonText = app.add.text(algoManagerButton.x, algoManagerButton.y - 12, 'จัดการขั้นตอนวิธี', {
		font: "96px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	algoManagerButtonText.anchor.set(0.5);
	algoManagerButtonText.inputEnabled = true;
	algoManagerButtonText.events.onInputOver.add(function() {
		algoManagerButton.loadTexture('bt-14', 0, false);
		algoManagerButtonText.stroke = '#6DC300';
	}, this);
	algoManagerButtonText.events.onInputOut.add(function() {
		algoManagerButton.loadTexture('bt-13', 0, false);
		algoManagerButtonText.stroke = '#00B0DC';
	}, this);
	algoManagerButtonText.events.onInputDown.add(function() {
		algoManagerButton.loadTexture('bt-13', 0, false);
		algoManagerButtonText.stroke = '#00B0DC';
		app.paused = true;
		document.getElementById("addAlgoButton").disabled = true;
		document.getElementById("editAlgoButton").disabled = true;
		$("#algoManagerModal").modal();
	}, this);
	var stdRecordsButton = app.add.sprite(mainMenuFrame.x, algoManagerButton.y + 152, 'bt-13');
	stdRecordsButton.anchor.set(0.5);
	stdRecordsButton.inputEnabled = true;
	stdRecordsButton.events.onInputOver.add(function() {
		stdRecordsButton.loadTexture('bt-14', 0, false);
		stdRecordsButtonText.stroke = '#6DC300';
	}, this);
	stdRecordsButton.events.onInputOut.add(function() {
		stdRecordsButton.loadTexture('bt-13', 0, false);
		stdRecordsButtonText.stroke = '#00B0DC';
	}, this);
	stdRecordsButton.events.onInputDown.add(function() {
		stdRecordsButton.loadTexture('bt-13', 0, false);
		stdRecordsButtonText.stroke = '#00B0DC';
		app.paused = true;
		$("#activityReportModal").modal();
	}, this);
	var stdRecordsButtonText = app.add.text(stdRecordsButton.x, stdRecordsButton.y - 12, 'รายงานการทำกิจกรรม', {
		font: "96px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	stdRecordsButtonText.anchor.set(0.5);
	stdRecordsButtonText.inputEnabled = true;
	stdRecordsButtonText.events.onInputOver.add(function() {
		stdRecordsButton.loadTexture('bt-14', 0, false);
		stdRecordsButtonText.stroke = '#6DC300';
	}, this);
	stdRecordsButtonText.events.onInputOut.add(function() {
		stdRecordsButton.loadTexture('bt-13', 0, false);
		stdRecordsButtonText.stroke = '#00B0DC';
	}, this);
	stdRecordsButtonText.events.onInputDown.add(function() {
		stdRecordsButton.loadTexture('bt-13', 0, false);
		stdRecordsButtonText.stroke = '#00B0DC';
		app.paused = true;
		$("#activityReportModal").modal();
	}, this);
	var logoutButton = app.add.sprite(mainMenuFrame.x, stdRecordsButton.y + 152, 'bt-13');
	logoutButton.anchor.set(0.5);
	logoutButton.inputEnabled = true;
	logoutButton.events.onInputOver.add(function() {
		logoutButton.loadTexture('bt-14', 0, false);
		logoutButtonText.stroke = '#6DC300';
	}, this);
	logoutButton.events.onInputOut.add(function() {
		logoutButton.loadTexture('bt-13', 0, false);
		logoutButtonText.stroke = '#00B0DC';
	}, this);
	logoutButton.events.onInputDown.add(function() {
		logoutButton.loadTexture('bt-13', 0, false);
		logoutButtonText.stroke = '#00B0DC';
		this.logout();
	}, this);
	var logoutButtonText = app.add.text(logoutButton.x, logoutButton.y - 12, 'ออกจากระบบ', {
		font: "96px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	logoutButtonText.anchor.set(0.5);
	logoutButtonText.inputEnabled = true;
	logoutButtonText.events.onInputOver.add(function() {
		logoutButton.loadTexture('bt-14', 0, false);
		logoutButtonText.stroke = '#6DC300';
	}, this);
	logoutButtonText.events.onInputOut.add(function() {
		logoutButton.loadTexture('bt-13', 0, false);
		logoutButtonText.stroke = '#00B0DC';
	}, this);
	logoutButtonText.events.onInputDown.add(function() {
		logoutButton.loadTexture('bt-13', 0, false);
		logoutButtonText.stroke = '#00B0DC';
		this.logout();
	}, this);
	createRoomButton.width = stdRecordsButtonText.width * 1.25;
	createRoomButton.height = stdRecordsButtonText.height * 1.25;
	algoManagerButton.width = stdRecordsButtonText.width * 1.25;
	algoManagerButton.height = stdRecordsButtonText.height * 1.25;
	stdRecordsButton.width = stdRecordsButtonText.width * 1.25;
	stdRecordsButton.height = stdRecordsButtonText.height * 1.25;
	logoutButton.width = stdRecordsButtonText.width * 1.25;
	logoutButton.height = stdRecordsButtonText.height * 1.25;
};
TeacherMenu.prototype.update = function() {
	backgroundAnimated();
};
function colorToRGBA(color) {
	var cvs, ctx;
	cvs = document.createElement('canvas');
	cvs.height = 1;
	cvs.width = 1;
	ctx = cvs.getContext('2d');
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 1, 1);
	return ctx.getImageData(0, 0, 1, 1).data;
};
function byteToHex(num) {
	return ('0' + num.toString(16)).slice(-2);
};
function colorToHex(color) {
	var rgba, hex;
	rgba = colorToRGBA(color);
	hex = [0, 1, 2].map(function(idx) {
		return byteToHex(rgba[idx]);
	}).join('');
	return "0x" + hex;
};
function getNumbers(min, max) {
	var temp = [];
	while (max >= min) temp.push(max--);
	temp.sort(function() {
		return .5 - Math.random();
	});
	return temp;
};
function createRoom(semester, section, algoType, algoName, parType, parSorting, parSortingOrder, desiredStds) {
	if (desiredStds > 41 || desiredStds < 3) {
		alert("จำนวนผู้เล่นไม่ถูกต้อง!");
		return false;
	}
	app.global.stdIconSprite = getNumbers(1, 40);
	for (var i = 0; i < app.global.stdIconSprite.length; i++) {
		if (app.global.stdIconSprite[i] < 10) app.global.stdIconSprite[i] = '0' + app.global.stdIconSprite[i];
	}
	if (algoType == "search") var targetValueIndex = Math.floor(Math.random() * (desiredStds - 1)) + 0;
	else if (algoType == "sort") var targetValueIndex = null;
	socket.emit('createRoom', {
		semester: semester,
		section: section,
		algoType: algoType,
		algoName: algoName,
		parametersType: parType,
		targetValueIndex: targetValueIndex,
		parSorting: parSorting,
		parSortingOrder: parSortingOrder,
		desiredStds: desiredStds,
		stdIconSprite: app.global.stdIconSprite
	}, function(details) {
		try {
			$("#creIssueReportMsg").html('');
			if (details.issueReport.length > 0) {
				for (var i = 0; i < details.issueReport.length; i++) {
					var row = $("<tr class='table-danger'><td style='font-size: 20px;'>" + (i + 1) + ". " + details.issueReport[i] + "</td></tr>");
					$("#creIssueReportMsg").append(row);
				}
				$('#createRoomModal').modal('toggle');
				$("#creIssueReportModal").modal();
			}else{
				app.paused = false;
			}
			console.log('Room ID: ' + details.roomId);
			console.log('Algorithm Name: ' + algoName);
			console.log('Parameters: ' + details.parametersArr);
			if (details.targetValue != null) {
				app.global.targetValue = details.targetValue;
				console.log('Target Value: ' + details.targetValue);
			}
			if (details.sortedParametersArr.length > 0) console.log('Sorted Parameters: ' + details.sortedParametersArr);
			console.log('Playing Sequence: ');
			console.log(details.playingSeq);
			$("#createRoomModal").modal('hide');
			app.global.roomId = details.roomId;
			app.global.algoName = algoName;
			app.global.algoType = algoType;
			app.global.parametersArr = details.parametersArr;
			app.global.swappedParametersArr = details.parametersArr;
			app.global.desiredStds = desiredStds;
			if (algoType == "search") {
				app.global.targetValue = details.targetValue;
			} else if (algoType == "sort") {}
			app.global.algoGuideBe = app.global.algosObj[algoName]["algoGuideBe"];
			app.global.algoGuideAf = app.global.algosObj[algoName]["algoGuideAf"];
			app.global.algoText = app.global.algosObj[algoName]["algoText"];
			app.state.start("WaitingRoom");
		} catch (err) {
			console.log(err.message);
		}
	});
};
function algoCheck(algoType, amtAlgoCode, algoCodeMain, algoCodeFn1 = null, algoCodeFn2 = null, fromFn = false) {
	function cmd_highlight(index, color = "", text = "") {
		try {
			if (typeof index == "number" && typeof color == "string" && typeof text == "string" && playingSeq.indexOf("Found.") < 0 && playingSeq.indexOf("Sorted.") < 0) {
				if (colorToHex(color) != "0x000000") playingSeq.push("Highlight actor \"" + (index + 1) + "\" by color \"" + color + "\" with text \"" + text + "\".");
				else if (color == "" && text == "") playingSeq.push("Unhighlight actor \"" + (index + 1) + "\".");
				playingSeqCount++;
			}
			if (typeof index != "number" && errorLog.indexOf('cmd_highlight(index << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_highlight(index << ประเภทตัวแปรไม่ถูกต้อง');
			if (typeof color != "string" && errorLog.indexOf('cmd_highlight(index, color << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_highlight(index, color << ประเภทตัวแปรไม่ถูกต้อง');
			else if (typeof color == "string" && color != "" && colorToHex(color) == "0x000000" && errorLog.indexOf('cmd_highlight(index, color << ค่าตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_highlight(index, color << ค่าตัวแปรไม่ถูกต้อง');
			if (typeof text != "string" && errorLog.indexOf('cmd_highlight(index, color, text << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_highlight(index, color, text << ประเภทตัวแปรไม่ถูกต้อง');
		} catch (err) {
			errorLog.push(err.message);
		}
	};
	function cmd_scan(index) {
		try {
			if (typeof index == "number" && playingSeq.indexOf("Found.") < 0 && playingSeq.indexOf("Sorted.") < 0) {
				playingSeq.push("Scan QR Code actor \"" + (index + 1) + "\".");
				playingSeqCount++;
			}
			if (typeof index != "number" && errorLog.indexOf('cmd_scan(index << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_scan(index << ประเภทตัวแปรไม่ถูกต้อง');
		} catch (err) {
			errorLog.push(err.message);
		}
	};
	function cmd_compare(indexA, symbol, indexB) {
		try {
			if (typeof indexA == "number" && typeof indexB == "number" && typeof symbol == "string" && (symbol == "<" || symbol == ">") && playingSeq.indexOf("Found.") < 0 && playingSeq.indexOf("Sorted.") < 0) {
				if (symbol == "<") playingSeq.push("Compare value of actor \"" + (indexA + 1) + "\" is less than value of actor \"" + (indexB + 1) + "\".");
				else if (symbol == ">") playingSeq.push("Compare value of actor \"" + (indexA + 1) + "\" is greater value of actor \"" + (indexB + 1) + "\".");
				playingSeqCount++;
			}
			if (typeof indexA != "number" && errorLog.indexOf('cmd_compare(indexA << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_compare(indexA << ประเภทตัวแปรไม่ถูกต้อง');
			if (typeof indexB != "number" && errorLog.indexOf('cmd_compare(indexA, symbol, indexB << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_compare(indexA, symbol, indexB << ประเภทตัวแปรไม่ถูกต้อง');
			if (typeof symbol != "string" && errorLog.indexOf('cmd_compare(indexA, symbol << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_compare(indexA, symbol << ประเภทตัวแปรไม่ถูกต้อง');
			else if (typeof symbol == "string" && symbol != "<" && symbol != ">" && errorLog.indexOf('cmd_compare(indexA, symbol << ค่าตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_compare(indexA, symbol << ค่าตัวแปรไม่ถูกต้อง');
		} catch (err) {
			errorLog.push(err.message);
		}
	};
	function cmd_swap(indexA, indexB) {
		try {
			if (typeof indexA == "number" && typeof indexB == "number" && playingSeq.indexOf("Found.") < 0 && playingSeq.indexOf("Sorted.") < 0) {
				playingSeq.push("Swap actor \"" + (indexA + 1) + "\" and actor \"" + (indexB + 1) + "\".");
				playingSeqCount++;
			}
			if (typeof indexA != "number" && errorLog.indexOf('cmd_swap(indexA << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_swap(indexA << ประเภทตัวแปรไม่ถูกต้อง');
			if (typeof indexB != "number" && errorLog.indexOf('cmd_swap(indexA, indexB << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_swap(indexA, indexB << ประเภทตัวแปรไม่ถูกต้อง');
		} catch (err) {
			errorLog.push(err.message);
		}
	};
	function cmd_is_sorted(array, sortingOrder) {
		try {
			if (sortingOrder == 'ascending') {
				if (Array.isArray(array) == true && JSON.stringify(array.slice()) === JSON.stringify(sortedParametersArrAscending.slice())) {
					if (playingSeq.indexOf("Sorted.") < 0) {
						playingSeq.push("Sorted.");
						playingSeqCount++;
					}
					sortingOrderAscending = 'yes';
				}
			} else if (sortingOrder == 'descending') {
				if (Array.isArray(array) == true && JSON.stringify(array.slice()) === JSON.stringify(sortedParametersArrDescending.slice())) {
					if (playingSeq.indexOf("Sorted.") < 0) {
						playingSeq.push("Sorted.");
						playingSeqCount++;
					}
					sortingOrderDescending = 'yes';
				}
			}
			if (Array.isArray(array) == false && errorLog.indexOf('cmd_is_sorted(array << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_is_sorted(array << ประเภทตัวแปรไม่ถูกต้อง');
			if (typeof sortingOrder != "string" && errorLog.indexOf('cmd_is_sorted(array, sortingOrder << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_is_sorted(array, sortingOrder << ประเภทตัวแปรไม่ถูกต้อง');
		} catch (err) {
			errorLog.push(err.message);
		}
	};
	function cmd_is_found(index, targetValue) {
		try {
			if (typeof index == "number" && typeof targetValue == typeof targetValue && playingSeq.indexOf("Found.") < 0) {
				playingSeq.push("Compare value of actor \"" + (index + 1) + "\" is \"" + parametersArr[index] + "\" and target value is \"" + targetValue + "\".");
				if (parametersArr[index] == targetValue) {
					playingSeq.push("Found.");
					searchResult = "พบค่าข้อมูลที่ผู้แสดงลำดับที่ \"" + (index + 1) + "\".";
				}
				playingSeqCount++;
			}
			if (typeof index != "number" && errorLog.indexOf('cmd_is_found(index << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_is_found(index << ประเภทตัวแปรไม่ถูกต้อง');
			if (typeof targetValue != typeof targetValue && errorLog.indexOf('cmd_is_found(index, targetValue << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('cmd_is_found(index, targetValue << ประเภทตัวแปรไม่ถูกต้อง');
		} catch (err) {
			errorLog.push(err.message);
		}
	};
	$("#algoCheckingSuccess").hide();
	$("#algoCheckingTargetValue").hide();
	$("#algoCheckingSearchingResult").hide();
	$("#algoCheckingSortingOrder").hide();
	$("#algoCheckingSortedOutputAscending").hide();
	$("#algoCheckingSortedOutputDescending").hide();
	$("#algoCheckingError").hide();
	$("#algoCheckingErrorMsg").hide();
	$("#algoCheckingErrorArr").html('');
	$("#algoCheckingErrorArr").hide();
	$("#playingSeqModalButton").hide();
	var errorLog = [];
	var playingSeq = [];
	var playingSeqCount = 0;
	var parametersArr = [];
	var sortingOrderAscending = 'no';
	var sortingOrderDescending = 'no';
	while (parametersArr.length < 9) {
		var randomnumber = Math.floor(Math.random() * 9) + 1;
		if (parametersArr.indexOf(randomnumber) > -1) continue;
		parametersArr[parametersArr.length] = randomnumber;
	}
	var sortedParametersArrAscending = parametersArr.slice();
	sortedParametersArrAscending.sort(function(a, b) {
		return a - b;
	});
	var sortedParametersArrDescending = parametersArr.slice();
	sortedParametersArrDescending.sort(function(a, b) {
		return b - a;
	});
	var sortingParametersArrAscending = parametersArr.slice();
	var sortingParametersArrDescending = parametersArr.slice();
	var targetValue = Math.floor(Math.random() * (10 - 1)) + 1;
	var targetValueNew;
	var searchResult = "ไม่พบ";
	try {
		if (amtAlgoCode == 3) {
			var fn2 = JSON.parse(JSON.stringify(String(algoCodeFn2)), function(key, value) {
				return eval("(" + value + ")");
			});
			var fn1 = JSON.parse(JSON.stringify(String(algoCodeFn1)), function(key, value) {
				return eval("(" + value + ")");
			});
		} else if (amtAlgoCode == 2) {
			var fn1 = JSON.parse(JSON.stringify(String(algoCodeFn1)), function(key, value) {
				return eval("(" + value + ")");
			});
		}
		var thisFn = JSON.parse(JSON.stringify(String(algoCodeMain)), function(key, value) {
			return eval("(" + value + ")");
		});
		var playingSeqResult = '';
		$('#algoCheckingInputParametersArrText').html(parametersArr.join(", "));
		if (algoType == 'search') {
			$("#algoCheckingTargetValueText").html(targetValue);
			$("#algoCheckingTargetValue").show();
			try {
				thisFn(parametersArr, targetValue);
			} catch (err) {
				errorLog.push(err.message);
			}
			$("#algoCheckingSearchingResultText").html(searchResult);
			$("#algoCheckingSearchingResult").show();
		} else if (algoType == 'sort') {
			try {
				thisFn(sortingParametersArrAscending, 'ascending');
				thisFn(sortingParametersArrDescending, 'descending');
			} catch (err) {
				errorLog.push(err.message);
			}
			if (sortingOrderAscending == 'yes' && sortingOrderDescending == 'yes') {
				$("#algoCheckingSortingOrderText").html('น้อยไปมาก และมากไปน้อย');
				$("#algoCheckingSortingOrder").show();
			} else if (sortingOrderAscending == 'yes' && sortingOrderDescending == 'no') {
				$("#algoCheckingSortingOrderText").html('น้อยไปมาก');
				$("#algoCheckingSortingOrder").show();
			} else if (sortingOrderAscending == 'no' && sortingOrderDescending == 'yes') {
				$("#algoCheckingSortingOrderText").html('มากไปน้อย');
				$("#algoCheckingSortingOrder").show();
			} else if (sortingOrderAscending == 'no' && sortingOrderDescending == 'no' && errorLog.indexOf('cmd_is_sorted(array, sortingOrder << ประเภทตัวแปรไม่ถูกต้อง') < 0) errorLog.push('ไม่พบการจัดเรียงชุดข้อมูล');
			if (sortingOrderAscending == 'yes') {
				$("#algoCheckingSortedOutputAscendingText").html(sortingParametersArrAscending.join(", "));
				$("#algoCheckingSortedOutputAscending").show();
			}
			if (sortingOrderDescending == 'yes') {
				$("#algoCheckingSortedOutputDescendingText").html(sortingParametersArrDescending.join(", "));
				$("#algoCheckingSortedOutputDescending").show();
			}
		}
		if (playingSeq.length > 0) {
			for (var i = 0; i <= playingSeqCount; i++) {
				if (playingSeq[i] != undefined) playingSeqResult += (i + 1) + '. ' + playingSeq[i] + "\n";
			}
		}
		if (errorLog.length > 0) {
			document.getElementById("addAlgoButton").disabled = true;
			document.getElementById("editAlgoButton").disabled = true;
			for (var i = 0; i < errorLog.length; i++) {
				var row = $("<tr><td style='font-size: 20px;'>" + errorLog[i] + "</td></tr>");
				$("#algoCheckingErrorArr").append(row);
			}
			$("#algoCheckingErrorArr").show();
			$("#algoCheckingError").show();
			$('#algoManagerModal').modal('toggle');
			$("#algoCheckingModal").modal();
			return false;
		} else {
			document.getElementById("addAlgoButton").disabled = false;
			document.getElementById("editAlgoButton").disabled = false;
			if (fromFn) return true;
			$("#playingSeqArr").html(playingSeqResult);
			$("#playingSeqArr").show();
			$("#algoCheckingSuccess").show();
			$("#playingSeqModalButton").show();
			$('#algoManagerModal').modal('toggle');
			$("#algoCheckingModal").modal();
		}
	} catch (err) {
		document.getElementById("addAlgoButton").disabled = true;
		document.getElementById("editAlgoButton").disabled = true;
		$("#algoCheckingErrorMsgText").html(err.message);
		$("#algoCheckingErrorMsg").show();
		$("#algoCheckingError").show();
		$('#algoManagerModal').modal('toggle');
		$("#algoCheckingModal").modal();
		return false;
	}
};
function addAlgo(algoType, algoName, amtAlgoCode, algoCodeMain, algoCodeFn1 = null, algoCodeFn2 = null, algoGuideBe, algoGuideAf, algoText) {
	if (algoCheck(algoType, amtAlgoCode, algoCodeMain, algoCodeFn1, algoCodeFn2, true)) {
		app.paused = false;
		socket.emit('addAlgo', {
			algoType: algoType,
			algoName: algoName,
			amtAlgoCode: amtAlgoCode,
			algoCodeMain: algoCodeMain,
			algoCodeFn1: algoCodeFn1,
			algoCodeFn2: algoCodeFn2,
			algoGuideBe: algoGuideBe,
			algoGuideAf: algoGuideAf,
			algoText: algoText
		}, function(result) {
			if (result == true) {
				alert('เพิ่มขั้นตอนวิธีแล้ว !');
				$("#algoManagerModal").modal('hide');
				$("#addAlgoNameText").val("");
				$("#addAmtAlgoCode").val("1").change();
				$("#addAlgoCodeSelect").val("1").change();
				$("#addAlgoCodeMain").val("");
				$("#addAlgoCodeFn1").val("");
				$("#addAlgoCodeFn2").val("");
				$("#addAlgoGuideBe").val("");
				$("#addAlgoGuideAf").val("");
				$("#addAlgoText").val("");
			} else {
				alert('เกิดข้อผิดพลาด, ไม่สามารถเพิ่มขั้นตอนวิธีได้');
			}
		});
	}
};
function editAlgo(algoTypeNew, algoNameOld, algoNameNew, amtAlgoCode, algoCodeMain, algoCodeFn1 = null, algoCodeFn2 = null, algoGuideBe, algoGuideAf, algoText) {
	if (algoCheck(algoTypeNew, amtAlgoCode, algoCodeMain, algoCodeFn1, algoCodeFn2, true)) {
		app.paused = false;
		socket.emit('editAlgo', {
			algoTypeNew: algoTypeNew,
			algoNameOld: algoNameOld,
			algoNameNew: algoNameNew,
			amtAlgoCode: amtAlgoCode,
			algoCodeMain: algoCodeMain,
			algoCodeFn1: algoCodeFn1,
			algoCodeFn2: algoCodeFn2,
			algoGuideBe: algoGuideBe,
			algoGuideAf: algoGuideAf,
			algoText: algoText
		}, function(result) {
			if (result == true) {
				alert('แก้ไขขั้นตอนวิธีแล้ว !');
				$("#algoManagerModal").modal('hide');
			} else {
				alert('เกิดข้อผิดพลาด, ไม่สามารถแก้ไขขั้นตอนวิธีได้');
			}
		});
	}
};
function delAlgo(algoName) {
	app.paused = false;
	socket.emit('delAlgo', algoName, function(result) {
		if (result == true) {
			alert('ลบขั้นตอนวิธีแล้ว !');
			$("#algoManagerModal").modal('hide');
		} else {
			alert('เกิดข้อผิดพลาด, ไม่สามารถลบขั้นตอนวิธีได้');
		}
	});
};
function getReport(semester, section, dateTime) {
	if (dateTime.length > 10) {
		socket.emit('getReport', dateTime, function(result) {
			$('#rptSearching').hide();
			$('#rptSearchingFooter').hide();
			$("#rptResultSemesters").text(semester);
			$("#rptResultSections").text(section);
			$("#rptResultDateTime").text(dateTime);
			$("#rptResultAlgoName").text(result.algoName);
			$("#rptResultOperator").text(result.operator + ' (' + result.optCorrectAnswer + '/' + result.optAnswer + ')');
			$("#rptResultActors").text(result.actors.join(', '));
			$("#rptResultObservers").text('');
			if (result.observers.length > 0) {
				for (var i = 0; i < result.observers.length; i++) {
					if (i > 0 && i % 3 == 0) $("#rptResultObservers").append('<br>');
					if (i < result.observers.length - 1) $("#rptResultObservers").append(result.observers[i] + ' (' + result.obsCorrectAnswer[i] + '/' + result.obsAnswer[i] + '), ');
					else $("#rptResultObservers").append(result.observers[i] + ' (' + result.obsCorrectAnswer[i] + '/' + result.obsAnswer[i] + ')');
				}
				$('#rptResultObserversTr').show();
				$('#rptResultObservers').show();
			} else {
				$('#rptResultObserversTr').hide();
				$('#rptResultObservers').hide();
			}
			$("#rptResultTime").text(result.time);
			$('#rptSearchingResultant').text('');
			if (result.result != undefined && result.result != null && typeof result.result == "string") {
				$('#rptSearchingResultant').text(result.result);
				$('#rptSearchingResultantTr').show();
				$('#rptSearchingResultant').show();
			} else {
				$('#rptSearchingResultantTr').hide();
				$('#rptSearchingResultant').hide();
			}
			$('#rptResult').show();
		});
	}
};
function backToTeacherMenu() {
	divSortManager.style.left = '-1920px';
	divSortManager.style.visibility = 'hidden';
	divMain.style.left = '0px';
	divMain.style.visibility = 'visible';
};
TeacherMenu.prototype.logout = function() {
	socket.emit('logout', app.global.deviceKey, function(result) {
		app.global.deviceKey = null;
		app.global.username = null;
		window.location.reload();
	});
};
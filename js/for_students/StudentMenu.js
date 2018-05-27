function StudentMenu() {
	Phaser.State.call(this);
};
StudentMenu.prototype.preload = function() {};
StudentMenu.prototype.create = function() {
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
	app.global.userType = null;
	app.global.index = null;
	app.global.parameter = null;
	app.global.scanned = false;
	app.global.answer = 0;
	app.global.correctAnswer = 0;
	if (app.global.username != null) {
		var dateTimeStdRecord = document.getElementById("dateTimeStdRecord");
		$("#dateTimeStdRecord").empty();
		socket.emit('getDateTimeStdRecords', app.global.username, function(result) {
			for (var i = 0; i < result.length; i++) {
				var option = document.createElement("option");
				option.value = result[i];
				option.text = result[i];
				dateTimeStdRecord.add(option);
			}
		});
	}
	var mainMenuFrame = app.add.sprite(app.world.centerX, app.world.centerY, 'ui-12');
	mainMenuFrame.anchor.set(0.5);
	mainMenuFrame.alpha = 0.9;
	mainMenuFrame.width = app.width * 0.95;
	mainMenuFrame.height = app.height * 0.3;
	title = app.add.text(mainMenuFrame.x, mainMenuFrame.y * 0.73, 'เมนูผู้เรียน', {
		font: "88px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#911315',
		strokeThickness: 7,
		align: "center"
	});
	title.anchor.set(0.5);
	joinedText = app.add.text(mainMenuFrame.x, mainMenuFrame.y * 0.95, 'เข้าร่วมการทำกิจกรรมแล้ว\r\nโปรดรอ...', {
		font: "72px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	joinedText.anchor.set(0.5);
	joinedText.visible = false;
	joinRoomButton = app.add.sprite(mainMenuFrame.x, mainMenuFrame.y * 0.9, 'bt-13');
	joinRoomButton.anchor.set(0.5);
	joinRoomButton.visible = true;
	joinRoomButton.inputEnabled = true;
	joinRoomButton.events.onInputDown.add(function() {
		app.paused = true;
		$("#joinRoomModal").modal();
	}, this);
	joinRoomButtonText = app.add.text(joinRoomButton.x, joinRoomButton.y - 12, 'เข้าร่วมการทำกิจกรรม', {
		font: "72px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	joinRoomButtonText.anchor.set(0.5);
	joinRoomButtonText.visible = true;
	joinRoomButtonText.inputEnabled = true;
	joinRoomButtonText.events.onInputDown.add(function() {
		app.paused = true;
		$("#joinRoomModal").modal();
	}, this);
	stdRecordButton = app.add.sprite(mainMenuFrame.x, joinRoomButton.y + 120, 'bt-13');
	stdRecordButton.anchor.set(0.5);
	stdRecordButton.visible = true;
	stdRecordButton.inputEnabled = true;
	stdRecordButton.events.onInputDown.add(function() {
		app.paused = true;
		$("#stdRecordModal").modal();
	}, this);
	stdRecordButtonText = app.add.text(stdRecordButton.x, stdRecordButton.y - 12, 'ดูสถิติตนเอง', {
		font: "72px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	stdRecordButtonText.anchor.set(0.5);
	stdRecordButtonText.visible = true;
	stdRecordButtonText.inputEnabled = true;
	stdRecordButtonText.events.onInputDown.add(function() {
		app.paused = true;
		$("#stdRecordModal").modal();
	}, this);
	logoutButton = app.add.sprite(mainMenuFrame.x, stdRecordButton.y + 120, 'bt-13');
	logoutButton.anchor.set(0.5);
	logoutButton.visible = true;
	app.time.events.add(Phaser.Timer.SECOND * 3, function() {
		logoutButton.inputEnabled = true;
		logoutButton.events.onInputDown.add(function() {
			this.logout();
		}, this);
	}, this);
	logoutButtonText = app.add.text(logoutButton.x, logoutButton.y - 12, 'ออกจากระบบ', {
		font: "72px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	logoutButtonText.anchor.set(0.5);
	logoutButtonText.visible = true;
	app.time.events.add(Phaser.Timer.SECOND * 3, function() {
		logoutButtonText.inputEnabled = true;
		logoutButtonText.events.onInputDown.add(function() {
			this.logout();
		}, this);
	}, this);
	joinRoomButton.width = joinRoomButtonText.width * 1.2;
	joinRoomButton.height = joinRoomButtonText.height * 1.2;
	stdRecordButton.width = joinRoomButtonText.width * 1.2;
	stdRecordButton.height = joinRoomButtonText.height * 1.2;
	logoutButton.width = joinRoomButtonText.width * 1.2;
	logoutButton.height = joinRoomButtonText.height * 1.2;
};
StudentMenu.prototype.update = function() {
	backgroundAnimated();
};
function joiningRoom(roomId) {
	app.paused = false;
	if (roomId == '') {
		return false;
	}
	if (app.device.iOS) var thisDevice = 'iOS';
	else var thisDevice = 'Android';
	socket.emit('joiningRoom', {
		roomId: roomId,
		username: app.global.username,
		thisDevice: thisDevice
	}, function(result) {
		if (result == true) {
			$("#joinRoomModal").modal('hide');
			$("#joinRoomModal input").val("");
			app.global.roomId = roomId;
			title.setText('เข้าร่วมการทำกิจกรรม');
			joinRoomButton.visible = false;
			joinRoomButton.inputEnabled = false;
			joinRoomButtonText.visible = false;
			joinRoomButtonText.inputEnabled = false;
			stdRecordButton.visible = false;
			stdRecordButton.inputEnabled = false;
			stdRecordButtonText.visible = false;
			stdRecordButtonText.inputEnabled = false;
			logoutButton.visible = false;
			logoutButton.inputEnabled = false;
			logoutButtonText.visible = false;
			logoutButtonText.inputEnabled = false;
			joinedText.visible = true;
			socket.on('quickLeave', function(quickLeaveRoomId) {
				if (quickLeaveRoomId == app.global.roomId) {
					socket.emit('leaveRoom', function(succeeded) {
						if (succeeded) {
							window.location.reload();
						}
					});
				}
			});
			socket.on('waitingStds', function(details) {
				if (details.roomId == app.global.roomId) {
					app.global.algoName = details.algoName;
					app.global.algoType = details.algoType;
					app.global.parametersArr = details.parametersArr;
					app.global.swappedParametersArr = details.parametersArr;
					app.global.desiredStds = details.desiredStds;
					if (details.targetValue != null) app.global.targetValue = details.targetValue;
					if (details.operator.indexOf(app.global.username) == 0) {
						app.global.userType = 'operator';
						console.log('operator');
					} else if (details.actors.indexOf(app.global.username) > -1) {
						app.global.userType = 'actor';
						console.log('actor');
						app.global.index = details.actors.indexOf(app.global.username);
						app.global.parameter = details.parametersArr[app.global.index];
						app.global.stdIconSprite = details.stdIconSprite;
						console.log('กรุณาออกมายืนหน้าชั้นตามลำดับ ' + (app.global.index + 1) + ', ' + app.global.parameter);
					} else if (details.observers.indexOf(app.global.username) > -1) {
						app.global.userType = 'observer';
						console.log('observer');
					}
					socket.off('waitingStds');
					app.state.start("PlayingRoom");
				}
			});
		} else {
			alert('รหัสห้องไม่ถูกต้อง!');
			app.state.restart();
		}
	});
};
function getRecord(dateTime) {
	app.paused = false;
	if (dateTime.length > 10) {
		socket.emit('getRecord', {
			username: app.global.username,
			dateTime: dateTime
		}, function(result) {
			$('#stdRecordSearching').hide();
			$('#stdRecordSearchingFooter').hide();
			$("#stdRecordResultDateTime").text(dateTime);
			$("#stdRecordResultAlgoName").text(result.algoName);
			$("#stdRecordResultTime").text(result.time);
			if (result.answer > 0) {
				$("#stdRecordResultCorrectAnswer").text(result.correctAnswer + '/' + result.answer);
				$("#stdRecordResultCorrectAnswerTr").show();
				$("#stdRecordResultCorrectAnswer").show();
			} else {
				$("#stdRecordResultCorrectAnswer").text('');
				$("#stdRecordResultCorrectAnswerTr").hide();
				$("#stdRecordResultCorrectAnswer").hide();
			}
			if (result.result != null) {
				$("#stdRecordSearchingResultant").text(result.result);
				$("#stdRecordSearchingResultantTr").show();
				$("#stdRecordSearchingResultant").show();
			} else {
				$("#stdRecordSearchingResultant").text('');
				$("#stdRecordSearchingResultantTr").hide();
				$("#stdRecordSearchingResultant").hide();
			}
			$('#stdRecordResult').show();
		});
	}
};
StudentMenu.prototype.logout = function() {
	socket.emit('logout', app.global.deviceKey, function(result) {
		app.global.deviceKey = null;
		app.global.username = null;
		window.location.reload();
	});
};
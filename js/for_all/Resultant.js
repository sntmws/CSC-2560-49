function Resultant() {
	Phaser.State.call(this);
};
Resultant.prototype.create = function() {
	background();
	if (app.device.desktop) {
		var resultantMenuFrame = app.add.sprite(app.world.centerX, app.world.centerY, 'ui-12');
		resultantMenuFrame.anchor.set(0.5);
		resultantMenuFrame.alpha = 0.9;
		resultantMenuFrame.width = app.width * 0.5;
		resultantMenuFrame.height = app.height * 0.9;
		var title = app.add.text(resultantMenuFrame.x, resultantMenuFrame.y * 0.225, 'สรุปผล', {
			font: "128px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#911315',
			strokeThickness: 7,
			align: "center"
		});
		title.anchor.set(0.5);
		resultText1 = app.add.text(resultantMenuFrame.x - 8, resultantMenuFrame.y * 0.65, '', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		resultText1.anchor.set(0.5);
		resultText2 = app.add.text(resultantMenuFrame.x - 8, resultantMenuFrame.y * 0.875, '', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		resultText2.anchor.set(0.5);
		resultText3 = app.add.text(resultantMenuFrame.x - 8, resultantMenuFrame.y * 1.1, '', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		resultText3.anchor.set(0.5);
		var replayButton = app.add.sprite(resultantMenuFrame.x, resultantMenuFrame.y * 1.5, 'bt-13');
		replayButton.anchor.set(0.5);
		replayButton.x -= replayButton.width * 0.3;
		replayButton.inputEnabled = true;
		replayButton.events.onInputOver.add(function() {
			replayButton.loadTexture('bt-14', 0, false);
			replayButtonText.stroke = '#6DC300';
		}, this);
		replayButton.events.onInputOut.add(function() {
			replayButton.loadTexture('bt-13', 0, false);
			replayButtonText.stroke = '#00B0DC';
		}, this);
		replayButton.events.onInputDown.add(function() {
			replayButton.loadTexture('bt-13', 0, false);
			replayButtonText.stroke = '#00B0DC';
			socket.emit('reRoom', function(details) {
				app.global.parametersArr = details.parametersArr;
				app.global.swappedParametersArr = details.parametersArr;
				app.global.targetValue = details.targetValue;
				app.global.operator = details.operator;
				app.global.actors = details.actors;
				app.state.start("PlayingRoom");
			});
		}, this);
		var replayButtonText = app.add.text(replayButton.x, replayButton.y - 8, 'อีกครั้ง', {
			font: "80px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		replayButtonText.anchor.set(0.5);
		replayButtonText.inputEnabled = true;
		replayButtonText.events.onInputOver.add(function() {
			replayButton.loadTexture('bt-14', 0, false);
			replayButtonText.stroke = '#6DC300';
		}, this);
		replayButtonText.events.onInputOut.add(function() {
			replayButton.loadTexture('bt-13', 0, false);
			replayButtonText.stroke = '#00B0DC';
		}, this);
		replayButtonText.events.onInputDown.add(function() {
			replayButton.loadTexture('bt-13', 0, false);
			replayButtonText.stroke = '#00B0DC';
			socket.emit('reRoom', function(details) {
				app.global.parametersArr = details.parametersArr;
				app.global.swappedParametersArr = details.parametersArr;
				app.global.targetValue = details.targetValue;
				app.global.operator = details.operator;
				app.global.actors = details.actors;
				app.state.start("PlayingRoom");
			});
		}, this);
		var backToMainMenuButton = app.add.sprite(resultantMenuFrame.x, resultantMenuFrame.y * 1.5, 'bt-13');
		backToMainMenuButton.anchor.set(0.5);
		backToMainMenuButton.x += backToMainMenuButton.width * 0.3;
		backToMainMenuButton.inputEnabled = true;
		backToMainMenuButton.events.onInputOver.add(function() {
			backToMainMenuButton.loadTexture('bt-14', 0, false);
			backToMainMenuButtonText.stroke = '#6DC300';
		}, this);
		backToMainMenuButton.events.onInputOut.add(function() {
			backToMainMenuButton.loadTexture('bt-13', 0, false);
			backToMainMenuButtonText.stroke = '#00B0DC';
		}, this);
		backToMainMenuButton.events.onInputDown.add(function() {
			backToMainMenuButton.loadTexture('bt-13', 0, false);
			backToMainMenuButtonText.stroke = '#00B0DC';
			socket.emit('delRoom');
			app.state.start("TeacherMenu");
		}, this);
		var backToMainMenuButtonText = app.add.text(backToMainMenuButton.x, backToMainMenuButton.y - 8, 'ยืนยัน', {
			font: "80px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		backToMainMenuButtonText.anchor.set(0.5);
		backToMainMenuButtonText.inputEnabled = true;
		backToMainMenuButtonText.events.onInputOver.add(function() {
			backToMainMenuButton.loadTexture('bt-14', 0, false);
			backToMainMenuButtonText.stroke = '#6DC300';
		}, this);
		backToMainMenuButtonText.events.onInputOut.add(function() {
			backToMainMenuButton.loadTexture('bt-13', 0, false);
			backToMainMenuButtonText.stroke = '#00B0DC';
		}, this);
		backToMainMenuButtonText.events.onInputDown.add(function() {
			backToMainMenuButton.loadTexture('bt-13', 0, false);
			backToMainMenuButtonText.stroke = '#00B0DC';
			socket.emit('delRoom');
			app.state.start("TeacherMenu");
		}, this);
		replayButton.width = replayButtonText.width * 1.25;
		replayButton.height = replayButtonText.height * 1.25;
		backToMainMenuButton.width = replayButtonText.width * 1.25;
		backToMainMenuButton.height = replayButtonText.height * 1.25;
	} else {
		socket.on('waitingStdsReRoom', function(details) {
			if (details.roomId == app.global.roomId) {
				app.global.answer = 0;
				app.global.correctAnswer = 0;
				app.global.result = null;
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
				socket.off('waitingStdsReRoom');
				socket.off('waitingStdsResultant');
				app.state.start("PlayingRoom");
			}
		});
		var resultantMenuFrame = app.add.sprite(app.world.centerX, app.world.centerY, 'ui-12');
		resultantMenuFrame.anchor.set(0.5);
		resultantMenuFrame.alpha = 0.9;
		resultantMenuFrame.width = app.width * 0.9;
		resultantMenuFrame.height = app.height * 0.4;
		var title = app.add.text(resultantMenuFrame.x, resultantMenuFrame.y * 0.65, 'สรุปผล', {
			font: "128px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#911315',
			strokeThickness: 7,
			align: "center"
		});
		title.anchor.set(0.5);
		resultText1 = app.add.text(resultantMenuFrame.x - 8, resultantMenuFrame.y * 0.825, '', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		resultText1.anchor.set(0.5);
		resultText2 = app.add.text(resultantMenuFrame.x - 8, resultantMenuFrame.y * 0.925, '', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		resultText2.anchor.set(0.5);
		resultText3 = app.add.text(resultantMenuFrame.x - 8, resultantMenuFrame.y * 1.025, '', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		resultText3.anchor.set(0.5);
		var backToMainMenuButton = app.add.sprite(resultantMenuFrame.x, resultantMenuFrame.y * 1.2, 'bt-13');
		backToMainMenuButton.anchor.set(0.5);
		backToMainMenuButton.visible = false;
		backToMainMenuButton.inputEnabled = false;
		backToMainMenuButton.events.onInputDown.add(function() {
			app.state.start("StudentMenu");
		}, this);
		var backToMainMenuButtonText = app.add.text(backToMainMenuButton.x, backToMainMenuButton.y - 8, 'ยืนยัน', {
			font: "80px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		backToMainMenuButtonText.anchor.set(0.5);
		backToMainMenuButtonText.visible = false;
		backToMainMenuButtonText.inputEnabled = false;
		backToMainMenuButtonText.events.onInputDown.add(function() {
			app.state.start("StudentMenu");
		}, this);
		backToMainMenuButton.width = backToMainMenuButtonText.width * 1.25;
		backToMainMenuButton.height = backToMainMenuButtonText.height * 1.25;
		socket.on('waitingStdsResultant', function(roomId) {
			if (roomId == app.global.roomId) {
				socket.emit('leaveRoom', function(leaveRoom) {
					if (leaveRoom) {
						backToMainMenuButton.visible = true;
						backToMainMenuButton.inputEnabled = true;
						backToMainMenuButtonText.visible = true;
						backToMainMenuButtonText.inputEnabled = true;
						socket.off('leaveRoom');
						socket.off('waitingStdsResultant');
						socket.off('waitingStdsReRoom');
					}
				});
			}
		});
	}
};
Resultant.prototype.update = function() {
	backgroundAnimated();
	if (app.device.desktop) {
		if (app.global.result != null) resultText2.setText(app.global.result);
		if(app.global.time == null){
			resultText1.setText('ไม่พบการทำกิจกรรม!');
		}else{
			resultText1.setText('เวลาที่ทำได้: ' + app.global.time);
		}
	} else {
		if (app.global.result != null) resultText2.setText(app.global.result);
		socket.emit('getLastRecord', {
			roomId: app.global.roomId,
			username: app.global.username
		}, function(time) {
			if(time != null){
				if (app.global.userType == 'operator' || app.global.userType == 'observer') resultText3.setText('ตอบถูก: ' + app.global.correctAnswer + '/' + app.global.answer);
				resultText1.setText('เวลาที่ทำได้: ' + time);
			}else{
				resultText1.setText('ไม่พบการทำกิจกรรม!');
			}
		});
	}
};
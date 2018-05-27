function WaitingRoom() {
	Phaser.State.call(this);
};
WaitingRoom.prototype.init = function() {
	app.kineticScrolling = app.plugins.add(Phaser.Plugin.KineticScrolling);
};
WaitingRoom.prototype.create = function() {
	background();
	var waitingRoomFrame = app.add.sprite(app.world.centerX, app.world.centerY, 'ui-5');
	waitingRoomFrame.anchor.set(0.5);
	waitingRoomFrame.alpha = 0.75;
	waitingRoomFrame.width = app.width * 0.95;
	waitingRoomFrame.height = app.height * 0.95;
	waitingRoomFrame.fixedToCamera = true;
	var title = app.add.text(waitingRoomFrame.x, app.world.centerY * 0.175, app.global.algoName, {
		font: "128px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	title.anchor.set(0.5);
	title.fixedToCamera = true;
	var mask = app.add.graphics();
	mask.beginFill(0xFFFFFF);
	mask.drawRect(app.width * 0.05, app.height * 0.25, waitingRoomFrame.width - (app.width * 0.075), waitingRoomFrame.height - (app.height * 0.35));
	mask.fixedToCamera = true;
	mask.visible = false;
	var roomIdText = app.add.text(waitingRoomFrame.x, waitingRoomFrame.y * 0.375, 'รหัสห้อง: ' + app.global.roomId, {
		font: "80px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	roomIdText.anchor.set(0.5);
	roomIdText.fixedToCamera = true;
	var readyButton = app.add.sprite(app.width * 0.85, roomIdText.y, 'bt-13');
	readyButton.anchor.set(0.5);
	readyButton.inputEnabled = false;
	readyButton.events.onInputOver.add(function() {
		readyButton.loadTexture('bt-14', 0, false);
		readyButtonText.stroke = '#6DC300';
	}, this);
	readyButton.events.onInputOut.add(function() {
		readyButton.loadTexture('bt-13', 0, false);
		readyButtonText.stroke = '#00B0DC';
	}, this);
	readyButton.events.onInputDown.add(function() {
		readyButton.loadTexture('bt-13', 0, false);
		readyButtonText.stroke = '#00B0DC';
		this.ready();
	}, this);
	readyButton.fixedToCamera = true;
	readyButton.alpha = 0;
	readyButton.visibility = false;
	var readyButtonText = app.add.text(readyButton.x, readyButton.y - 8, 'พร้อมเล่น', {
		font: "80px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	readyButtonText.anchor.set(0.5);
	readyButtonText.inputEnabled = false;
	readyButtonText.events.onInputOver.add(function() {
		readyButton.loadTexture('bt-14', 0, false);
		readyButtonText.stroke = '#6DC300';
	}, this);
	readyButtonText.events.onInputOut.add(function() {
		readyButton.loadTexture('bt-13', 0, false);
		readyButtonText.stroke = '#00B0DC';
	}, this);
	readyButtonText.events.onInputDown.add(function() {
		readyButton.loadTexture('bt-13', 0, false);
		readyButtonText.stroke = '#00B0DC';
		this.ready();
	}, this);
	readyButtonText.fixedToCamera = true;
	readyButtonText.alpha = 0;
	readyButtonText.visibility = false;
	readyButton.width = readyButtonText.width * 1.25;
	readyButton.height = readyButtonText.height * 1.25;
	var joinedCounterText = app.add.text(96, 120, 'จำนวนผู้เข้าร่วม: 0', {
		font: "56px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	joinedCounterText.fixedToCamera = true;
	var desiredOptAndActors = app.add.text(96, roomIdText.y + 20, 'จำนวนผู้ทำกิจกรรม (ที่ต้องการ): ' + app.global.desiredStds, {
		font: "36px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	desiredOptAndActors.anchor.set(0, 0.5);
	desiredOptAndActors.fixedToCamera = true;
	joinedStdsTextStyle = {
		font: "72px xfont",
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	};
	var joinedStds = [];
	joinedStds.length = 0;
	var joinedCount = 0;
	var joinedStdX = app.width * 0.05;
	var joinedStdY = app.height * 0.25;
	socket.on('joinedStd', function(details) {
		if (details.roomId == app.global.roomId) {
			if (joinedCount == 0 || joinedCount % 8 != 0) {
				var joinedStdText = app.add.text(joinedStdX, joinedStdY + (56 * (joinedCount % 8)), details.username, joinedStdsTextStyle);
				joinedStdText.mask = mask;
				joinedStds.push(joinedStdText);
				joinedCount++;
				joinedCounterText.setText('จำนวนผู้เข้าร่วม: ' + joinedCount);
			} else {
				joinedStdX += 480;
				var joinedStdText = app.add.text(joinedStdX, joinedStdY + (56 * (joinedCount % 8)), details.username, joinedStdsTextStyle);
				joinedStdText.mask = mask;
				joinedStds.push(joinedStdText);
				joinedCount++;
				joinedCounterText.setText('จำนวนผู้เข้าร่วม: ' + joinedCount);
			}
			if (joinedCount >= app.global.desiredStds) {
				readyButton.inputEnabled = true;
				readyButton.alpha = 1;
				readyButton.visibility = true;
				readyButtonText.inputEnabled = true;
				readyButtonText.alpha = 1;
				readyButtonText.visibility = true;
			}
			if (joinedCount >= 32) {
				joinedStds.mask = mask;
				app.kineticScrolling.start();
				app.world.setBounds(0, 0, app.width * (joinedStds.length), app.height);
			}
		}
	});
	var waitingRoomGuideFrame = app.add.sprite(waitingRoomFrame.x * 0.975, app.height * 0.8, 'myui-5');
	waitingRoomGuideFrame.anchor.set(0.5);
	waitingRoomGuideFrame.width = waitingRoomFrame.width * 0.92;
	waitingRoomGuideFrame.height = waitingRoomFrame.height * 0.15;
	waitingRoomGuideFrame.alpha = 0.85;
	waitingRoomGuideFrame.fixedToCamera = true;
	var waitingRoomGuideFrameText = app.add.text(waitingRoomGuideFrame.x, waitingRoomGuideFrame.y, 'การเข้าร่วมการทำกิจกรรม: ให้ผู้เรียนเลือกเมนู "เข้าร่วมการทำกิจกรรม" จากนั้นกรอกรหัสห้องที่ปรากฏบนหน้าจอของผู้สอน แล้วกดปุ่ม "ยืนยัน" ', {
		font: "40px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	waitingRoomGuideFrameText.anchor.set(0.5);
	waitingRoomGuideFrameText.fixedToCamera = true;
};
WaitingRoom.prototype.update = function() {
	backgroundAnimated();
};
WaitingRoom.prototype.ready = function() {
	socket.emit('getRandStds', function(result) {
		if (result == false) {
			alert('จำนวนผู้เรียนไม่เพียงพอต่อการสุ่ม!');
		} else {
			socket.off('joinedStd');
			app.global.operator = result.operator;
			app.global.actors = result.actors;
			app.kineticScrolling.stop();
			app.state.start("PlayingRoom");
		}
	});
};
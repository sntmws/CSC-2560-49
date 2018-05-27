function Login() {
	Phaser.State.call(this);
}
Login.prototype.preload = function() {};
Login.prototype.create = function() {
	background();
	if (app.device.desktop) {
		var title = app.add.sprite(app.world.centerX, app.world.centerY * 0.7, 'title');
		title.anchor.set(0.5);
		title.width = app.width * 0.65;
		title.height = app.height * 0.45;
		var mainMenuFrame = app.add.sprite(app.world.centerX, app.height * 0.8, 'ui-20');
		mainMenuFrame.anchor.set(0.5);
		mainMenuFrame.alpha = 0.9;
		var loginButton = app.add.sprite(mainMenuFrame.x, mainMenuFrame.y - (mainMenuFrame.height * 0.1), 'bt-13');
		loginButton.anchor.set(0.5);
		loginButton.inputEnabled = true;
		loginButton.events.onInputOver.add(function() {
			loginButton.loadTexture('bt-14', 0, false);
			loginButtonText.stroke = '#6DC300';
		}, this);
		loginButton.events.onInputOut.add(function() {
			loginButton.loadTexture('bt-13', 0, false);
			loginButtonText.stroke = '#00B0DC';
		}, this);
		loginButton.events.onInputDown.add(function() {
			loginButton.loadTexture('bt-13', 0, false);
			loginButtonText.stroke = '#00B0DC';
			app.paused = true;
			$("#loginModal").modal();
		}, this);
		var loginButtonText = app.add.text(loginButton.x, loginButton.y - 8, 'ลงชื่อเข้าใช้', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		loginButtonText.anchor.set(0.5);
		loginButtonText.inputEnabled = true;
		loginButtonText.events.onInputOver.add(function() {
			loginButton.loadTexture('bt-14', 0, false);
			loginButtonText.stroke = '#6DC300';
		}, this);
		loginButtonText.events.onInputOut.add(function() {
			loginButton.loadTexture('bt-13', 0, false);
			loginButtonText.stroke = '#00B0DC';
		}, this);
		loginButtonText.events.onInputDown.add(function() {
			loginButton.loadTexture('bt-13', 0, false);
			loginButtonText.stroke = '#00B0DC';
			app.paused = true;
			$("#loginModal").modal();
		}, this);
		var registerButton = app.add.sprite(mainMenuFrame.x, mainMenuFrame.y + (mainMenuFrame.height * 0.1), 'bt-13');
		registerButton.anchor.set(0.5);
		registerButton.inputEnabled = true;
		registerButton.events.onInputOver.add(function() {
			registerButton.loadTexture('bt-14', 0, false);
			registerButtonText.stroke = '#6DC300';
		}, this);
		registerButton.events.onInputOut.add(function() {
			registerButton.loadTexture('bt-13', 0, false);
			registerButtonText.stroke = '#00B0DC';
		}, this);
		registerButton.events.onInputDown.add(function() {
			registerButton.loadTexture('bt-13', 0, false);
			registerButtonText.stroke = '#00B0DC';
			app.paused = true;
			$("#registerModalT").modal();
		}, this);
		var registerButtonText = app.add.text(registerButton.x, registerButton.y - 8, 'สมัครสมาชิก', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		registerButtonText.anchor.set(0.5);
		registerButtonText.inputEnabled = true;
		registerButtonText.events.onInputOver.add(function() {
			registerButton.loadTexture('bt-14', 0, false);
			registerButtonText.stroke = '#6DC300';
		}, this);
		registerButtonText.events.onInputOut.add(function() {
			registerButton.loadTexture('bt-13', 0, false);
			registerButtonText.stroke = '#00B0DC';
		}, this);
		registerButtonText.events.onInputDown.add(function() {
			registerButton.loadTexture('bt-13', 0, false);
			registerButtonText.stroke = '#00B0DC';
			app.paused = true;
			$("#registerModalT").modal();
		}, this);
		loginButton.width = registerButtonText.width * 1.25;
		loginButton.height = registerButtonText.height * 1.25;
		registerButton.width = registerButtonText.width * 1.25;
		registerButton.height = registerButtonText.height * 1.25;
		mainMenuFrame.width = loginButton.width * 1.25;
		mainMenuFrame.height = loginButton.height * 3;
	} else {
		var title = app.add.sprite(app.world.centerX, app.world.centerY * 0.75, 'title');
		title.anchor.set(0.5);
		title.width = app.width * 0.85;
		title.height = app.height * 0.2;
		var mainMenuFrame = app.add.sprite(app.world.centerX, app.height * 0.8, 'ui-20');
		mainMenuFrame.anchor.set(0.5);
		mainMenuFrame.alpha = 0.9;
		var loginButton = app.add.sprite(mainMenuFrame.x, mainMenuFrame.y - (mainMenuFrame.height * 0.1), 'bt-13');
		loginButton.anchor.set(0.5);
		loginButton.inputEnabled = true;
		loginButton.events.onInputDown.add(function() {
			app.paused = true;
			$("#loginModal").modal();
		}, this);
		var loginButtonText = app.add.text(loginButton.x, loginButton.y - 8, 'ลงชื่อเข้าใช้', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		loginButtonText.anchor.set(0.5);
		loginButtonText.inputEnabled = true;
		loginButtonText.events.onInputDown.add(function() {
			app.paused = true;
			$("#loginModal").modal();
		}, this);
		var registerButton = app.add.sprite(mainMenuFrame.x, mainMenuFrame.y + (mainMenuFrame.height * 0.1), 'bt-13');
		registerButton.anchor.set(0.5);
		registerButton.inputEnabled = true;
		registerButton.events.onInputDown.add(function() {
			app.paused = true;
			$("#registerModalS").modal();
		}, this);
		var registerButtonText = app.add.text(registerButton.x, registerButton.y - 8, 'สมัครสมาชิก', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		registerButtonText.anchor.set(0.5);
		registerButtonText.inputEnabled = true;
		registerButtonText.events.onInputDown.add(function() {
			app.paused = true;
			$("#registerModalS").modal();
		}, this);
		loginButton.width = registerButtonText.width * 1.25;
		loginButton.height = registerButtonText.height * 1.25;
		registerButton.width = registerButtonText.width * 1.25;
		registerButton.height = registerButtonText.height * 1.25;
		mainMenuFrame.width = loginButton.width * 1.25;
		mainMenuFrame.height = loginButton.height * 3;
	}
	credit();
};
Login.prototype.update = function() {
	backgroundAnimated();
};
function loginValidation(username, password) {
	app.paused = false;
	socket.emit('loginValidation', {
		deviceKey: app.global.deviceKey,
		username: username,
		password: password
	}, function(result) {
		if (result == true) {
			$("#loginModal").modal('hide');
			$("#loginModal input").val("");
			app.global.username = username;
			console.log('Username: ' + username);
			socket.off('finish');
			if (app.device.desktop) app.state.start("TeacherMenu");
			else app.state.start("StudentMenu");
		} else {
			if (app.device.desktop) alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง !');
			else alert('รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง !');
			app.state.restart();
		}
	});
}
function registerValidation(title, firstName, lastName, username, password1, password2) {
	app.paused = false;
	if (app.device.desktop) {
		var valid = new RegExp("^[a-zA-Z0-9]{1,12}$");
		if (valid.test(username) == false) {
			alert('ชื่อผู้ใช้ไม่ถูกต้อง !');
			return false;
		}
		if (valid.test(password1) == false || valid.test(password2) == false) {
			alert('เงื่อนไขรหัสผ่านไม่ถูกต้อง ! (a-z, A-z, 0-9 และไม่เกิน 12ตัว)');
			return false;
		}
		if (password1 != password2) {
			alert('รหัสผ่านไม่ทั้งสองไม่ตรงกัน !');
			return false;
		}
		socket.emit('registerValidation', {
			userType: 'teacher',
			username: username,
			password: password1
		}, function(result) {
			if (result == true) {
				alert('สมัครสมาชิกสำเร็จ !');
				$("#registerModalT").modal('hide');
				$("#registerModalT input").val("");
				app.state.start("Login");
			} else {
				alert('คุณเป็นสมาชิกในระบบอยู่แล้ว !');
				app.state.start("Login");
			}
		});
	} else {
		var lettersThValid = new RegExp("^[ก-๎]+$");
		var usernameValid = new RegExp("^(([0-9]{9}))*-([0-9]{1})$");
		var passwordValid = new RegExp("^[a-zA-Z0-9]{1,12}$");
		if (title != 'นาย' && title != 'นาง' && title != 'นางสาว') {
			alert('คำนำหน้าชื่อไม่ถูกต้อง !');
			return false;
		}
		if (lettersThValid.test(firstName) == false) {
			alert('ชื่อไม่ถูกต้อง !');
			return false;
		}
		if (lettersThValid.test(lastName) == false) {
			alert('นามสกุลไม่ถูกต้อง !');
			return false;
		}
		if (usernameValid.test(username) == false) {
			alert('รหัสนักศึกษาไม่ถูกต้อง !');
			return false;
		}
		if (passwordValid.test(password1) == false || passwordValid.test(password2) == false) {
			alert('เงื่อนไขรหัสผ่านไม่ถูกต้อง ! (a-z, A-z, 0-9 และไม่เกิน 12ตัว)');
			return false;
		}
		if (password1 != password2) {
			alert('รหัสผ่านไม่ทั้งสองไม่ตรงกัน !');
			return false;
		}
		socket.emit('registerValidation', {
			userType: 'student',
			title: title,
			firstName: firstName,
			lastName: lastName,
			username: username,
			password: password1
		}, function(result) {
			if (result == true) {
				alert('สมัครสมาชิกสำเร็จ !');
				$("#registerModalS").modal('hide');
				$("#registerModalS input").val("");
				app.state.start("Login");
			} else {
				alert('คุณเป็นสมาชิกในระบบอยู่แล้ว !');
				app.state.start("Login");
			}
		});
	}
};
function credit() {
	var credit = app.add.text(app.width, app.height, 'Bachelor of Science Project in Computer Science, Khon Kaen University.', {
		font: "28px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#00B0DC',
		strokeThickness: 7,
		align: "center"
	});
	credit.anchor.set(1);
	credit.alpha = 0.5;
};
function showMsgBox(textBody, autoHide = false, textHeader = '') {
	if (this.msgBox) {
		this.popupBg.destroy();
		this.msgBox.destroy();
	}
	if (app.device.desktop) {
		var w = app.width * 0.5;
		var h = app.height * 0.65;
		var closeButtonScale = 0.75;
		var textBody1Style = {
			font: "72px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		}
	} else {
		var w = app.width * 0.75;
		var h = app.height * 0.4;
		var closeButtonScale = 0.75;
		var textBody1Style = {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		}
	}
	var textHeader1Style = {
		font: "88px xfont",
		fontWeight: 'bold',
		fill: "#FFFFFF",
		stroke: '#911315',
		strokeThickness: 7,
		align: "center"
	}
	var popupBg = app.add.sprite(0, 0, "black");
	var msgBox = app.add.group();
	var popupUi = app.add.sprite(0, 0, "ui-18");
	closeButton = app.add.sprite(0, 0, "bt-42");
	var textHeader1 = app.add.text(0, 0, textHeader, textHeader1Style);
	textHeader1.wordWrap = true;
	textHeader1.wordWrapWidth = w * .9;
	var textBody1 = app.add.text(0, 0, textBody, textBody1Style);
	textBody1.wordWrap = true;
	textBody1.wordWrapWidth = w * .9;
	popupBg.alpha = 0.75;
	popupBg.width = app.width;
	popupBg.height = app.height;
	popupUi.width = w;
	popupUi.height = h;
	closeButton.scale.setTo(closeButtonScale);
	msgBox.add(popupUi);
	msgBox.add(closeButton);
	msgBox.add(textHeader1);
	msgBox.add(textBody1);
	closeButton.x = popupUi.width / 2 - closeButton.width / 2;
	closeButton.y = popupUi.height - closeButton.height;
	closeButton.inputEnabled = true;
	closeButton.events.onInputOver.add(function() {
		closeButton.loadTexture('bt-43', 0, false);
	}, this);
	closeButton.events.onInputOut.add(function() {
		closeButton.loadTexture('bt-42', 0, false);
	}, this);
	closeButton.events.onInputDown.add(function() {
		closeButton.loadTexture('bt-43', 0, false);
		popupBg.destroy();
		msgBox.destroy();
	}, this);
	msgBox.x = app.width / 2 - msgBox.width / 2;
	msgBox.y = app.height / 2 - msgBox.height / 2;
	textHeader1.anchor.set(0.5);
	textHeader1.x = popupUi.width / 2 - textHeader1.width / 2;
	textHeader1.y = popupUi.y + (textHeader1.height / 2) + 8;
	textBody1.x = popupUi.width / 2 - textBody1.width / 2;
	textBody1.y = popupUi.height / 2 - textBody1.height / 2;
	this.popupBg = popupBg;
	this.msgBox = msgBox;
	if (autoHide == true) {
		app.time.events.add(Phaser.Timer.SECOND * 3, function() {
			popupBg.destroy();
			msgBox.destroy();
		}, this);
	}
};
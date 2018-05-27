function Preload() {
	Phaser.State.call(this);
};
Preload.prototype.preload = function() {
	var preloadBar = app.add.sprite(app.world.centerX, app.world.centerY, "loading");
	preloadBar.anchor.set(0.5, 0.5);
	app.load.setPreloadSprite(preloadBar);
	app.load.pack("start", "assets/assets-pack.json");
};
Preload.prototype.create = function() {
	try {
		app.time.desiredFps = 30;
		socket = io.connect({
			reconnect: false,
			rejectUnauthorized: false
		});
		socket.on('connect', function() {
			socket.io.engine.id = app.global.deviceKey;
			if (socket.connected == true) {
				if (app.device.desktop) {
					socket.on('setAlgoNames', function(algosObj) {
						app.global.algosObj = algosObj;
						app.global.algoNamesArr = [];
						for (var i in app.global.algosObj) app.global.algoNamesArr.push(i);
						var creAlgoName = document.getElementById("creAlgoName");
						var editAlgoName = document.getElementById("editAlgoName");
						var delAlgoName = document.getElementById("delAlgoName");
						var creAlgoType = document.getElementById("creAlgoType").value;
						var editAlgoType = document.getElementById("editAlgoType").value;
						var delAlgoType = document.getElementById("delAlgoType").value;
						$("#creAlgoName").empty();
						$("#editAlgoName").empty();
						$("#delAlgoName").empty();
						for (var i = 0; i < app.global.algoNamesArr.length; i++) {
							if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == creAlgoType) {
								var option = document.createElement("option");
								option.value = app.global.algoNamesArr[i];
								option.text = app.global.algoNamesArr[i];
								creAlgoName.add(option);
							}
						}
						for (var i = 0; i < app.global.algoNamesArr.length; i++) {
							if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == editAlgoType) {
								var option = document.createElement("option");
								option.value = app.global.algoNamesArr[i];
								option.text = app.global.algoNamesArr[i];
								editAlgoName.add(option);
							}
						}
						for (var i = 0; i < app.global.algoNamesArr.length; i++) {
							if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == delAlgoType) {
								var option = document.createElement("option");
								option.value = app.global.algoNamesArr[i];
								option.text = app.global.algoNamesArr[i];
								delAlgoName.add(option);
							}
						}
						var editAlgoNameValue = editAlgoName.options[editAlgoName.selectedIndex].value;
						document.getElementById("editAlgoNameNew").value = editAlgoNameValue;
						$("#editAmtAlgoCode").val(app.global.algosObj[editAlgoNameValue]["amtAlgoCode"]).change();
						$("#editAlgoCodeSelect").val("1").change();
						editAlgoCodeMain.setValue(app.global.algosObj[editAlgoNameValue]["algoCodeMain"]);
						if (app.global.algosObj[editAlgoNameValue]["amtAlgoCode"] == 1) {
							editAlgoCodeFn1.setValue("");
							editAlgoCodeFn2.setValue("");
						} else if (app.global.algosObj[editAlgoNameValue]["amtAlgoCode"] == 2) {
							editAlgoCodeFn1.setValue(app.global.algosObj[editAlgoNameValue]["algoCodeFn1"]);
							editAlgoCodeFn2.setValue("");
						} else if (app.global.algosObj[editAlgoNameValue]["amtAlgoCode"] == 3) {
							editAlgoCodeFn1.setValue(app.global.algosObj[editAlgoNameValue]["algoCodeFn1"]);
							editAlgoCodeFn2.setValue(app.global.algosObj[editAlgoNameValue]["algoCodeFn2"]);
						}
						document.getElementById("editAlgoGuideBe").value = app.global.algosObj[editAlgoNameValue]["algoGuideBe"];
						document.getElementById("editAlgoGuideAf").value = app.global.algosObj[editAlgoNameValue]["algoGuideAf"];
						document.getElementById("editAlgoText").value = app.global.algosObj[editAlgoNameValue]["algoText"];
					});
					socket.on('setEmptyAlgoNames', function() {
						$("#creAlgoName").empty();
						$("#editAlgoName").empty();
						$("#delAlgoName").empty();
					});
					socket.on('setRptSemesters', function(details) {
						var rptSemesters = document.getElementById("rptSemesters");
						var rptSections = document.getElementById("rptSections");
						$("#rptSemesters").empty();
						$("#rptSections").empty();
						var allSemesters = details.allSemesters;
						var allSections = details.allSections;
						for (var i = 0; i < allSemesters.length; i++) {
							if (allSemesters[i] != null || allSemesters[i] != undefined) {
								var option = document.createElement("option");
								option.value = allSemesters[i];
								option.text = allSemesters[i];
								rptSemesters.add(option);
							}
						}
						for (var i = 0; i < allSections.length; i++) {
							if (allSections[i] != null || allSections[i] != undefined) {
								var option = document.createElement("option");
								option.value = allSections[i];
								option.text = allSections[i];
								rptSections.add(option);
							}
						}
						var rptSemestersValue = rptSemesters.options[rptSemesters.selectedIndex].value;
						var rptSectionsValue = rptSections.options[rptSections.selectedIndex].value;
						var rptDateTime = document.getElementById("rptDateTime");
						$("#rptDateTime").empty();
						socket.emit('getRptDateTime', {
							semester: rptSemestersValue,
							section: rptSectionsValue
						}, function(result) {
							for (var i = 0; i < result.length; i++) {
								var option = document.createElement("option");
								option.value = result[i];
								option.text = result[i];
								rptDateTime.add(option);
							}
						});
					});
				} else {
					socket.on('setStdRecordDateTime', function(allStdRecordDateTime) {
						var stdRecordDateTime = document.getElementById("stdRecordDateTime");
						$("#stdRecordDateTime").empty();
						for (var i = 0; i < allStdRecordDateTime.length; i++) {
							if (allStdRecordDateTime[i] != null || allStdRecordDateTime[i] != undefined) {
								var option = document.createElement("option");
								option.value = allStdRecordDateTime[i];
								option.text = allStdRecordDateTime[i];
								stdRecordDateTime.add(option);
							}
						}
					});
					divMain = document.getElementById('Main');
					divQRCodeScanner = document.getElementById('QRCodeScanner');
					document.getElementById("camsource").width = window.screen.availWidth;
					document.getElementById("qr-canvas").width = window.screen.availWidth;
				}
				socket.emit('isLoggedIn', app.global.deviceKey, function(username) {
					if (username != false) {
						console.log('อยู่ในระบบแล้ว');
						app.global.username = username;
						if (app.device.desktop) app.state.start("TeacherMenu");
						else app.state.start("StudentMenu");
					} else {
						console.log('ยังไม่เคยลงชื่อเข้าใช้');
						app.state.start("Login");
					}
				});
			}
		});
	} catch (err) {
		console.log('Preload.js: ' + err.message);
	}
};
function background() {
	bg1 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg-1');
	bg1.fixedToCamera = true;
	bg2 = app.add.sprite(0, 0, 'bg-2');
	bg2.fixedToCamera = true;
	bg3 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg-3');
	bg3.fixedToCamera = true;
	bg4 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg-4');
	bg4.fixedToCamera = true;
	bg5 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg-5');
	bg5.fixedToCamera = true;
	bg6 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg-6');
	bg6.fixedToCamera = true;
	bg7 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg-7');
	bg7.fixedToCamera = true;
	bg8 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg-8');
	bg8.fixedToCamera = true;
	if (bg1.width < app.width) {
		bg1.width += app.width;
		bg3.width += app.width;
		bg4.width += app.width;
		bg5.width += app.width;
		bg6.width += app.width;
		bg7.width += app.width;
		bg8.width += app.width;
	}
	if (bg1.height < app.height) {
		bg1.scale.y = app.height / bg1.height;
		bg3.scale.y = app.height / bg3.height;
		bg4.scale.y = app.height / bg4.height;
		bg5.scale.y = app.height / bg5.height;
		bg6.scale.y = app.height / bg6.height;
		bg7.scale.y = app.height / bg7.height;
		bg8.scale.y = app.height / bg8.height;
	} else {
		bg1.scale.y = bg1.height / app.height;
		bg3.scale.y = bg3.height / app.height;
		bg4.scale.y = bg4.height / app.height;
		bg5.scale.y = bg5.height / app.height;
		bg6.scale.y = bg6.height / app.height;
		bg7.scale.y = bg7.height / app.height;
		bg8.scale.y = bg8.height / app.height;
	}
};
function backgroundAnimated() {
	if (app.device.desktop) {
		bg3.tilePosition.x -= 0.22;
		bg4.tilePosition.x -= 0.33;
		bg5.tilePosition.x -= 0.44;
		bg6.tilePosition.x -= 0.55;
		bg7.tilePosition.x -= 0.66;
		bg8.tilePosition.x -= 0.77;
	} else {
		bg3.tilePosition.x -= 0.33;
		bg4.tilePosition.x -= 0.44;
		bg5.tilePosition.x -= 0.55;
		bg6.tilePosition.x -= 0.66;
		bg7.tilePosition.x -= 0.77;
		bg8.tilePosition.x -= 0.88;
	}
};
function background2() {
	bg2_1 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg2-1');
	bg2_1.fixedToCamera = true;
	bg2_2 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg2-2');
	bg2_2.anchor.set(0, 0.25);
	bg2_2.fixedToCamera = true;
	bg2_2.alpha = 0.5;
	bg2_3 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg2-3');
	bg2_3.anchor.set(0, 0.25);
	bg2_3.fixedToCamera = true;
	bg2_3.alpha = 0.5;
	bg2_4 = app.add.tileSprite(0, 0, 1920 * window.devicePixelRatio, 1080, 'bg2-4');
	bg2_4.anchor.set(0, 0.25);
	bg2_4.fixedToCamera = true;
	bg2_4.alpha = 0.5;
	if (bg2_1.width < app.width) {
		bg2_1.width += app.width;
		bg2_2.width += app.width;
		bg2_3.width += app.width;
		bg2_4.width += app.width;
	}
	if (bg2_1.height < app.height) {
		bg2_1.scale.y = app.height / bg2_1.height;
		bg2_2.scale.y = app.height / bg2_2.height;
		bg2_3.scale.y = app.height / bg2_3.height;
		bg2_4.scale.y = app.height / bg2_4.height;
	} else {
		bg2_1.scale.y = bg2_1.height / app.height;
		bg2_2.scale.y = bg2_2.height / app.height;
		bg2_3.scale.y = bg2_3.height / app.height;
		bg2_4.scale.y = bg2_4.height / app.height;
	}
};
function backgroundAnimated2() {
	if (app.device.desktop) {
		bg2_2.tilePosition.x -= 0.30;
		bg2_3.tilePosition.x -= 0.50;
		bg2_4.tilePosition.x -= 0.70;
	} else {
		bg2_2.tilePosition.x -= 0.20;
		bg2_3.tilePosition.x -= 0.30;
		bg2_4.tilePosition.x -= 0.40;
	}
};
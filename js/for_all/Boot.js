function Boot() {
	Phaser.State.call(this);
};
Boot.prototype.preload = function() {
	app.load.pack("preload", "assets/assets-pack.json");
};
Boot.prototype.create = function() {
	new Fingerprint2().get(function(result) {
		app.global.deviceKey = result;
	});
	app.input.maxPointers = 1;
	app.stage.disableVisibilityChange = true;
	if (app.device.desktop) {
		app.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		app.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		app.scale.forceOrientation(true);
		$("#registerModalS").remove();
		$("#joinRoomModal").remove();
		$("#stdRecordModal").remove();
		$("#QRCodeScanner").remove();
		addAlgoCodeMain = CodeMirror.fromTextArea(document.getElementById("addAlgoCodeMain"), {
			mode: "javascript",
			lineNumbers: true,
			lineWrapping: false,
			indentWithTabs: true,
			smartIndent: true,
			extraKeys: {
				"F9": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function(cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		});
		addAlgoCodeFn1 = CodeMirror.fromTextArea(document.getElementById("addAlgoCodeFn1"), {
			mode: "javascript",
			lineNumbers: true,
			lineWrapping: false,
			indentWithTabs: true,
			smartIndent: true,
			extraKeys: {
				"F9": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function(cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		});
		addAlgoCodeFn2 = CodeMirror.fromTextArea(document.getElementById("addAlgoCodeFn2"), {
			mode: "javascript",
			lineNumbers: true,
			lineWrapping: false,
			indentWithTabs: true,
			smartIndent: true,
			extraKeys: {
				"F9": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function(cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		});
		editAlgoCodeMain = CodeMirror.fromTextArea(document.getElementById("editAlgoCodeMain"), {
			mode: "javascript",
			lineNumbers: true,
			lineWrapping: false,
			indentWithTabs: true,
			smartIndent: true,
			extraKeys: {
				"F9": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function(cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		});
		editAlgoCodeFn1 = CodeMirror.fromTextArea(document.getElementById("editAlgoCodeFn1"), {
			mode: "javascript",
			lineNumbers: true,
			lineWrapping: false,
			indentWithTabs: true,
			smartIndent: true,
			extraKeys: {
				"F9": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function(cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		});
		editAlgoCodeFn2 = CodeMirror.fromTextArea(document.getElementById("editAlgoCodeFn2"), {
			mode: "javascript",
			lineNumbers: true,
			lineWrapping: false,
			indentWithTabs: true,
			smartIndent: true,
			extraKeys: {
				"F9": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function(cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		});
	} else {
		app.scale.setGameSize(1080, 1920);
		app.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		app.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		app.scale.forceOrientation(false, true);
		$("#registerModalT").remove();
		$("#createRoomModal").remove();
		$("creIssueReportModal").remove();
		$("#algoManagerModal").remove();
		$("#algoCheckingModal").remove();
		$("#playingSeqModal").remove();
		$("#fnDesignGuideModal").remove();
		$("#activityReportModal").remove();
	}
	app.scale.pageAlignHorizontally = true;
	app.scale.pageAlignVertically = true;
	app.scale.refresh();
	app.state.start("Preload");
};
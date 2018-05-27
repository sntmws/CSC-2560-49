function PlayingRoom() {
	Phaser.State.call(this);
};
PlayingRoom.prototype.preload = function() {
	if (!app.device.desktop && app.global.userType == 'actor') {
		app.load.crossOrigin = 'anonymous';
		app.load.image('qrCodePic', 'https://chart.apis.google.com/chart?cht=qr&chs=360x360&chl=' + app.global.parameter + '&chld=H|0');
	}else{
		mins = 0, secs = 0;
	}
};
PlayingRoom.prototype.create = function() {
	background2();
	if (app.device.desktop) {
		actorsNumber = app.global.actors.length,
			stdIcon = [],
			stdIconTextTop = [],
			stdIconTextDown = [],
			stdIconPointer = [],
			stdIconPointerBorder = [],
			stdIconHighlighter = [],
			stdIconHighlighterBorder = [],
			stdIconHighlighterText = [];
		timer = app.time.create();
		var stdIconSprite = app.global.stdIconSprite.slice(0, actorsNumber);
		stdIconTextStyle = {
			font: "26px xfont",
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		};
		highlighterTextStyle = {
			font: "32px xfont",
			fill: "#FFFFFF",
			align: "center"
		};
		stdIconW = 86;
		stdIconH = 86;
		focusAlpha = 1;
		pointerAlpha = 0.75;
		blurAlpha = 0.5;
		var title = app.add.text(app.world.centerX, app.world.centerY * 0.125, app.global.algoName, {
			font: "128px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		title.anchor.set(0.5);
		if (app.global.algoType == "search") {
			var desiredPar = app.add.text(48, 80, 'ค้นหาค่าข้อมูล: ' + app.global.targetValue, {
				font: "48px xfont",
				fontWeight: 'bold',
				fill: "#FFFFFF",
				stroke: '#00B0DC',
				strokeThickness: 7,
				align: "center"
			});
		}
		timerText = app.add.text(app.width - 48, 64, '00:00', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		timerText.anchor.set(1, 0);
		timerText.alpha = 0;
		timerText.visibility = false;
		var playingFrame = app.add.sprite(app.world.centerX, app.world.centerY * 0.635, 'myui-10');
		playingFrame.anchor.set(0.5);
		playingFrame.width = app.width * 0.95;
		playingFrame.height = app.height * 0.34;
		playingFrame.alpha = 0.85;
		if (actorsNumber <= 20) {
			var stdIconY = playingFrame.y - 8;
			if (actorsNumber % 2 == 0) {
				for (var i = (actorsNumber / 2) - 1; i >= 0; i--) {
					if (i == (actorsNumber / 2) - 1) {
						var stdIconX = playingFrame.x - 40;
						stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
						stdIconHighlighter[i].width = stdIconW;
						stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighter[i].anchor.set(0.5);
						stdIconHighlighter[i].visible = false;
						stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
						stdIconHighlighterBorder[i].width = stdIconW;
						stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighterBorder[i].anchor.set(0.5);
						stdIconHighlighterBorder[i].visible = false;
						stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
						stdIconHighlighterText[i].anchor.set(0.5);
						stdIconHighlighterText[i].visible = false;
						stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
						stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
						stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
						stdIcon[i].play('idle');
						stdIcon[i].anchor.set(0.5);
						stdIcon[i].width = stdIconW;
						stdIcon[i].height = stdIconH;
						stdIconTextTop[i] = app.add.text(stdIcon[i].x, stdIcon[i].y - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
						stdIconTextTop[i].anchor.set(0.5, 1);
						stdIconTextDown[i] = app.add.text(stdIcon[i].x, stdIcon[i].y + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
						stdIconTextDown[i].anchor.set(0.5, 0);
						stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
						stdIconPointerBorder[i].anchor.set(0.5);
						stdIconPointerBorder[i].visible = false;
						stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
						stdIconPointer[i].anchor.set(0.5);
						stdIconPointer[i].visible = false;
						app.add.tween(stdIconPointer[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						app.add.tween(stdIconPointerBorder[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
					} else {
						var stdIconX = stdIcon[i + 1].x - 90;
						stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
						stdIconHighlighter[i].width = stdIconW;
						stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighter[i].anchor.set(0.5);
						stdIconHighlighter[i].visible = false;
						stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
						stdIconHighlighterBorder[i].width = stdIconW;
						stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighterBorder[i].anchor.set(0.5);
						stdIconHighlighterBorder[i].visible = false;
						stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
						stdIconHighlighterText[i].anchor.set(0.5);
						stdIconHighlighterText[i].visible = false;
						stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
						stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
						stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
						stdIcon[i].play('idle');
						stdIcon[i].anchor.set(0.5);
						stdIcon[i].width = stdIconW;
						stdIcon[i].height = stdIconH;
						stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
						stdIconTextTop[i].anchor.set(0.5, 1);
						stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
						stdIconTextDown[i].anchor.set(0.5, 0);
						stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
						stdIconPointerBorder[i].anchor.set(0.5);
						stdIconPointerBorder[i].visible = false;
						stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
						stdIconPointer[i].anchor.set(0.5);
						stdIconPointer[i].visible = false;
						app.add.tween(stdIconPointer[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						app.add.tween(stdIconPointerBorder[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
					}
				}
				for (var i = (actorsNumber / 2); i <= actorsNumber - 1; i++) {
					var stdIconX = stdIcon[i - 1].x + 90;
					stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
					stdIconHighlighter[i].width = stdIconW;
					stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighter[i].anchor.set(0.5);
					stdIconHighlighter[i].visible = false;
					stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
					stdIconHighlighterBorder[i].width = stdIconW;
					stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighterBorder[i].anchor.set(0.5);
					stdIconHighlighterBorder[i].visible = false;
					stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
					stdIconHighlighterText[i].anchor.set(0.5);
					stdIconHighlighterText[i].visible = false;
					stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
					stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
					stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
					stdIcon[i].play('idle');
					stdIcon[i].anchor.set(0.5);
					stdIcon[i].width = stdIconW;
					stdIcon[i].height = stdIconH;
					stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
					stdIconTextTop[i].anchor.set(0.5, 1);
					stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
					stdIconTextDown[i].anchor.set(0.5, 0);
					stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
					stdIconPointerBorder[i].anchor.set(0.5);
					stdIconPointerBorder[i].visible = false;
					stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
					stdIconPointer[i].anchor.set(0.5);
					stdIconPointer[i].visible = false;
					app.add.tween(stdIconPointer[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					app.add.tween(stdIconPointerBorder[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
				}
			} else {
				for (var i = Math.floor(actorsNumber / 2); i >= 0; i--) {
					if (i == Math.floor(actorsNumber / 2)) {
						var stdIconX = app.world.centerX;
						stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
						stdIconHighlighter[i].width = stdIconW;
						stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighter[i].anchor.set(0.5);
						stdIconHighlighter[i].visible = false;
						stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
						stdIconHighlighterBorder[i].width = stdIconW;
						stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighterBorder[i].anchor.set(0.5);
						stdIconHighlighterBorder[i].visible = false;
						stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
						stdIconHighlighterText[i].anchor.set(0.5);
						stdIconHighlighterText[i].visible = false;
						stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
						stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
						stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
						stdIcon[i].play('idle');
						stdIcon[i].anchor.set(0.5);
						stdIcon[i].width = stdIconW;
						stdIcon[i].height = stdIconH;
						stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
						stdIconTextTop[i].anchor.set(0.5, 1);
						stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
						stdIconTextDown[i].anchor.set(0.5, 0);
						stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
						stdIconPointerBorder[i].anchor.set(0.5);
						stdIconPointerBorder[i].visible = false;
						stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
						stdIconPointer[i].anchor.set(0.5);
						stdIconPointer[i].visible = false;
						app.add.tween(stdIconPointer[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						app.add.tween(stdIconPointerBorder[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
					} else {
						var stdIconX = stdIcon[i + 1].x - 90;
						stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
						stdIconHighlighter[i].width = stdIconW;
						stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighter[i].anchor.set(0.5);
						stdIconHighlighter[i].visible = false;
						stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
						stdIconHighlighterBorder[i].width = stdIconW;
						stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
						stdIconHighlighterBorder[i].anchor.set(0.5);
						stdIconHighlighterBorder[i].visible = false;
						stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
						stdIconHighlighterText[i].anchor.set(0.5);
						stdIconHighlighterText[i].visible = false;
						stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
						stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
						stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
						stdIcon[i].play('idle');
						stdIcon[i].anchor.set(0.5);
						stdIcon[i].width = stdIconW;
						stdIcon[i].height = stdIconH;
						stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
						stdIconTextTop[i].anchor.set(0.5, 1);
						stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
						stdIconTextDown[i].anchor.set(0.5, 0);
						stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
						stdIconPointerBorder[i].anchor.set(0.5);
						stdIconPointerBorder[i].visible = false;
						stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
						stdIconPointer[i].anchor.set(0.5);
						stdIconPointer[i].visible = false;
						app.add.tween(stdIconPointer[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						app.add.tween(stdIconPointerBorder[i].scale).to({
							x: 0.5,
							y: 0.5
						}, 250, 'Sine').to({
							x: 1,
							y: 1
						}, 250, 'Sine', true).loop(true);
						tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
					}
				}
				for (var i = Math.ceil(actorsNumber / 2); i <= actorsNumber - 1; i++) {
					var stdIconX = stdIcon[i - 1].x + 90;
					stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
					stdIconHighlighter[i].width = stdIconW;
					stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighter[i].anchor.set(0.5);
					stdIconHighlighter[i].visible = false;
					stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
					stdIconHighlighterBorder[i].width = stdIconW;
					stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighterBorder[i].anchor.set(0.5);
					stdIconHighlighterBorder[i].visible = false;
					stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
					stdIconHighlighterText[i].anchor.set(0.5);
					stdIconHighlighterText[i].visible = false;
					stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
					stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
					stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
					stdIcon[i].play('idle');
					stdIcon[i].anchor.set(0.5);
					stdIcon[i].width = stdIconW;
					stdIcon[i].height = stdIconH;
					stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
					stdIconTextTop[i].anchor.set(0.5, 1);
					stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
					stdIconTextDown[i].anchor.set(0.5, 0);
					stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
					stdIconPointerBorder[i].anchor.set(0.5);
					stdIconPointerBorder[i].visible = false;
					stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
					stdIconPointer[i].anchor.set(0.5);
					stdIconPointer[i].visible = false;
					app.add.tween(stdIconPointer[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					app.add.tween(stdIconPointerBorder[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
				}
			}
		} else {
			var playingFrameLine = app.add.sprite(playingFrame.x, playingFrame.y, 'myui-1');
			playingFrameLine.width = playingFrame.width * 0.975;
			playingFrameLine.anchor.set(0.5);
			playingFrameLine.alpha = 0.5;
			var firstRowStds = 20;
			var stdIconY = (playingFrame.y * 0.785) - 16;
			for (var i = (firstRowStds / 2) - 1; i >= 0; i--) {
				if (i == (firstRowStds / 2) - 1) {
					var stdIconX = playingFrame.x - 40;
					stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
					stdIconHighlighter[i].width = stdIconW;
					stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighter[i].anchor.set(0.5);
					stdIconHighlighter[i].visible = false;
					stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
					stdIconHighlighterBorder[i].width = stdIconW;
					stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighterBorder[i].anchor.set(0.5);
					stdIconHighlighterBorder[i].visible = false;
					stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
					stdIconHighlighterText[i].anchor.set(0.5);
					stdIconHighlighterText[i].visible = false;
					stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
					stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
					stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
					stdIcon[i].play('idle');
					stdIcon[i].anchor.set(0.5);
					stdIcon[i].width = stdIconW;
					stdIcon[i].height = stdIconH;
					stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
					stdIconTextTop[i].anchor.set(0.5, 1);
					stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
					stdIconTextDown[i].anchor.set(0.5, 0);
					stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
					stdIconPointerBorder[i].anchor.set(0.5);
					stdIconPointerBorder[i].visible = false;
					stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
					stdIconPointer[i].anchor.set(0.5);
					stdIconPointer[i].visible = false;
					app.add.tween(stdIconPointer[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					app.add.tween(stdIconPointerBorder[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
				} else {
					var stdIconX = stdIcon[i + 1].x - 90;
					stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
					stdIconHighlighter[i].width = stdIconW;
					stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighter[i].anchor.set(0.5);
					stdIconHighlighter[i].visible = false;
					stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
					stdIconHighlighterBorder[i].width = stdIconW;
					stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
					stdIconHighlighterBorder[i].anchor.set(0.5);
					stdIconHighlighterBorder[i].visible = false;
					stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
					stdIconHighlighterText[i].anchor.set(0.5);
					stdIconHighlighterText[i].visible = false;
					stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
					stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
					stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
					stdIcon[i].play('idle');
					stdIcon[i].anchor.set(0.5);
					stdIcon[i].width = stdIconW;
					stdIcon[i].height = stdIconH;
					stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
					stdIconTextTop[i].anchor.set(0.5, 1);
					stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
					stdIconTextDown[i].anchor.set(0.5, 0);
					stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
					stdIconPointerBorder[i].anchor.set(0.5);
					stdIconPointerBorder[i].visible = false;
					stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
					stdIconPointer[i].anchor.set(0.5);
					stdIconPointer[i].visible = false;
					app.add.tween(stdIconPointer[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					app.add.tween(stdIconPointerBorder[i].scale).to({
						x: 0.5,
						y: 0.5
					}, 250, 'Sine').to({
						x: 1,
						y: 1
					}, 250, 'Sine', true).loop(true);
					tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
				}
			}
			for (var i = (firstRowStds / 2); i <= firstRowStds - 1; i++) {
				var stdIconX = stdIcon[i - 1].x + 90;
				stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
				stdIconHighlighter[i].width = stdIconW;
				stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
				stdIconHighlighter[i].anchor.set(0.5);
				stdIconHighlighter[i].visible = false;
				stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
				stdIconHighlighterBorder[i].width = stdIconW;
				stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
				stdIconHighlighterBorder[i].anchor.set(0.5);
				stdIconHighlighterBorder[i].visible = false;
				stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
				stdIconHighlighterText[i].anchor.set(0.5);
				stdIconHighlighterText[i].visible = false;
				stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
				stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
				stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
				stdIcon[i].play('idle');
				stdIcon[i].anchor.set(0.5);
				stdIcon[i].width = stdIconW;
				stdIcon[i].height = stdIconH;
				stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
				stdIconTextTop[i].anchor.set(0.5, 1);
				stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
				stdIconTextDown[i].anchor.set(0.5, 0);
				stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
				stdIconPointerBorder[i].anchor.set(0.5);
				stdIconPointerBorder[i].visible = false;
				stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
				stdIconPointer[i].anchor.set(0.5);
				stdIconPointer[i].visible = false;
				app.add.tween(stdIconPointer[i].scale).to({
					x: 0.5,
					y: 0.5
				}, 250, 'Sine').to({
					x: 1,
					y: 1
				}, 250, 'Sine', true).loop(true);
				app.add.tween(stdIconPointerBorder[i].scale).to({
					x: 0.5,
					y: 0.5
				}, 250, 'Sine').to({
					x: 1,
					y: 1
				}, 250, 'Sine', true).loop(true);
				tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
			}
			for (var i = 20; i < actorsNumber; i++) {
				var stdIconX = stdIcon[i - 20].x;
				stdIconY = playingFrame.y * 1.265;
				stdIconHighlighter[i] = app.add.sprite(stdIconX, stdIconY, 'highlighter');
				stdIconHighlighter[i].width = stdIconW;
				stdIconHighlighter[i].height = (playingFrame.height / 2) - 16;
				stdIconHighlighter[i].anchor.set(0.5);
				stdIconHighlighter[i].visible = false;
				stdIconHighlighterBorder[i] = app.add.sprite(stdIconX, stdIconY, 'highlighterBorder');
				stdIconHighlighterBorder[i].width = stdIconW;
				stdIconHighlighterBorder[i].height = (playingFrame.height / 2) - 16;
				stdIconHighlighterBorder[i].anchor.set(0.5);
				stdIconHighlighterBorder[i].visible = false;
				stdIconHighlighterText[i] = app.add.text(stdIconX, 0, '', highlighterTextStyle);
				stdIconHighlighterText[i].anchor.set(0.5);
				stdIconHighlighterText[i].visible = false;
				stdIcon[i] = app.add.sprite(stdIconX, stdIconY, 'char-' + stdIconSprite[i]);
				stdIcon[i].animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
				stdIcon[i].animations.add('yep', [15, 16, 17], 6, true);
				stdIcon[i].play('idle');
				stdIcon[i].anchor.set(0.5);
				stdIcon[i].width = stdIconW;
				stdIcon[i].height = stdIconH;
				stdIconTextTop[i] = app.add.text(stdIconX, stdIconY - (stdIcon[i].height / 2), (i + 1), stdIconTextStyle);
				stdIconTextTop[i].anchor.set(0.5, 1);
				stdIconTextDown[i] = app.add.text(stdIconX, stdIconY + (stdIcon[i].height / 2), app.global.actors[i], stdIconTextStyle);
				stdIconTextDown[i].anchor.set(0.5, 0);
				stdIconPointerBorder[i] = app.add.sprite(stdIconX, stdIconY, 'pointerBorder');
				stdIconPointerBorder[i].anchor.set(0.5);
				stdIconPointerBorder[i].visible = false;
				stdIconPointer[i] = app.add.sprite(stdIconX, stdIconY, 'pointer');
				stdIconPointer[i].anchor.set(0.5);
				stdIconPointer[i].visible = false;
				app.add.tween(stdIconPointer[i].scale).to({
					x: 0.5,
					y: 0.5
				}, 250, 'Sine').to({
					x: 1,
					y: 1
				}, 250, 'Sine', true).loop(true);
				app.add.tween(stdIconPointerBorder[i].scale).to({
					x: 0.5,
					y: 0.5
				}, 250, 'Sine').to({
					x: 1,
					y: 1
				}, 250, 'Sine', true).loop(true);
				tweenTint(stdIconPointerBorder[i], 0xFFFFFF, 0x00B0DC, 93.75, 0);
			}
		}
		var stdIconOpt = app.add.sprite(app.world.centerX, app.world.centerY * 1.2, 'robot-tilesheet');
		stdIconOpt.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
		stdIconOpt.animations.add('run', [10, 11, 12, 13, 14, 15, 16, 17], 12, true);
		stdIconOpt.play('idle');
		stdIconOpt.anchor.set(0.5);
		stdIconOpt.scale.setTo(0.23);
		var stdIconOptTextTop = app.add.text(stdIconOpt.x, stdIconOpt.y - (stdIconOpt.height / 2) + 8, 'ผู้ดำเนินการ', stdIconTextStyle);
		stdIconOptTextTop.anchor.set(0.5, 1);
		var stdIconOptTextDown = app.add.text(stdIconOpt.x, stdIconOpt.y + (stdIconOpt.height / 2) - 8, app.global.operator[0], stdIconTextStyle);
		stdIconOptTextDown.anchor.set(0.5, 0);
		var playButton = app.add.sprite(app.width - 96, title.y + 16, 'bt-13');
		playButton.anchor.set(0.5);
		playButton.inputEnabled = true;
		playButton.events.onInputOver.add(function() {
			playButton.loadTexture('bt-14', 0, false);
			playButtonText.stroke = '#6DC300';
		}, this);
		playButton.events.onInputOut.add(function() {
			playButton.loadTexture('bt-13', 0, false);
			playButtonText.stroke = '#00B0DC';
		}, this);
		playButton.events.onInputDown.add(function() {
			playButton.loadTexture('bt-13', 0, false);
			playButton.inputEnabled = false;
			playButton.alpha = 0;
			playButton.visibility = false;
			playButtonText.stroke = '#00B0DC';
			playButtonText.inputEnabled = false;
			playButtonText.alpha = 0;
			playButtonText.visibility = false;
			socket.emit('play', app.global.roomId);
			timerText.alpha = 1;
			timerText.visibility = true;
			timer.start();
			setGuideText();
		}, this);
		var playButtonText = app.add.text(playButton.x, playButton.y - 8, 'เริ่ม', {
			font: "64px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		playButtonText.anchor.set(0.5);
		playButtonText.inputEnabled = true;
		playButtonText.events.onInputOver.add(function() {
			playButton.loadTexture('bt-14', 0, false);
			playButtonText.stroke = '#6DC300';
		}, this);
		playButtonText.events.onInputOut.add(function() {
			playButton.loadTexture('bt-13', 0, false);
			playButtonText.stroke = '#00B0DC';
		}, this);
		playButtonText.events.onInputDown.add(function() {
			playButton.loadTexture('bt-13', 0, false);
			playButton.inputEnabled = false;
			playButton.alpha = 0;
			playButton.visibility = false;
			playButtonText.stroke = '#00B0DC';
			playButtonText.inputEnabled = false;
			playButtonText.alpha = 0;
			playButtonText.visibility = false;
			socket.emit('play', app.global.roomId);
			timerText.alpha = 1;
			timerText.visibility = true;
			timer.start();
			setGuideText();
		}, this);
		playButton.width = playButtonText.width * 1.125;
		playButton.height = playButtonText.height * 1.125;
		var playingRoomGuideFrame = app.add.sprite(48, app.height - 32, 'myui-2');
		playingRoomGuideFrame.anchor.set(0, 1);
		playingRoomGuideFrame.width = app.width * 0.55;
		playingRoomGuideFrame.height = app.height * 0.275;
		playingRoomGuideFrame.alpha = 0.85;
		playingRoomGuideFrameText = app.add.text(playingRoomGuideFrame.x + (playingRoomGuideFrame.width / 2), playingRoomGuideFrame.y - (playingRoomGuideFrame.height * 0.875), 'วิธีปฏิบัติก่อนเริ่ม:', {
			font: "48px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		playingRoomGuideFrameText.anchor.set(0.5);
		guideText1 = app.add.text(playingRoomGuideFrame.x + 16, playingRoomGuideFrameText.y + (playingRoomGuideFrameText.height / 2) + 8, app.global.algoGuideBe, {
			font: "40px xfont",
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "left"
		});
		guideText2 = app.add.text(playingRoomGuideFrame.x + (playingRoomGuideFrame.width / 2), playingRoomGuideFrame.y - (playingRoomGuideFrame.height / 2), '', {
			font: "80px xfont",
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		guideText2.anchor.set(0.5);
		var playingRoomAlgorithmFrame = app.add.sprite(app.width - 48, app.height - 32, 'myui-3');
		playingRoomAlgorithmFrame.anchor.set(1);
		playingRoomAlgorithmFrame.width = app.width * 0.375;
		playingRoomAlgorithmFrame.height = app.height * 0.275;
		playingRoomAlgorithmFrame.alpha = 0.85;
		playingRoomAlgorithmFrameText = app.add.text(playingRoomAlgorithmFrame.x - (playingRoomAlgorithmFrame.width / 2), playingRoomAlgorithmFrame.y - (playingRoomAlgorithmFrame.height * 0.875), 'อัลกอริทึม (Algorithm):', {
			font: "48px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		playingRoomAlgorithmFrameText.anchor.set(0.5);
		algorithmText = app.add.text(playingRoomAlgorithmFrame.x - playingRoomAlgorithmFrame.width + 16, playingRoomAlgorithmFrameText.y + (playingRoomAlgorithmFrameText.height / 2) + 8, app.global.algoText, {
			font: "28px xfont",
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "left"
		});
		algorithmText.lineSpacing = -20;
		socket.on('standbyTeacher', function(details) {
			if (details.roomId == app.global.roomId) {
				for (i = 0; i < actorsNumber; i++) {
					stdIcon[i].play('idle');
					stdIcon[i].alpha = blurAlpha;
					stdIconTextTop[i].alpha = blurAlpha;
					stdIconTextDown[i].alpha = blurAlpha;
					stdIconPointer[i].visible = false;
					stdIconPointerBorder[i].visible = false;
				}
				stdIconOpt.animations.play('idle');
				if (details.playingStatus == "highlighting") {
					if (details.color == "0x000000") {
						stdIconHighlighter[details.index].visible = false;
						stdIconHighlighterBorder[details.index].visible = false;
						stdIconHighlighterText[details.index].visible = false;
					} else {
						stdIconHighlighter[details.index].tint = details.color;
						if (details.index <= 20) stdIconHighlighterText[details.index].y = stdIconHighlighter[details.index].y - stdIconH - 20;
						else if (details.index > 20) stdIconHighlighterText[details.index].y = stdIconHighlighter[details.index].y + stdIconH + 20;
						stdIconHighlighterText[details.index].setText(details.text);
						stdIconHighlighterText[details.index].tint = details.color;
						stdIconHighlighter[details.index].visible = true;
						stdIconHighlighterBorder[details.index].visible = true;
						stdIconHighlighterText[details.index].visible = true;
					}
					socket.emit('play', app.global.roomId);
				} else if (details.playingStatus == "scanning") {
					stdIcon[details.index].alpha = pointerAlpha;
					stdIconTextTop[details.index].alpha = pointerAlpha;
					stdIconTextDown[details.index].alpha = pointerAlpha;
					stdIcon[details.index].play('yep');
					stdIconPointer[details.index].visible = true;
					stdIconPointerBorder[details.index].visible = true;
					if (stdIcon[details.index].x < stdIconOpt.x) {
						app.add.tween(stdIconOpt.scale).to({
							x: Math.abs(stdIconOpt.scale.x)
						}, 1, Phaser.Easing.Bounce.Out, true).onComplete.add(function() {
							stdIconOpt.animations.play('run');
							app.add.tween(stdIconOptTextTop).to({
								x: stdIcon[details.index].x
							}, (stdIconOpt.x - stdIcon[details.index].x), Phaser.Easing.Linear.None, true);
							app.add.tween(stdIconOptTextDown).to({
								x: stdIcon[details.index].x
							}, (stdIconOpt.x - stdIcon[details.index].x), Phaser.Easing.Linear.None, true);
							app.add.tween(stdIconOpt).to({
								x: stdIcon[details.index].x
							}, (stdIconOpt.x - stdIcon[details.index].x), Phaser.Easing.Linear.None, true).onComplete.add(function() {
								stdIconOpt.animations.play('idle');
							}, this);
						}, this);
					} else if (stdIcon[details.index].x > stdIconOpt.x) {
						app.add.tween(stdIconOpt.scale).to({
							x: -Math.abs(stdIconOpt.scale.x)
						}, 1, Phaser.Easing.Bounce.Out, true).onComplete.add(function() {
							stdIconOpt.animations.play('run');
							app.add.tween(stdIconOptTextTop).to({
								x: stdIcon[details.index].x
							}, (stdIcon[details.index].x - stdIconOpt.x), Phaser.Easing.Linear.None, true);
							app.add.tween(stdIconOptTextDown).to({
								x: stdIcon[details.index].x
							}, (stdIcon[details.index].x - stdIconOpt.x), Phaser.Easing.Linear.None, true);
							app.add.tween(stdIconOpt).to({
								x: stdIcon[details.index].x
							}, (stdIcon[details.index].x - stdIconOpt.x), Phaser.Easing.Linear.None, true).onComplete.add(function() {
								stdIconOpt.animations.play('idle');
							}, this);
						}, this);
					}
				} else if (details.playingStatus == "scanned") {
					playingRoomGuideFrameText.setText('ค่าข้อมูลล่าสุดที่ถูกสแกน:');
					guideText1.setText('');
					guideText2.setText(details.value);
				} else if (details.playingStatus == "comparing") {
					stdIcon[details.indexA].alpha = focusAlpha;
					stdIconTextTop[details.indexA].alpha = focusAlpha;
					stdIconTextDown[details.indexA].alpha = focusAlpha;
					stdIcon[details.indexB].alpha = focusAlpha;
					stdIconTextTop[details.indexB].alpha = focusAlpha;
					stdIconTextDown[details.indexB].alpha = focusAlpha;
					stdIcon[details.indexA].play('yep');
					stdIcon[details.indexB].play('yep');
					if (details.symbol == "<") var symbol = ' น้อยกว่า ';
					else if (details.symbol == ">") var symbol = ' มากกว่า ';
					playingRoomGuideFrameText.setText('เปรียบเทียบค่าข้อมูล:');
					guideText1.setText('');
					guideText2.setText(app.global.swappedParametersArr[details.indexA] + symbol + app.global.swappedParametersArr[details.indexB] + ' ใช่หรือไม่ ?');
				} else if (details.playingStatus == "swapping") {
					var tempHighlighterXA = stdIconHighlighter[details.indexA].x;
					var tempHighlighterXB = stdIconHighlighter[details.indexB].x;
					var tempHighlighterYA = stdIconHighlighter[details.indexA].y;
					var tempHighlighterYB = stdIconHighlighter[details.indexB].y;
					var tempHighlighterBorderXA = stdIconHighlighterBorder[details.indexA].x;
					var tempHighlighterBorderXB = stdIconHighlighterBorder[details.indexB].x;
					var tempHighlighterBorderYA = stdIconHighlighterBorder[details.indexA].y;
					var tempHighlighterBorderYB = stdIconHighlighterBorder[details.indexB].y;
					var tempHighlighterTextXA = stdIconHighlighterText[details.indexA].x;
					var tempHighlighterTextXB = stdIconHighlighterText[details.indexB].x;
					var tempHighlighterTextYA = stdIconHighlighterText[details.indexA].y;
					var tempHighlighterTextYB = stdIconHighlighterText[details.indexB].y;
					var tempXA = stdIcon[details.indexA].x;
					var tempXB = stdIcon[details.indexB].x;
					var tempYA = stdIcon[details.indexA].y;
					var tempYB = stdIcon[details.indexB].y;
					var tempTextTopXA = stdIconTextTop[details.indexA].x;
					var tempTextTopXB = stdIconTextTop[details.indexB].x;
					var tempTextTopYA = stdIconTextTop[details.indexA].y;
					var tempTextTopYB = stdIconTextTop[details.indexB].y;
					var tempTextDownXA = stdIconTextDown[details.indexA].x;
					var tempTextDownXB = stdIconTextDown[details.indexB].x;
					var tempTextDownYA = stdIconTextDown[details.indexA].y;
					var tempTextDownYB = stdIconTextDown[details.indexB].y;
					var tempPointerXA = stdIconPointer[details.indexA].x;
					var tempPointerBorderXA = stdIconPointerBorder[details.indexA].x;
					var tempPointerXB = stdIconPointer[details.indexB].x;
					var tempPointerBorderXB = stdIconPointerBorder[details.indexB].x;
					var tempPointerYA = stdIconPointer[details.indexA].y;
					var tempPointerBorderYA = stdIconPointerBorder[details.indexA].y;
					var tempPointerYB = stdIconPointer[details.indexB].y;
					var tempPointerBorderYB = stdIconPointerBorder[details.indexB].y;
					var distanceX = (stdIcon[details.indexB].x - stdIcon[details.indexA].x) / 2;
					var distanceY = (stdIcon[details.indexB].y - stdIcon[details.indexA].y) / 2;
					stdIcon[details.indexA].alpha = focusAlpha;
					stdIconTextTop[details.indexA].alpha = 0.1;
					stdIconTextDown[details.indexA].alpha = 0.1;
					stdIcon[details.indexB].alpha = focusAlpha;
					stdIconTextTop[details.indexB].alpha = 0.1;
					stdIconTextDown[details.indexB].alpha = 0.1;
					stdIconTextTop[details.indexA].setText(details.indexB + 1);
					stdIconTextTop[details.indexB].setText(details.indexA + 1);
					var stdIconHighlighterAVisibleTmp = stdIconHighlighter[details.indexA].visible;
					var stdIconHighlighterBVisibleTmp = stdIconHighlighter[details.indexB].visible;
					stdIconHighlighter[details.indexA].visible = false;
					stdIconHighlighterBorder[details.indexA].visible = false;
					stdIconHighlighterText[details.indexA].visible = false;
					stdIconHighlighter[details.indexB].visible = false;
					stdIconHighlighterBorder[details.indexB].visible = false;
					stdIconHighlighterText[details.indexB].visible = false;
					playingRoomGuideFrameText.setText('สลับค่าข้อมูล:');
					guideText1.setText('');
					guideText2.setText(app.global.swappedParametersArr[details.indexB] + ' และ ' + app.global.swappedParametersArr[details.indexA]);
					if (tempYA == tempYB) {
						app.add.tween(stdIcon[details.indexA]).to({
							x: tempXA + distanceX,
							y: tempYA + (stdIcon[details.indexB].height * 0.75)
						}, Phaser.Timer.SECOND * 0.5, 'Sine').to({
							x: tempXB,
							y: tempYB
						}, Phaser.Timer.SECOND * 0.5, 'Sine', true);
						app.add.tween(stdIcon[details.indexB]).to({
							x: tempXB - distanceX,
							y: tempYB - (stdIcon[details.indexA].height * 0.75)
						}, Phaser.Timer.SECOND * 0.5, 'Sine').to({
							x: tempXA,
							y: tempYA
						}, Phaser.Timer.SECOND * 0.5, 'Sine', true);
					} else if (tempYA != tempYB && tempXA == tempXB) {
						app.add.tween(stdIcon[details.indexA]).to({
							x: tempXA - (stdIcon[details.indexB].height * 0.75),
							y: tempYA + distanceY
						}, Phaser.Timer.SECOND * 0.5, 'Sine').to({
							x: tempXB,
							y: tempYB
						}, Phaser.Timer.SECOND * 0.5, 'Sine', true);
						app.add.tween(stdIcon[details.indexB]).to({
							x: tempXB + (stdIcon[details.indexA].height * 0.75),
							y: tempYB - distanceY
						}, Phaser.Timer.SECOND * 0.5, 'Sine').to({
							x: tempXA,
							y: tempYA
						}, Phaser.Timer.SECOND * 0.5, 'Sine', true);
					} else if (tempYA != tempYB && tempXA != tempXB) {
						app.add.tween(stdIcon[details.indexA]).to({
							x: tempXB,
							y: tempYB
						}, Phaser.Timer.SECOND * 2, 'Linear', true);
						app.add.tween(stdIcon[details.indexB]).to({
							x: tempXA,
							y: tempYA
						}, Phaser.Timer.SECOND * 2, 'Linear', true);
					}
					app.add.tween(stdIconTextTop[details.indexA]).to({
						x: tempTextTopXB
					}, 1, 'Linear').to({
						alpha: focusAlpha
					}, Phaser.Timer.SECOND * 1.5, 'Linear', true);
					app.add.tween(stdIconTextTop[details.indexB]).to({
						x: tempTextTopXA
					}, 1, 'Linear').to({
						alpha: focusAlpha
					}, Phaser.Timer.SECOND * 1.5, 'Linear', true);
					app.add.tween(stdIconTextDown[details.indexA]).to({
						x: tempTextDownXB
					}, 1, 'Linear').to({
						alpha: focusAlpha
					}, Phaser.Timer.SECOND * 1.5, 'Linear', true);
					app.add.tween(stdIconTextDown[details.indexB]).to({
						x: tempTextDownXA
					}, 1, 'Linear').to({
						alpha: focusAlpha
					}, Phaser.Timer.SECOND * 1.5, 'Linear', true).onComplete.add(function() {
						stdIconHighlighter[details.indexA].x = tempHighlighterXB;
						stdIconHighlighter[details.indexB].x = tempHighlighterXA;
						stdIconHighlighter[details.indexA].y = tempHighlighterYB;
						stdIconHighlighter[details.indexB].y = tempHighlighterYA;
						stdIconHighlighterBorder[details.indexA].x = tempHighlighterBorderXB;
						stdIconHighlighterBorder[details.indexB].x = tempHighlighterBorderXA;
						stdIconHighlighterBorder[details.indexA].y = tempHighlighterBorderYB;
						stdIconHighlighterBorder[details.indexB].y = tempHighlighterBorderYA;
						stdIconHighlighterText[details.indexA].x = tempHighlighterTextXB;
						stdIconHighlighterText[details.indexB].x = tempHighlighterTextXA;
						stdIconHighlighterText[details.indexA].y = tempHighlighterTextYB;
						stdIconHighlighterText[details.indexB].y = tempHighlighterTextYA;
						stdIconPointer[details.indexA].x = tempPointerXB;
						stdIconPointerBorder[details.indexA].x = tempPointerBorderXB;
						stdIconPointer[details.indexB].x = tempPointerXA;
						stdIconPointerBorder[details.indexB].x = tempPointerBorderXA;
						stdIconPointer[details.indexA].y = tempPointerYB;
						stdIconPointerBorder[details.indexA].y = tempPointerBorderYB;
						stdIconPointer[details.indexB].y = tempPointerYA;
						stdIconPointerBorder[details.indexB].y = tempPointerBorderYA;
						stdIconHighlighter[details.indexA].visible = stdIconHighlighterAVisibleTmp;
						stdIconHighlighterBorder[details.indexA].visible = stdIconHighlighterAVisibleTmp;
						stdIconHighlighterText[details.indexA].visible = stdIconHighlighterAVisibleTmp;
						stdIconHighlighter[details.indexB].visible = stdIconHighlighterBVisibleTmp;
						stdIconHighlighterBorder[details.indexB].visible = stdIconHighlighterBVisibleTmp;
						stdIconHighlighterText[details.indexB].visible = stdIconHighlighterBVisibleTmp;
						var stdIconHighlighterTmp = stdIconHighlighter[details.indexA];
						stdIconHighlighter[details.indexA] = stdIconHighlighter[details.indexB];
						stdIconHighlighter[details.indexB] = stdIconHighlighterTmp;
						var stdIconHighlighterBorderTmp = stdIconHighlighterBorder[details.indexA];
						stdIconHighlighterBorder[details.indexA] = stdIconHighlighterBorder[details.indexB];
						stdIconHighlighterBorder[details.indexB] = stdIconHighlighterBorderTmp;
						var stdIconHighlighterTextTmp = stdIconHighlighterText[details.indexA];
						stdIconHighlighterText[details.indexA] = stdIconHighlighterText[details.indexB];
						stdIconHighlighterText[details.indexB] = stdIconHighlighterTextTmp;
						var stdIconTmp = stdIcon[details.indexA];
						stdIcon[details.indexA] = stdIcon[details.indexB];
						stdIcon[details.indexB] = stdIconTmp;
						var stdIconTextTopTmp = stdIconTextTop[details.indexA];
						stdIconTextTop[details.indexA] = stdIconTextTop[details.indexB];
						stdIconTextTop[details.indexB] = stdIconTextTopTmp;
						var stdIconTextDownTmp = stdIconTextDown[details.indexA];
						stdIconTextDown[details.indexA] = stdIconTextDown[details.indexB];
						stdIconTextDown[details.indexB] = stdIconTextDownTmp;
						var stdIconPointerTmp = stdIconPointer[details.indexA];
						stdIconPointer[details.indexA] = stdIconPointer[details.indexB];
						stdIconPointer[details.indexB] = stdIconPointerTmp;
						var stdIconPointerBorderTmp = stdIconPointerBorder[details.indexA];
						stdIconPointerBorder[details.indexA] = stdIconPointerBorder[details.indexB];
						stdIconPointerBorder[details.indexB] = stdIconPointerBorderTmp;
						app.global.swappedParametersArr = details.swappedParametersArr;
						playingRoomGuideFrameText.setText('รอดำเนินการ:');
						guideText2.setText('');
						socket.emit('play', app.global.roomId);
					}, this);
				} else if (details.playingStatus == "searching") {
					stdIcon[details.index].alpha = focusAlpha;
					stdIconTextTop[details.index].alpha = focusAlpha;
					stdIconTextDown[details.index].alpha = focusAlpha;
					stdIcon[details.index].play('yep');
					playingRoomGuideFrameText.setText('เปรียบเทียบค่าข้อมูล:');
					guideText1.setText('');
					guideText2.setText(app.global.swappedParametersArr[details.index] + ' ใช่ค่าข้อมูลที่ค้นหาหรือไม่ ?');
				}
			}
		});
	} else if (app.global.userType == 'operator') {
		var stdIconOpt = app.add.sprite(app.world.centerX, app.world.centerY * 1.265, 'robot-tilesheet');
		stdIconOpt.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
		stdIconOpt.animations.add('run', [10, 11, 12, 13, 14, 15, 16, 17], 12, true);
		stdIconOpt.play('idle');
		stdIconOpt.anchor.set(0.5);
		stdIconOpt.scale.setTo(0.65);
		var stdIconOptTextTop = app.add.text(stdIconOpt.x, stdIconOpt.y - (stdIconOpt.height / 2) + 8, 'ผู้ดำเนินการ', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		stdIconOptTextTop.anchor.set(0.5, 1);
		var stdIconOptTextDown = app.add.text(stdIconOpt.x, stdIconOpt.y + (stdIconOpt.height / 2) - 8, app.global.username, {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		stdIconOptTextDown.anchor.set(0.5, 0);
		var actionText = app.add.text(app.world.centerX * 0.1875, app.world.centerY * 1.65, 'การกระทำ: ยืนหน้าชั้นเรียน', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		actionText.anchor.set(0, 0.5);
		points = app.add.text(app.world.centerX * 0.1875, app.world.centerY * 1.75, 'ตอบถูก: 0/0', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		points.anchor.set(0, 0.5);
		socket.on('standbyOperator', function(details) {
			if (details.roomId == app.global.roomId && app.global.userType == 'operator') {
				actionText.setText('การกระทำ: รอคำสั่ง');
				if (details.playingStatus == "scanning") {
					scanningMsgBox('โปรดสแกน QR Code\nผู้แสดงลำดับที่ ' + parseInt(Number(details.index) + 1, 10), 'QRCodeScanner');
				} else if (details.playingStatus == "searching") {
					console.log('Value Found: ' + details.valueFound);
					comparingMsgBox(app.global.swappedParametersArr[Number(details.index)] + ' ใช่ค่าข้อมูลที่ค้นหาหรือไม่ ?', details.valueFound);
				} else if (details.playingStatus == "comparing") {
					if (details.symbol == "<") var symbol = ' น้อยกว่า ';
					else if (details.symbol == ">") var symbol = ' มากกว่า ';
					console.log('Comparing Result: ' + details.comparingResult);
					comparingMsgBox(app.global.swappedParametersArr[Number(details.indexA)] + symbol + app.global.swappedParametersArr[Number(details.indexB)] + '\nใช่หรือไม่ ?', details.comparingResult);
				} else if (details.playingStatus == "swapping") {
					app.global.swappedParametersArr = details.swappedParametersArr;
				}
			}
		});
	} else if (app.global.userType == 'actor') {
		var standingOrderFrame = app.add.sprite(app.world.centerX, app.world.centerY * 0.55, 'myui-6');
		standingOrderFrame.anchor.set(0.5);
		standingOrderFrame.width = app.width * 0.8;
		standingOrderFrame.height = standingOrderFrame.width;
		standingOrderFrame.alpha = 0.85;
		var posText = app.add.text(app.world.centerX * 0.22, app.world.centerY * 0.1, 'ลำดับการยืน: ', {
			font: "80px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		var posNum = app.add.text(standingOrderFrame.x, standingOrderFrame.y, app.global.index + 1, {
			font: standingOrderFrame.width + 144 + "px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		posNum.anchor.set(0.5);
		var stdIcon = app.add.sprite(app.world.centerX, app.world.centerY * 1.3, 'char-' + app.global.stdIconSprite[app.global.index]);
		stdIcon.animations.add('idle', [0, 1, 2], app.rnd.integerInRange(4, 6), true);
		stdIcon.animations.add('yep', [15, 16, 17], 6, true);
		stdIcon.anchor.set(0.5);
		stdIcon.width = app.width * 0.25;
		stdIcon.height = stdIcon.width;
		stdIcon.play('idle');
		var stdIconTextTop = app.add.text(stdIcon.x, stdIcon.y - (stdIcon.height / 2), 'ผู้แสดง', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		stdIconTextTop.anchor.set(0.5, 1);
		var stdIconTextDown = app.add.text(stdIcon.x, stdIcon.y + (stdIcon.height / 2), app.global.username, {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		stdIconTextDown.anchor.set(0.5, 0);
		var actionText = app.add.text(app.world.centerX * 0.1875, app.world.centerY * 1.65, 'การกระทำ: ยืนหน้าชั้นเรียน', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		actionText.anchor.set(0, 0.5);
		var paraText = app.add.text(app.world.centerX * 0.1875, app.world.centerY * 1.75, 'ค่าข้อมูล: ยังไม่ทราบ', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		paraText.anchor.set(0, 0.5);
		var qrCodeBg = app.add.sprite(standingOrderFrame.x, standingOrderFrame.y, 'qrCodeBg');
		qrCodeBg.anchor.set(0.5);
		qrCodeBg.width = standingOrderFrame.width;
		qrCodeBg.height = qrCodeBg.width;
		qrCodeBg.visible = false;
		socket.on('standbyActors', function(details) {
			if (details.roomId == app.global.roomId && app.global.userType == 'actor') {
				stdIcon.play('idle');
				if (typeof qrCodeSprite !== 'undefined') {
					qrCodeBg.visible = false;
					qrCodeSprite.visible = false;
				}
				if (details.playingStatus == "scanning") {
					if (details.index == app.global.index) {
						app.cache.getImage("qrCodePic");
						qrCodeSprite = app.add.sprite(standingOrderFrame.x, standingOrderFrame.y, 'qrCodePic');
						qrCodeSprite.anchor.set(0.5);
						qrCodeSprite.width = standingOrderFrame.width - 32;
						qrCodeSprite.height = qrCodeSprite.width;
						qrCodeBg.visible = true;
						qrCodeSprite.visible = true;
						stdIcon.play('yep');
						actionText.setText('การกระทำ: แสดง QR Code');
						app.global.scanned = true;
					} else {
						if (app.global.scanned) {
							paraText.setText('ค่าข้อมูล: ' + app.global.parameter);
							app.global.scanned = false;
						}
						actionText.setText('การกระทำ: รอ');
					}
				} else if (details.playingStatus == "swapping") {
					if (app.global.index == details.indexA) actionText.setText('การกระทำ: สลับกับตำแหน่งที่', (details.indexB + 1));
					else if (app.global.index == details.indexB) actionText.setText('การกระทำ: สลับกับตำแหน่งที่', (details.indexA + 1));
					app.global.index = details.swappedActors.indexOf(app.global.username);
					app.global.parameter = details.swappedParametersArr[app.global.index];
					posNum.setText(app.global.index + 1);
					app.global.swappedParametersArr = details.swappedParametersArr;
					console.log('ลำดับ ' + (app.global.index + 1) + ', ' + app.global.parameter);
				}
			}
		});
	} else if (app.global.userType == 'observer') {
		var stdIconOpt = app.add.sprite(app.world.centerX, app.world.centerY * 1.265, 'robot-tilesheet');
		stdIconOpt.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
		stdIconOpt.animations.add('run', [10, 11, 12, 13, 14, 15, 16, 17], 12, true);
		stdIconOpt.play('idle');
		stdIconOpt.anchor.set(0.5);
		stdIconOpt.scale.setTo(0.65);
		var stdIconOptTextTop = app.add.text(stdIconOpt.x, stdIconOpt.y - (stdIconOpt.height / 2) + 8, 'ผู้สังเกตการณ์', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		stdIconOptTextTop.anchor.set(0.5, 1);
		var stdIconOptTextDown = app.add.text(stdIconOpt.x, stdIconOpt.y + (stdIconOpt.height / 2) - 8, app.global.username, {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		stdIconOptTextDown.anchor.set(0.5, 0);
		var actionText = app.add.text(app.world.centerX * 0.1875, app.world.centerY * 1.65, 'การกระทำ: รอตอบคำถาม', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		actionText.anchor.set(0, 0.5);
		points = app.add.text(app.world.centerX * 0.1875, app.world.centerY * 1.75, 'ตอบถูก: 0/0', {
			font: "96px xfont",
			fontWeight: 'bold',
			fill: "#FFFFFF",
			stroke: '#00B0DC',
			strokeThickness: 7,
			align: "center"
		});
		points.anchor.set(0, 0.5);
		socket.on('standbyObservers', function(details) {
			if (details.roomId == app.global.roomId && app.global.userType == 'observer') {
				if (details.playingStatus == "searching") {
					console.log('Value Found: ' + details.valueFound);
					comparingMsgBox(app.global.swappedParametersArr[Number(details.index)] + ' ใช่ค่าข้อมูลที่ค้นหาหรือไม่ ?', details.valueFound);
				} else if (details.playingStatus == "comparing") {
					if (details.symbol == "<") var symbol = ' น้อยกว่า ';
					else if (details.symbol == ">") var symbol = ' มากกว่า ';
					console.log('Comparing Result: ' + details.comparingResult);
					comparingMsgBox(app.global.swappedParametersArr[Number(details.indexA)] + symbol + app.global.swappedParametersArr[Number(details.indexB)] + '\nใช่หรือไม่ ?', details.comparingResult);
				} else if (details.playingStatus == "swapping") {
					app.global.swappedParametersArr = details.swappedParametersArr;
				}
			}
		});
	}
	if (app.device.desktop) {
		socket.on('resultantTeacher', function(details) {
			if (details.roomId == app.global.roomId) {
				if (details.searchingResultIndex != null) app.global.result = 'พบค่าข้อมูลที่ผู้แสดงลำดับ ' + (Number(details.searchingResultIndex) + 1);
				timer.stop();
				var now = new Date();
				var strDateTime = [
					[now.getFullYear(), addZero(now.getMonth() + 1), addZero(now.getDate())].join("-"), [addZero(now.getHours()), addZero(now.getMinutes())].join(":")
				].join(" ");
				socket.emit('saveReport', {
					dateTime: strDateTime,
					result: app.global.result,
					mins: mins,
					secs: secs
				}, function(succeeded) {
					if (succeeded) {
						if(Number(mins) >= 0 && Number(secs) > 0){
							app.global.time = mins + ' นาที ' + secs + ' วินาที';
						}else{
							app.global.time = null;
						}
						socket.off('standbyTeacher');
						socket.off('resultantTeacher');
						app.state.start("Resultant");
					}
				});
			}
		});
	} else {
		socket.on('resultantStds', function(details) {
			if (details.roomId == app.global.roomId) {
				socket.emit('saveRecord', {
					roomId: app.global.roomId,
					username: app.global.username,
					answer: app.global.answer,
					correctAnswer: app.global.correctAnswer,
					result: details.result
				}, function(succeeded) {
					if (succeeded) {
						socket.off('standbyOperator');
						socket.off('standbyActors');
						socket.off('standbyObservers');
						socket.off('resultantStds');
						app.state.start("Resultant");
					}
				});
			}
		});
	}
};
PlayingRoom.prototype.update = function() {
	backgroundAnimated2();
	if (app.device.desktop && timer.running) {
		var minutes = Math.floor(timer.ms / 60000) % 60;
		var seconds = Math.floor(timer.ms / 1000) % 60;
		mins = Math.floor(timer.ms / 60000) % 60;
		secs = Math.floor(timer.ms / 1000) % 60;
		if (seconds < 10) seconds = '0' + seconds;
		if (minutes < 10) minutes = '0' + minutes;
		timerText.setText(minutes + ':' + seconds);
	}
};
function tweenTint(obj, startColor, endColor, time = 250, delay = 0, callback = null) {
	if (obj) {
		let colorBlend = {
			step: 0
		};
		let colorTween = app.add.tween(colorBlend).to({
			step: 100
		}, time, Phaser.Easing.Linear.None, delay).loop(true);
		colorTween.onUpdateCallback(() => {
			obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
		});
		obj.tint = startColor;
		if (callback) {
			colorTween.onComplete.add(callback, this);
		}
		colorTween.start();
	}
};
function addZero(num) {
	return (num >= 0 && num < 10) ? "0" + num : num + "";
};
function setGuideText() {
	playingRoomGuideFrameText.setText(' วิธีเล่น:');
	guideText1.setText(app.global.algoGuideAf);
};
function QRCodeScanner() {
	cam.start();
	divMain.style.left = '-1920px';
	divMain.style.visibility = 'hidden';
	divQRCodeScanner.style.left = '0px';
	divQRCodeScanner.style.visibility = 'visible';
};
function scanningMsgBox(textBody, fnName, textHeader = '') {
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
		app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
			window[fnName]();
		}, this);
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
};
function scanningResultMsgBox(textBody, textHeader = '') {
	socket.emit('scanned', {
		roomId: app.global.roomId,
		value: textBody
	});
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
		app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
			socket.emit('play', app.global.roomId);
		}, this);
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
};
function comparingMsgBox(textBody, comparingResult) {
	if (this.msgBox) {
		this.popupBg.destroy();
		this.msgBox.destroy();
	}
	if (app.device.desktop) {
		var w = app.width * 0.5;
		var h = app.height * 0.65;
		var yesButtonScale = 0.75;
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
		var yesButtonScale = 0.75;
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
	var answered = false;
	var popupBg = app.add.sprite(0, 0, "black");
	var msgBox = app.add.group();
	var popupUi = app.add.sprite(0, 0, "ui-18");
	yesButton = app.add.sprite(0, 0, "bt-42");
	noButton = app.add.sprite(0, 0, "bt-23");
	var textHeader1 = app.add.text(0, 0, 'คำถาม', textHeader1Style);
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
	yesButton.scale.setTo(yesButtonScale);
	noButton.scale.setTo(yesButtonScale);
	msgBox.add(popupUi);
	msgBox.add(yesButton);
	msgBox.add(noButton);
	msgBox.add(textHeader1);
	msgBox.add(textBody1);
	yesButton.x = (popupUi.width / 2 - yesButton.width / 2) - (yesButton.width * 0.75);
	yesButton.y = popupUi.height - yesButton.height;
	noButton.x = (popupUi.width / 2 - noButton.width / 2) + (noButton.width * 0.75);
	noButton.y = popupUi.height - noButton.height;
	yesButton.inputEnabled = true;
	yesButton.events.onInputOver.add(function() {
		yesButton.loadTexture('bt-43', 0, false);
	}, this);
	yesButton.events.onInputOut.add(function() {
		yesButton.loadTexture('bt-42', 0, false);
	}, this);
	yesButton.events.onInputDown.add(function() {
		yesButton.loadTexture('bt-43', 0, false);
		popupBg.destroy();
		msgBox.destroy();
		if (comparingResult == true) {
			answered = true;
			app.global.answer++;
			app.global.correctAnswer++;
			console.log('ตอบถูก');
			points.setText('ตอบถูก: ' + app.global.correctAnswer + '/' + app.global.answer);
			var greenBg = app.add.sprite(0, 0, "green");
			greenBg.alpha = 0.75;
			greenBg.width = app.width;
			greenBg.height = app.height;
			app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				greenBg.destroy();
			}, this);
		} else {
			answered = true;
			app.global.answer++;
			console.log('ตอบผิด');
			points.setText('ตอบถูก: ' + app.global.correctAnswer + '/' + app.global.answer);
			var redBg = app.add.sprite(0, 0, "red");
			redBg.alpha = 0.75;
			redBg.width = app.width;
			redBg.height = app.height;
			app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				redBg.destroy();
			}, this);
		}
		if (app.global.userType == 'operator') {
			app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				socket.emit('play', app.global.roomId);
			}, this);
		}
	}, this);
	noButton.inputEnabled = true;
	noButton.events.onInputDown.add(function() {
		popupBg.destroy();
		msgBox.destroy();
		if (comparingResult == false) {
			answered = true;
			app.global.answer++;
			app.global.correctAnswer++;
			console.log('ตอบถูก');
			points.setText('ตอบถูก: ' + app.global.correctAnswer + '/' + app.global.answer);
			var greenBg = app.add.sprite(0, 0, "green");
			greenBg.alpha = 0.75;
			greenBg.width = app.width;
			greenBg.height = app.height;
			app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				greenBg.destroy();
			}, this);
		} else {
			answered = true;
			app.global.answer++;
			console.log('ตอบผิด');
			points.setText('ตอบถูก: ' + app.global.correctAnswer + '/' + app.global.answer);
			var redBg = app.add.sprite(0, 0, "red");
			redBg.alpha = 0.75;
			redBg.width = app.width;
			redBg.height = app.height;
			app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				redBg.destroy();
			}, this);
		}
		if (app.global.userType == 'operator') {
			app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				socket.emit('play', app.global.roomId);
			}, this);
		}
	}, this);
	msgBox.x = app.width / 2 - msgBox.width / 2;
	msgBox.y = app.height / 2 - msgBox.height / 2;
	textHeader1.anchor.set(0.5);
	textHeader1.x = popupUi.width / 2;
	textHeader1.y = popupUi.y + (textHeader1.height / 2) + 8;
	textBody1.x = popupUi.width / 2 - textBody1.width / 2;
	textBody1.y = popupUi.height / 2 - textBody1.height / 2 - 16;
	this.popupBg = popupBg;
	this.msgBox = msgBox;
	app.time.events.add(Phaser.Timer.SECOND * 5, function() {
		if (answered == false) {
			popupBg.destroy();
			msgBox.destroy();
			app.global.answer++;
			console.log('หมดเวลาตอบคำถาม');
			points.setText('ตอบถูก: ' + app.global.correctAnswer + '/' + app.global.answer);
			var redBg = app.add.sprite(0, 0, "red");
			redBg.alpha = 0.75;
			redBg.width = app.width;
			redBg.height = app.height;
			app.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				redBg.destroy();
			}, this);
			if (app.global.userType == 'operator') socket.emit('play', app.global.roomId);
		}
	}, this);
};
function arrayMove(arr, old_index, new_index) {
	if (new_index >= arr.length) {
		var k = new_index - arr.length + 1;
		while (k--) {
			arr.push(undefined);
		}
	}
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr;
};
function backToPlayingRoom() {
	divQRCodeScanner.style.left = '-1920px';
	divQRCodeScanner.style.visibility = 'hidden';
	divMain.style.left = '0px';
	divMain.style.visibility = 'visible';
};
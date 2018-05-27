function read(a)
{
	if((typeof a == "string" && a.length <= 14) || (typeof a == "number" && a <= 999999)){
		divQRCodeScanner.style.left = '-1920px';
		divQRCodeScanner.style.visibility = 'hidden';
		divMain.style.left = '0px';
		divMain.style.visibility = 'visible';
		cam.stop();
		console.log(a);
		
		/*if(app.global.algoType == 'search')
			findingMsgBox(a);
		else if(app.global.algoType == 'sort')*/
			scanningResultMsgBox(a);
	}
}
    
qrcode.callback = read;
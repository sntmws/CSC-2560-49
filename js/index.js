$(function() {
	Element.prototype.remove = function() {
		this.parentElement.removeChild(this);
	}
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
		for (var i = this.length - 1; i >= 0; i--) {
			if (this[i] && this[i].parentElement) {
				this[i].parentElement.removeChild(this[i]);
			}
		}
	}
	$('#creAlgoType').on('change', function() {
		$("#creAlgoName").empty();
		if ($(this).val() == 'search') {
			$('#creParSortingDiv').show();
			$('#creParSortingTypeDiv').hide();
			$('#creDesiredPar').show();
			for (var i = 0; i < app.global.algoNamesArr.length; i++) {
				if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == 'search') {
					var option = document.createElement("option");
					option.value = app.global.algoNamesArr[i];
					option.text = app.global.algoNamesArr[i];
					document.getElementById("creAlgoName").add(option);
				}
			}
		} else if ($(this).val() == 'sort') {
			$('#creParSorting').val('unsorted');
			$('#creParSortingDiv').hide();
			$('#creParSortingTypeDiv').show();
			$('#creDesiredPar').hide();
			for (var i = 0; i < app.global.algoNamesArr.length; i++) {
				if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == 'sort') {
					var option = document.createElement("option");
					option.value = app.global.algoNamesArr[i];
					option.text = app.global.algoNamesArr[i];
					document.getElementById("creAlgoName").add(option);
				}
			}
		}
	})
	$('input[name="algoManageType"]').on('click', function() {
		if ($(this).val() == 'add') {
			$('#addAlgoDiv').show();
			$('#editAlgoDiv').hide();
			$('#delAlgoDiv').hide();
			$('#addAlgoFooter').show();
			$('#editAlgoFooter').hide();
			$('#delAlgoFooter').hide();
		} else if ($(this).val() == 'edit') {
			$('#addAlgoDiv').hide();
			$('#editAlgoDiv').show();
			$('#delAlgoDiv').hide();
			$('#addAlgoFooter').hide();
			$('#editAlgoFooter').show();
			$('#delAlgoFooter').hide();
		} else if ($(this).val() == 'del') {
			$('#addAlgoDiv').hide();
			$('#editAlgoDiv').hide();
			$('#delAlgoDiv').show();
			$('#addAlgoFooter').hide();
			$('#editAlgoFooter').hide();
			$('#delAlgoFooter').show();
		}
	});
	$('#addAlgoCodeSelect').on('change', function() {
		if ($(this).val() == '1') {
			$('#addAlgoCodeMainDiv').show();
			$('#addAlgoCodeFn1Div').hide();
			$('#addAlgoCodeFn2Div').hide();
		} else if ($(this).val() == '2') {
			$('#addAlgoCodeMainDiv').hide();
			$('#addAlgoCodeFn1Div').show();
			$('#addAlgoCodeFn2Div').hide();
		} else if ($(this).val() == '3') {
			$('#addAlgoCodeMainDiv').hide();
			$('#addAlgoCodeFn1Div').hide();
			$('#addAlgoCodeFn2Div').show();
		}
	})
	$('#editAlgoType').on('change', function() {
		$("#editAlgoName").empty();
		$("#editAlgoNameNew").empty();
		$('#editAlgoTypeNew').val($(this).val());
		editAlgoCodeMain.setValue("");
		editAlgoCodeFn1.setValue("");
		editAlgoCodeFn2.setValue("");
		$("#editAlgoGuideBe").empty();
		$("#editAlgoGuideAf").empty();
		$("#editAlgoText").empty();
		if ($(this).val() == 'search') {
			for (var i = 0; i < app.global.algoNamesArr.length; i++) {
				if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == 'search') {
					var option = document.createElement("option");
					option.value = app.global.algoNamesArr[i];
					option.text = app.global.algoNamesArr[i];
					document.getElementById("editAlgoName").add(option);
				}
			}
			var selectedAlgo = document.getElementById("editAlgoName").options[document.getElementById("editAlgoName").selectedIndex].value;
			document.getElementById("editAlgoNameNew").value = selectedAlgo;
			$("#editAmtAlgoCode").val(app.global.algosObj[selectedAlgo]["amtAlgoCode"]).change();
			$("#editAlgoCodeSelect").val("1").change();
			editAlgoCodeMain.setValue(app.global.algosObj[selectedAlgo]["algoCodeMain"]);
			if (app.global.algosObj[selectedAlgo]["amtAlgoCode"] == 1) {
				editAlgoCodeFn1.setValue("");
				editAlgoCodeFn2.setValue("");
			} else if (app.global.algosObj[selectedAlgo]["amtAlgoCode"] == 2) {
				editAlgoCodeFn1.setValue(app.global.algosObj[selectedAlgo]["algoCodeFn1"]);
				editAlgoCodeFn2.setValue("");
			} else if (app.global.algosObj[selectedAlgo]["amtAlgoCode"] == 3) {
				editAlgoCodeFn1.setValue(app.global.algosObj[selectedAlgo]["algoCodeFn1"]);
				editAlgoCodeFn2.setValue(app.global.algosObj[selectedAlgo]["algoCodeFn2"]);
			}
			document.getElementById("editAlgoGuideBe").value = app.global.algosObj[selectedAlgo]["algoGuideBe"];
			document.getElementById("editAlgoGuideAf").value = app.global.algosObj[selectedAlgo]["algoGuideAf"];
			document.getElementById("editAlgoText").value = app.global.algosObj[selectedAlgo]["algoText"];
		} else if ($(this).val() == 'sort') {
			for (var i = 0; i < app.global.algoNamesArr.length; i++) {
				if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == 'sort') {
					var option = document.createElement("option");
					option.value = app.global.algoNamesArr[i];
					option.text = app.global.algoNamesArr[i];
					document.getElementById("editAlgoName").add(option);
				}
			}
			var selectedAlgo = document.getElementById("editAlgoName").options[document.getElementById("editAlgoName").selectedIndex].value;
			document.getElementById("editAlgoNameNew").value = selectedAlgo;
			$("#editAmtAlgoCode").val(app.global.algosObj[selectedAlgo]["amtAlgoCode"]).change();
			$("#editAlgoCodeSelect").val("1").change();
			editAlgoCodeMain.setValue(app.global.algosObj[selectedAlgo]["algoCodeMain"]);
			if (app.global.algosObj[selectedAlgo]["amtAlgoCode"] == 1) {
				editAlgoCodeFn1.setValue("");
				editAlgoCodeFn2.setValue("");
			} else if (app.global.algosObj[selectedAlgo]["amtAlgoCode"] == 2) {
				editAlgoCodeFn1.setValue(app.global.algosObj[selectedAlgo]["algoCodeFn1"]);
				editAlgoCodeFn2.setValue("");
			} else if (app.global.algosObj[selectedAlgo]["amtAlgoCode"] == 3) {
				editAlgoCodeFn1.setValue(app.global.algosObj[selectedAlgo]["algoCodeFn1"]);
				editAlgoCodeFn2.setValue(app.global.algosObj[selectedAlgo]["algoCodeFn2"]);
			}
			document.getElementById("editAlgoGuideBe").value = app.global.algosObj[selectedAlgo]["algoGuideBe"];
			document.getElementById("editAlgoGuideAf").value = app.global.algosObj[selectedAlgo]["algoGuideAf"];
			document.getElementById("editAlgoText").value = app.global.algosObj[selectedAlgo]["algoText"];
		}
	})
	$('#editAlgoName').on('change', function() {
		document.getElementById("editAlgoNameNew").value = this.value;
		$("#editAmtAlgoCode").val(app.global.algosObj[this.value]["amtAlgoCode"]).change();
		$("#editAlgoCodeSelect").val("1").change();
		editAlgoCodeMain.setValue(app.global.algosObj[this.value]["algoCodeMain"]);
		if (app.global.algosObj[this.value]["amtAlgoCode"] == 1) {
			editAlgoCodeFn1.setValue("");
			editAlgoCodeFn2.setValue("");
		} else if (app.global.algosObj[this.value]["amtAlgoCode"] == 2) {
			editAlgoCodeFn1.setValue(app.global.algosObj[this.value]["algoCodeFn1"]);
			editAlgoCodeFn2.setValue("");
		} else if (app.global.algosObj[this.value]["amtAlgoCode"] == 3) {
			editAlgoCodeFn1.setValue(app.global.algosObj[this.value]["algoCodeFn1"]);
			editAlgoCodeFn2.setValue(app.global.algosObj[this.value]["algoCodeFn2"]);
		}
		document.getElementById("editAlgoGuideBe").value = app.global.algosObj[this.value]["algoGuideBe"];
		document.getElementById("editAlgoGuideAf").value = app.global.algosObj[this.value]["algoGuideAf"];
		document.getElementById("editAlgoText").value = app.global.algosObj[this.value]["algoText"];
	})
	$('#editAlgoCodeSelect').on('change', function() {
		if ($(this).val() == '1') {
			$('#editAlgoCodeMainDiv').show();
			$('#editAlgoCodeFn1Div').hide();
			$('#editAlgoCodeFn2Div').hide();
		} else if ($(this).val() == '2') {
			$('#editAlgoCodeMainDiv').hide();
			$('#editAlgoCodeFn1Div').show();
			$('#editAlgoCodeFn2Div').hide();
		} else if ($(this).val() == '3') {
			$('#editAlgoCodeMainDiv').hide();
			$('#editAlgoCodeFn1Div').hide();
			$('#editAlgoCodeFn2Div').show();
		}
	})
	$('#delAlgoType').on('change', function() {
		$("#delAlgoName").empty();
		if ($(this).val() == 'search') {
			for (var i = 0; i < app.global.algoNamesArr.length; i++) {
				if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == 'search') {
					var option = document.createElement("option");
					option.value = app.global.algoNamesArr[i];
					option.text = app.global.algoNamesArr[i];
					document.getElementById("delAlgoName").add(option);
				}
			}
		} else if ($(this).val() == 'sort') {
			for (var i = 0; i < app.global.algoNamesArr.length; i++) {
				if (app.global.algosObj[app.global.algoNamesArr[i]]["algoType"] == 'sort') {
					var option = document.createElement("option");
					option.value = app.global.algoNamesArr[i];
					option.text = app.global.algoNamesArr[i];
					document.getElementById("delAlgoName").add(option);
				}
			}
		}
	})
	$("#rptSemesters, #rptSections").on('change', function() {
		socket.emit('getRptDateTime', {
			semester: $('#rptSemesters').val(),
			section: $('#rptSections').val()
		}, function(result) {
			var rptDateTime = document.getElementById("rptDateTime");
			$("#rptDateTime").empty();
			for (var i = 0; i < result.length; i++) {
				var option = document.createElement("option");
				option.value = result[i];
				option.text = result[i];
				rptDateTime.add(option);
			}
		});
	})
	$('#fnDesignGuideTitle1').click(function() {
		$('#fnDesignGuideText1').show();
		$('#fnDesignGuideText2').hide();
		$('#fnDesignGuideText3').hide();
	});
	$('#fnDesignGuideTitle2').click(function() {
		$('#fnDesignGuideText2').toggle();
		$('#fnDesignGuideText1').hide();
		$('#fnDesignGuideText3').hide();
	});
	$('#fnDesignGuideTitle3').click(function() {
		$('#fnDesignGuideText3').toggle();
		$('#fnDesignGuideText1').hide();
		$('#fnDesignGuideText2').hide();
	});
});
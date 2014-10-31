function sLog(game) {
	this.game = game;
	this.logNo = 1;

	this.processComment = function (type, cellNum, value) {
		switch(type) {
			case "candidate": 
				this.logCandidate(cellNum, value);
				break;
		}
	}

	this.logCandidate = function(cellNum, value) {
		var cell = this.game.cells[cellNum];
		var rowStr = "R" + this.game.rowVals[cell.rowNum].join("");
		var colStr = "C" + this.game.colVals[cell.colNum].join("");
		var cageStr = "B" + this.game.cageVals[cell.cageNum].join("");
		var statStr = rowStr + colStr + cageStr;
		var str = "CAND: #" + cellNum + " (" + value + "). " + statStr;
		this.log(str, "blue");
	}

	this.log = function(text, color) {
		var logHTML = '<li class="'+ color +'">' + this.logNo + '. ' + text + '</li>';
		$("#sLog uL").prepend(logHTML);
		this.logNo += 1;
	}

}
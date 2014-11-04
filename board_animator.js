function boardAnimator(board) {
	this.board = board;
	this.pauseTime = 400;
	this.emphasizeColor = "grey";

	this.colorizeCell = function (cellNum, color) {
		cell = this.board.cells[cellNum];
		cell.selector.css("background-color", color);
	}

	this.highlightCell = function(cellNum, color) {
		var bA = this;
		this.colorizeCell(cellNum, color);
		setTimeout(function(){bA.colorizeCell(cellNum, "white")}, this.pauseTime);
	}

	this.highlightCells = function(cellNums, color) {
		for (var i=0, len=cellNums.length; i<len; i++) {
			console.log(cellNums[i] + " " + color);
			this.highlightCell(cellNums[i], color);
		}
	}

	this.emphasizeCellInColl = function(cellNumToEmph, cellNumsInColl, color) {
		this.highlightCells(cellNumsInColl, color);
		this.highlightCell(cellNumToEmph, this.emphasizeColor);
	}

}
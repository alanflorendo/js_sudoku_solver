
$(document).ready(function(){
	$("#load_board").click(function(){
		var bdStr = $("#sudoku_string").val();
		sBd = new SudokuBoard(bdStr)
		sBd.loadBoardToDOM();
	})

	$("#iterate_cand").click(function(){
		sBd.iterateOnceUsingCellCandidates();
	})

	$("#iterate_coll").click(function(){
		sBd.iterateOnceUsingCollections();
	})

	$("#solve_cand").click(function(){
		sBd.solveUsingCandidates();
	})

	$("#solve_coll").click(function(){
		sBd.solveUsingCollections();
	})

	$("#solve").click(function(){
		sBd.bigSolve();
	})

})

function SudokuBoard(boardString) {
	this.boardString = boardString;
	this.cells = [];
	this.rowVals = [ [], [], [], [], [], [], [], [], [] ];
	this.colVals = [ [], [], [], [], [], [], [], [], [] ];
	this.cageVals = [ [], [], [], [], [], [], [], [], [] ];
	this.rowInds = [ [], [], [], [], [], [], [], [], [] ];
	this.colInds = [ [], [], [], [], [], [], [], [], [] ];
	this.cageInds = [ [], [], [], [], [], [], [], [], [] ];

	this.loadBoardToDOM = function() {
		for (var i=0; i<9; i++){
			for (var j=0; j<9; j++){
				var index = i*9 + j;

				// FILL IN CELL OBJECTS WITH APPROPRIATE DATA
				var cell = new Cell(this.boardString[index]);
				cell.indexNum = index;
				cell.rowNum = i;
				cell.colNum = j;
				cell.cageNum = (Math.floor(i / 3) * 3) + Math.floor(j/3);
				var selector = "#board tr:nth-child(" + (i+1) + ") td:nth-child(" + (j+1) + ")";
				cell.selector = $(selector);
				cell.selector.css("background-color", "white");
				if (cell.value != 0) 
					cell.selector.html(cell.value);
				else
					cell.selector.html("");

				// FILL IN BOARD ARRAYS WITH APPROPRIATE VALUES AND INDICES
				this.cells.push(cell);
				cell.bd = this;
				this.rowInds[i].push(cell.indexNum);
				this.colInds[j].push(cell.indexNum);
				this.cageInds[cell.cageNum].push(cell.indexNum);
			}
		}
		$("#solved").css("display", "none");
		this.updateBoard();
	}

	this.numZeros = function() {
		var numZeros = 0;
		for (var i=0; i<9; i++){
			for (var j=0; j<9; j++){
				var index = i*9 + j;
				if (this.cells[index].value === "0")
					numZeros += 1;
			}
		}
		return numZeros;		
	}

	this.updateBoard = function() {
		this.rowVals = [ [], [], [], [], [], [], [], [], [] ];
		this.colVals = [ [], [], [], [], [], [], [], [], [] ];
		this.cageVals = [ [], [], [], [], [], [], [], [], [] ];
		for (var i=0; i<9; i++){
			for (var j=0; j<9; j++){
				var index = i*9 + j;
				this.rowVals[i].push(this.cells[index].value);
				this.colVals[j].push(this.cells[index].value);
				this.cageVals[this.cells[index].cageNum].push(this.cells[index].value);
			}
		}
		if (this.numZeros() === 0)
			this.solved();		
	}

	this.solved = function() {
		$("#solved").css("display", "inline-block");
	}

	this.fillInCell = function(cellNum, value, color) {
		this.boardString = this.boardString.replaceAt(cellNum, value);
		this.cells[cellNum].selector.html(value);
		this.cells[cellNum].selector.css("background-color", color);
		this.cells[cellNum].value = value;
		this.updateBoard();
	}

	this.solveCellUsingCellCandidates = function(cellNum) {
		var cell = this.cells[cellNum];
		cell.setCandidates();
		if (cell.value === "0" && cell.candidates.length === 1) {
			this.fillInCell(cellNum, cell.candidates[0], "pink");
		}		
	}

	this.iterateOnceUsingCellCandidates = function() {
		for (var i=0; i<81; i++) {
			this.solveCellUsingCellCandidates(i);
		}
	}

	this.solveUsingCandidates = function() {
		var oldNumZeros = this.numZeros();
		do {
			oldNumZeros = this.numZeros();
			this.iterateOnceUsingCellCandidates();
		} while (this.numZeros() != 0 && oldNumZeros != this.numZeros());
	}

	this.solveUsingCollections = function() {
		var oldNumZeros = this.numZeros();
		do {
			oldNumZeros = this.numZeros();
			this.iterateOnceUsingCollections();
		} while (this.numZeros() != 0 && oldNumZeros != this.numZeros());
	}

	this.bigSolve = function() {
	}

	this.solveWithACollection = function(cellIndices, color) {
		// a collection is a set of 9 indices for a row, column, or a cage
		var len = cellIndices.length;
		var candFreq = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0};
		var candAvails = {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": []};
		
		// set candidates for each cell in the collection
		for (var i=0; i<len; i++) {
			this.cells[cellIndices[i]].setCandidates();
		}

		// go thru each candidate to see which cells could be used for that candidate
		for (var i=0; i<len; i++) {
			var cell = this.cells[cellIndices[i]];
			for (var j=0; j<cell.candidates.length; j++) {
				candAvails[cell.candidates[j]].push(cellIndices[i]);
			}
		}

		// if only one spot in the collection can be used for the candidate, fill it in
		for (key in candAvails) {
			if (candAvails[key].length === 1) {
				sBd.fillInCell(candAvails[key][0], key, color);
			}
		}

	}

	this.solveThisCollection = function(collectionType, collectionNum, color) {
		switch(collectionType) {
			case "row":
				this.solveWithACollection(this.rowInds[collectionNum], color);
				break;
			case "col":
				this.solveWithACollection(this.colInds[collectionNum], color);
				break;
			case "cage":
				this.solveWithACollection(this.cageInds[collectionNum], color);
				break;
		}
	}

	this.iterateOnceUsingCollections = function() {
		for (var i=0; i<9; i++) {
			this.solveThisCollection("row", i, "pink");
			this.solveThisCollection("col", i, "orange");
			this.solveThisCollection("cage", i, "yellow");
		}
	}

}


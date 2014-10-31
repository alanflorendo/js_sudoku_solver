
$(document).ready(function(){
	$("#load_board").click(function(){
		var bdStr = $("#sudoku_string").val();
		sBd = new SudokuBoard(bdStr)
		sBd.loadBoardToDOM();
	})
})

function SudokuBoard(boardString) {
	this.boardString = boardString;
	this.cells = [];
	this.rowVals = [ [], [], [], [], [], [], [], [], [] ]
	this.colVals = [ [], [], [], [], [], [], [], [], [] ]
	this.cageVals = [ [], [], [], [], [], [], [], [], [] ]
	this.rowInds = [ [], [], [], [], [], [], [], [], [] ]
	this.colInds = [ [], [], [], [], [], [], [], [], [] ]
	this.cageInds = [ [], [], [], [], [], [], [], [], [] ]

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
				if (cell.value != 0) 
					cell.selector.html(cell.value);

				// FILL IN BOARD ARRAYS WITH APPROPRIATE VALUES AND INDICES
				this.cells.push(cell);
				cell.bd = this;
				this.rowVals[i].push(cell.value);
				this.rowInds[i].push(cell.indexNum);
				this.colVals[j].push(cell.value);
				this.colInds[j].push(cell.indexNum);
				this.cageVals[cell.cageNum].push(cell.value);
				this.cageInds[cell.cageNum].push(cell.indexNum);
			}
		}
	}

	this.fillInCell = function(cellNum, value, color) {
		this.boardString = this.boardString.replaceAt(cellNum, value);
		this.cells[cellNum].selector.html(value);
		this.cells[cellNum].selector.css("background-color", color);
	}

}

function Cell(num) {
	this.value = num;
	this.rowNum;
	this.colNum;
	this.cageNum;
	this.indexNum;
	this.candidates = [];
	this.selector;
	this.bd;

	this.setCandidates = function() {
		var allCandidates = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
		var rowsAndCols = this.bd.rowVals[this.rowNum].concat(this.bd.colVals[this.colNum]).unique();
		var candsToEliminate = rowsAndCols.concat(this.bd.cageVals[this.cageNum]).unique();
		this.candidates = allCandidates.diff( candsToEliminate );
	}
}

$(document).ready(function(){
	$("#load_board").click(function(){
		var bdStr = $("#sudoku_string").val();
		sBd = new SudokuBoard(bdStr)
		sBd.loadBoardToDOM();
	})
})

function SudokuBoard(boardString) {
	this.boardString = boardString;
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
				this.rowVals[i].push(cell.value);
				this.rowInds[i].push(cell.indexNum);
				this.colVals[j].push(cell.value);
				this.colInds[j].push(cell.indexNum);
				console.log("Cage Num: " + cell.cageNum);
				this.cageVals[cell.cageNum].push(cell.value);
				this.cageInds[cell.cageNum].push(cell.indexNum);
			}
		}
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
}

$(document).ready(function(){
	$("#load_board").click(function(){
		var bdStr = $("#sudoku_string").val();
		sBd = new SudokuBoard(bdStr)
		sBd.loadBoardToDOM();
	})
})

function SudokuBoard(boardString) {
	this.boardString = boardString;

	this.loadBoardToDOM = function() {
		for (var i=0; i<9; i++){
			for (var j=0; j<9; j++){
				var index = i*9 + j;
				var cell = new Cell(this.boardString[index]);
				var selector = "#board tr:nth-child(" + (i+1) + ") td:nth-child(" + (j+1) + ")";
				cell.selector = $(selector);

				cell.rowNum = i;
				cell.colNum = j;
				cell.cageNum = (Math.floor((i-1) / 3) * 3) + Math.floor((j-1) / 3);
				
				cell.selector.html(cell.value);
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
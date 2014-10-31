$(document).ready(function(){
	$("#load_board").click(function(){
		var bdStr = $("#sudoku_string").val();
		loadBoardToDOM(bdStr);
	})
})

function loadBoardToDOM(boardString) {
	for (var i=0; i<9; i++){
		for (var j=0; j<9; j++){
			var index = i*9 + j;
			var cell = new Cell(boardString[index]);
			var selector = "#board tr:nth-child(" + (i+1) + ") td:nth-child(" + (j+1) + ")";
			cell.selector = $(selector);

			cell.rowNum = i;
			cell.colNum = j;
			cell.cageNum = (Math.floor((i-1) / 3) * 3) + Math.floor((j-1) / 3);
			
			cell.selector.html(boardString[i*9+j]);
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
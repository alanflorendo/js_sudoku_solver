$(document).ready(function(){
	$("#load_board").click(function(){
		var bdStr = $("#sudoku_string").val();
		loadBoardToDOM(bdStr);
	})
})

function loadBoardToDOM(boardString) {
	for (var i=0; i<9; i++){
		for (var j=0; j<9; j++){
			var selector = "#board tr:nth-child(" + (i+1) + ") td:nth-child(" + (j+1) + ")";
			$(selector).html(boardString[i*9+j]);
		}
	}
}
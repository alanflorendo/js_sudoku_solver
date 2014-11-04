
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

	$("#sudoku_dropdown").change(function() {
		var bdStr = $("#sudoku_dropdown").val();
		sBd = new SudokuBoard(bdStr);
		sBd.loadBoardToDOM();
	})

})


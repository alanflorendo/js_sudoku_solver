function loadBoardToDOM(boardString) {
	var index = 0;
	for (var i=1; i<=9; i++){
		for (var j=1; j<=9; j++){
			var selector = "#board tr:nth-child(" + i + ") td:nth-child(" + j + ")";
			$(selector).html(boardString[index]);
			index += 1;
		}
	}
}
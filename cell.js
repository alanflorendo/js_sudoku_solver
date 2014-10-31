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
		if (this.value === "0") {
			var allCandidates = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
			var rowsAndCols = this.bd.rowVals[this.rowNum].concat(this.bd.colVals[this.colNum]).unique();
			var candsToEliminate = rowsAndCols.concat(this.bd.cageVals[this.cageNum]).unique();
			this.candidates = allCandidates.diff( candsToEliminate );
		} else {
			this.candidates = [];
		}
	}
}
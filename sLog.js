function sLog(game) {
	this.game = game;
	this.logNo = 1;

	this.log = function(text, color) {
		var logHTML = "<li>" + this.logNo + ". " + text + "</li>";
		$("#sLog uL").prepend(logHTML);
		this.logNo += 1;
	}

}
// assume this data came from the database
var notes = [
	"This is the first note I've taken!",
	"Now is the time for all good men to come to the aid of their country.",
	"The quick brown fox jumped over the moon."
];

function addNote(note) {
	$("#notes").prepend(
		$("<a href='#'></a>")
		.addClass("note")
		.text(note)
	);
}

function addCurrentNote() {
	var current_note = $("#note").val();

	if (current_note) {
		notes.push(current_note);
		addNote(current_note);
		$("#note").val("");
	}
}

function showHelp() {
	$("#help").show();

	document.addEventListener("click",function __handler__(evt){
		document.removeEventListener("click",__handler__,true);
		hideHelp();
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();
	},true);
}

function hideHelp() {
	$("#help").hide();
}

function init() {
	var $notes = $("#notes");

	// build the list from the "database"
	var html = "";
	for (i=0; i<notes.length; i++) {
		html += "<a href='#' class='note'>" + notes[i] + "</a>";
	}
	$notes.html(html);

	// listen to "help" button
	$("#open_help").bind("click",function(evt){
		if (!$("#help").is(":visible")) {
			showHelp();
		}
	});

	// listen to "add" button
	$("#add_note").bind("click",function(evt){
		addCurrentNote();
	});

	// listen for <enter> in text box
	$("#note").bind("keypress",function(evt){
		if (evt.which == 13) {
			addCurrentNote();
		}
	});

	// listen for clicks outside the notes box
	$(document).bind("click",function(evt){
		$notes.removeClass("active");
		$notes.children(".note").removeClass("highlighted");
	});

	// listen for clicks on note elements
	$notes.on("click",".note",function(evt){
		$notes.addClass("active");
		$notes.children(".note").removeClass("highlighted");
		$(evt.target).addClass("highlighted");

		evt.preventDefault();
		evt.stopPropagation();
	});
}

$(document).ready(init);

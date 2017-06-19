$(document).ready(function($) {
	var position;
	var element;

	$( ".component" ).draggable({
		scroll: false,
		start: function(event, ui){
			element = $(event.target).attr("id");
			position = $("#" + element).offset();
		}
	});
	$( "#dropzone" ).droppable({
		tolerance: "fit",
		drop: function(event, ui) {
			if (element === "drag-1") {
				$('#dropzone').append("<div class='test-drag-1'>Component 1</div>");
			} else if (element === "drag-2") {
				$('#dropzone').append("<div class='test-drag-2'>teComponent 2</div>");
			} else if (element === "drag-3") {
				$('#dropzone').append("<div class='test-drag-3'>Component 3</div>");
			}
			
			$('#' + element).offset(position);
		}
	});
	
});

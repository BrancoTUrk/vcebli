$(document).ready(function($) {
	var element,theDropzone;
	var dropzone = document.getElementById("dropzone");

	dropzone.addEventListener('drop',dragStart,false);
	dropzone.addEventListener('dragover',dragOver,false);
	var draggables = [].slice.call(document.querySelectorAll('.component'));
	draggables.forEach(function(drag){
		drag.addEventListener('dragstart',dragStart,false);
		drag.addEventListener('dragend',dragEnd,false);
	});
	function dragStart(e) {
		element = e.target.id;
	}
	function dragDrop(e) {
		if (element === "drag-1") {
			$('#dropzone').append("<div class='test-drag-1'>Component 1</div>");
		} else if (element === "drag-2") {
			$('#dropzone').append("<div class='test-drag-2'>Component 2</div>");
		} else if (element === "drag-3") {
			$('#dropzone').append("<div class='test-drag-3'>Component 3</div>");
		}
	}
	function dragOver(e) {
		theDropzone = e.target.id
		console.log(theDropzone)
	}
	function dragEnd(e) {
		if(theDropzone=="dropzone"){
		if (element === "drag-1") {
			$('#dropzone').append("<div class='test-drag-1'>Component 1</div>");
		} else if (element === "drag-2") {
			$('#dropzone').append("<div class='test-drag-2'>Component 2</div>");
		} else if (element === "drag-3") {
			$('#dropzone').append("<div class='test-drag-3'>Component 3</div>");
		}
		}
		theDropzone == "undefined";
		console.log(theDropzone)
	}

});
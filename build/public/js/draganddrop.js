$( document ).ready(function($) {

	var position;
	// var elementID;

	// target elements with the "draggable" class
	interact('.component')
	  .draggable({
	    // enable inertial throwing
	    inertia: false,
	    // keep the element within the area of it's parent
	    restrict: {
	      endOnly: true
	    },
	    // enable autoScroll
	    autoScroll: false,
	    // call this function on every dragmove event
	    onmove: dragMoveListener,
	    // call this function on every dragend event
	    onend: function (event) {
	    	
	      	$(elementID).offset(position);
	    },
	    onstart: function (event) {
	    	elementID = "#" + event.target.id;
	    	position = $(elementID).offset();
	    	console.log(position);
	    }
	});
	function dragMoveListener (event) {
	    var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	}

	interact('#dropzone').dropzone({
		overlap: 1,
		ondrop: function (event) {
	    	var componentAdd = event.relatedTarget.id;
	    	
	    	if (componentAdd === "drag-1") {
	    		$('#dropzone').append("<div class='test-drag-1'>Component 1</div>")
	    	} else if (componentAdd === "drag-2"){
	    		$('#dropzone').append("<div class='test-drag-2'>Component 2</div>")
	    	} else if (componentAdd === "drag-3"){
	    		$('#dropzone').append("<div class='test-drag-3'>Component 3</div>")
	    	}
	    	$('#' + componentAdd).offset(position);
	  	}

	})
})
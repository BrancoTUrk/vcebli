$(document).ready(function($) {

	var element,html,sortElement,sortElementSibling,elementClass,gotName,pageDiscription,pageState,pageImage,siblingPrev,siblingNext;
	var drags = document.querySelectorAll('.draggables .component');
	var dropzone = document.getElementById("dropzone");
	var bttnGet = document.getElementById("getBttn");
	var bttnCancel = document.getElementById("cancelBttn");
	var bttnAccept = document.getElementById("confirmSave");
	var bttnSave = document.getElementById("saveBttn");
	var projectName = document.getElementById("projectName");
	var newDropzone	= "<div class='cdrop' id='0'>Drop me here!</div>";
	var apiURL = "/api/";
	var urlParam = new URLSearchParams(window.location.search);
	var projectId = urlParam.get('_id');
	var editMode = false;

	var toolDrag = document.getElementById("menu-open")
	var body = document.querySelector('body');
	var menuOpen = false;
	var draggables = [].slice.call(document.querySelectorAll('.component'));
	draggables.forEach(function(drag){
		drag.addEventListener('dragstart',dragStart,false);
		drag.addEventListener('dragend',dragEnd,false);
	});
	var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
	sortzone.forEach(function(zone){
		zone.addEventListener('drop',sortDrop,false);
	});

	dropzone.addEventListener('dragover',dragOver,false);
	dropzone.addEventListener('drop',dragDrop,false);
	bttnGet.addEventListener('click',getHTML,false);
	bttnCancel.addEventListener('click',closeLightbox,false);
	bttnSave.addEventListener('click',saveHtml,false);
	bttnAccept.addEventListener('click',closeLightbox,false);
	toolDrag.addEventListener('click',sidebarCollapse,false);
	$('div[contenteditable=true]').keydown(onEnter);
	window.onload = loadPage();
	window.onreadystatechange = init();

	//Loads content of the project made
	function loadPage() {
		if(urlParam.has("_id") == true){
			$.get(apiURL + 'comp/' + projectId, function(data){
				gotName = data.name;
				pageDiscription = data.discription;
				pageImage = data.image;
				pageState = data.state;

				$("#dropzone").append(data.html);
				$(".projectName").append(gotName);
				init();
			})
		}
	}
	function init() {
		var dropzone = document.getElementById("dropzone");	
		[].slice.call(dropzone.children).forEach(function (itemEl){
			if(itemEl.className != 'cdrop' && itemEl.className != 'main-content'){
				itemEl.draggable = true;
			}
		});
		// Event listeners toevoegen aan de element die binnen de dropzone staan om deze te kunnen sorteren door middel van drag and drop
		var dragsSort = [].slice.call(document.querySelectorAll('.new-element'));
		dragsSort.forEach(function(sortMe){
			sortMe.addEventListener('dragstart',sortStart,false);
			sortMe.addEventListener('dragend',sortEnd,false);
		});
		var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
		sortzone.forEach(function(zone){
			zone.addEventListener('drop',sortDrop,false);
		});
		var webcomponents = [].slice.call(document.querySelectorAll('.handle_bttn__delete'));
		webcomponents.forEach(function(comp){
			comp.addEventListener('click',deleteComponent,false);
		});
		var webcomponents = [].slice.call(document.querySelectorAll('.new-element'));
		webcomponents.forEach(function(comp){;
			comp.addEventListener('mouseenter',componentHandleShow,false);
			comp.addEventListener('mouseleave',componentHandleHide,false);
		});
	}
	// Functions for sortable elements insinde dropzone
	function sortStart(e){
		// e.preventDefault();
		init();
		sortElement = e.target;
		siblingPrev = sortElement.previousSibling;
		siblingNext = sortElement.nextSibling;
	}
	function sortEnd(e){
		init();
		var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
		sortzone.forEach(function(zone){
			zone.removeAttribute('style');
		});
	}
	function sortDrop(e){
		init();
		if (e.target.id != siblingPrev.id) {
			console.log(e.target.id)
			if (sortElement != undefined){
				if (sortElement.className != false) {
					var check = sortElement.className.split(" ")[0];
					if (check == 'new-element') {
						sortElementSibling = sortElement.previousSibling;
						dropzone.removeChild(sortElementSibling);
						dropzone.removeChild(sortElement);
						dropzone.insertBefore(sortElementSibling.cloneNode(true),e.target);
						dropzone.insertBefore(sortElement.cloneNode(true),e.target);
					}
					var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
					sortzone.forEach(function(zone){
						zone.removeAttribute('style');
					});
					sortElement == null;
				}
			}
		}
	}
	// Functions for drag and drop including sortable
	// Drag start function
	function dragStart(e) {
		init();
		this.style.opacity = 0.4;
		element = e.target.id;
		console.log(element);
		elementClass = e.target.className;
		e.target.style.cursor = 'pointer';
		var id = 1;
		var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
		sortzone.forEach(function(zone){
			zone.id = id;
			id++;
		})
	}
	// Drag end function
	function dragEnd(e) {
		init();
		$(this).css("opacity", "1");
		var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
		sortzone.forEach(function(zone){
			zone.removeAttribute('style');
		});
	}
	// Dragover function
	function dragOver(e) {
		e.preventDefault();
		init();
		var hover = e.target.className;
		if(hover == "cdrop" ){
			e.target.style.height = 100 + "px";
			e.target.style.lineHeight = 100 + "px";
			e.target.style.background = "#969696";
			e.target.style.color = "#ffffff";
		}
		else {
			var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
			sortzone.forEach(function(zone){
				zone.removeAttribute('style');
				zone.style.display = "block";
				zone.style.opacity = 1;
			});
		}
		elementClass == null;
	}
	// Drop function
	function dragDrop(e) {
		e.preventDefault();
		init();
		if(e.target.id != "dropzone"){
			var contentdrop = e.target.className;
			var canvas = e.target.id;
			if ($("#" + element).hasClass("component")) {
				var number = element.replace("drag-","");
				$.get("components/component_" + number + ".html", function(data){
					$("#" + canvas).before(newDropzone, data);
				})
				element = null;
			}
		}
	}
	// Get the html out the dropzone en places it in a textarea and enables lightbox
	function getHTML() {
		var html = $("#dropzone").html();
		var regex = /<div class="cdrop".*div>/g;
		var cleanHtml = html.replace(regex,"");
		if(html.length === 0){
			alert("Please add some components to the canvas");
		} else {
			$(".htmlBox").css("opacity", "1");
			$(".htmlBox").css("visibility", "visible");
			$(".htmlCopy").css("display", "block");
			$("#htmlOutput").val(cleanHtml);
			$("#copyValue").val(cleanHtml);
		}
	}
	// Closes the lightbox
	function closeLightbox() {
		$(".htmlBox").css("opacity", "0");
		setTimeout(function(){
			$(".htmlBox").css("visibility", "hidden");
			$(".htmlCopy").css("display", "none");
			$(".savePrompt").css("display", "none");
		},500);
	}
	// Saves the html in database
	function saveHtml() {
		var html = $("#dropzone").html();
		var name = gotName;
		var send = {
			name: name,
			html: html
		}
		$.ajax({
			"async": true,
			"crossDomain": true,
			url: apiURL + 'comp/' + projectId,
			type: "PUT",
			data: {
				"name": name,		 
				"html": html,
				"discription": pageDiscription,
				"image": pageImage,
				"state": pageState
			}
		})
		.done(function(){
			$(".htmlBox").css("opacity", "1");
			$(".htmlBox").css("visibility", "visible");
			$(".savePrompt").css("display", "block");
			$(".saveTekst").append(' ' + gotName + '.')
		})
	}
	function deleteProject() {
		var apiURL = '/api/';
		var id = projectId;
		$.ajax({
			url: apiURL + '/comp/' + id,
			type: 'DELETE'
		});
		window.location.href = "../portal";
	}
	function deleteComponent(e) {
		var childDelComponent = e.target.className.split(" ")[1];
		console.log(childDelComponent);
		if (childDelComponent === 'handle_bttn__delete') {
			var cdropPrev = e.target.parentNode.parentNode.previousSibling;
			var cdropNext = e.target.parentNode.parentNode.nextSibling;
			e.target.parentNode.parentNode.parentNode.removeChild(cdropNext);
			e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
		}	
	}
	function sidebarCollapse(){
		var widthSize = toolDrag.style.width;
		var boxTool = document.getElementById('tool');
		var menuImage = document.getElementById('menu-open');
		var vw = window.innerWidth;	
		body.classList.toggle('menu-open');
		if (boxTool.style.display == "block") {
			editMode = false;
			var sortzone = [].slice.call(document.querySelectorAll('.cdrop'));
			sortzone.forEach(function(zone){
				zone.removeAttribute('style');
				zone.style.display = "none";
				zone.style.opacity = 0;
			});
			boxTool.style.display = "none";
			menuImage.src = '../images/svg/tool.svg';
		} else {
			editMode = true;
			boxTool.style.display = "block";
			menuImage.src = '../images/svg/cancel.svg';
		}
	}
	function componentHandleShow(e){
		var componentClass = e.target.className.split(' ')[0];
		if (editMode == true) {
			if (componentClass == 'new-element') {
				e.target.childNodes[1].classList.add('is-open');
			}
		}
	}
	function componentHandleHide(e){
		init();
		var componentClass = e.target.className.split(' ')[0];
		if (componentClass == 'new-element') {
			e.target.childNodes[1].classList.remove('is-open');
		}
	}
	// Fixes it that when pressed enter in contenteditable element it replaces the div that is created with a <br> tag 
	function onEnter(event) {
		var key = event.which;
		if(key==13){
			document.execCommand('insertHTML', false, '<br><br>');
			return false;
		}
	}
	setInterval(init(), 300);
});
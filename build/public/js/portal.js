jQuery(function($){
	"user strict";
	var Portal = {
		init: function(){
			this.window = $(window);
			this.document = $(document);
			this.bindEvents();
		},
		bindEvents: function(){
			this.document.ready(this.getPages.bind(this));
			this.document.on('click','#confirmDelete',this.deletePages.bind(this));
			this.document.on('click','#createProject',this.newProject.bind(this));
			this.document.on('click','#confirmArchive',this.archivePages.bind(this));
			this.document.on('click','#activated',this.archivePages.bind(this));
			this.document.on('click','#new, #archive, #delete',this.openLightbox.bind(this));
			this.document.on('click', '#cancel, #cancelAction',this.closeLightbox.bind(this));
		},
		getPages: function(){			
			var apiURL = '/api/';
			$.get(apiURL + "comp/", function(data){
				$.each(data, function(){
					if(this.state == true){
						$('#active').append(
							'<div class="cardsInterfaceContainter"><article class="cardsInterface"><img src="' + this.image + '" alt="Preview" class="previewImage"></article><article class="cardsInterface cardsInterface__left-text"><h2 class="pagesTitle">' + this.name + '</h2><p class="discriptionPreview">' + this.discription + '</p></article><article class="cardsInterface"><a href="../poc/indexjs.html?_id=' + this._id + '"><button class="pageSetting">EDIT</button></a><br><button id="archive" class="pageSetting" data-name="' + this.name + '" data-key="' + this._id + '">ARCHIVE</button></article></div>'
						);
					} else {
						$("#archived").append(
							'<article class="archiveBox"><p class="archivePageName">' + this.name + '</p><div class="settingWrapper"><button id="activated" class="archiveSetting" data-key="' + this._id + '">ACTIVE</button><button class="archiveSetting" id="delete" data-name="' + this.name + '" data-key="' + this._id + '">DELETE</button></div>'
						);
					}
				});
			});
		},
		newProject: function(e){
			var name = $('#newProjectName').val();
			var html = '<div class="cdrop">Drop me here!</div>';
			var discription = $('#newProjectDiscription').val();
			var image = "../images/img/cortefiel.png"
			var state = true;
			var apiURL = "/api/"
			var send = {
				name: name,
				html: html,
				image: image,
				discription: discription,
				state: state
			}
			if (name != "") {
				$.post(apiURL + "comp/", send, function(data){
					window.location.href = "../poc/indexjs.html?_id=" + data.id;
				});
			}
			else(
				$('.errorMsg').css('display', 'block')
			)
		},
		deletePages: function(e){
			var apiURL = '/api/';
			var id = e.target.getAttribute('data-key');
			console.log(id);
			$.ajax({
				url: apiURL + '/comp/' + id,
				type: 'DELETE'
			});
			e.target.parentNode.parentNode.remove();
			window.location.href = "../portal/index.html";
		},
		archivePages: function(e,id){
			var id = e.target.getAttribute('data-key');
			var apiURL = '/api/';
			$.get(apiURL + "comp/" + id, function(data) {
				var name = data.name;
				var discription	= data.discription;
				var image = data.image;
				var html = data.html;
				if(e.target.id == "confirmArchive"){
					var state = false;
				} else if (e.target.id == "activated") {
					var state = true;
				}
					console.log();
					$.ajax({
						"async": true,
						"crossDomain": true,
						url: apiURL + 'comp/' + id,
						type: "PUT",
						data: {
							"name": name,
							"discription": discription,
							"image": image,
							"state": state,
							"html": html
						}
					}).done(function(argument) {
						window.location.href = "../portal/index.html";
					});
			});

		},
		openLightbox: function(e){
			$('.lightbox').css({
				opacity: 1,
				visibility: 'visible'
			})
			if (e.target.id == "new"){
				$('.projectCreateBox').css({display: 'block'});
			} else if (e.target.id == "archive"){
				$('.confirmPrompt').css({display: 'block'});
				var id = e.target.getAttribute('data-key');
				var name = e.target.getAttribute('data-name');
				$('.action__confirm').attr('id', 'confirmArchive');
				$('.action__confirm').attr('data-key', id);
				$('#confirmText').text('Are you sure you want to archive "' + name + '"?');
			} else if (e.target.id == "delete"){
				$('.confirmPrompt').css({display: 'block'});
				var id = e.target.getAttribute('data-key');
				var name = e.target.getAttribute('data-name');
				$('.action__confirm').attr('id', 'confirmDelete');
				$('.action__confirm').attr('data-key', id);
				$('#confirmText').text('Are you sure you want to delete "' + name + '"?');
			}
		},
		closeLightbox: function(){
			$('.lightbox').css({
				opacity: 0,
				visibility: 'hidden'
			})
			$('.confirmPrompt, .projectCreateBox').css({display: 'none'})
		}
	};
	Portal.init();
});
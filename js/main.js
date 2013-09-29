requirejs.config({
	baseUrl: 'js/modules',
	paths: {
		'domReady': '../domReady',
		'jquery': '../vendor/jquery-1.10.1.min',
		'jspdf': '../vendor/jspdf.min',
		'jspdfAddImage': '../vendor/jspdf.plugin.addimage',
		'blobBuilder':'../vendor/BlobBuilder',
		'fileSaver':'../vendor/FileSaver.min',
		'handlebars':'../vendor/handlebars',
		'pinch':'../vendor/pinch.min',
		'picker':'../vendor/pickadate/picker',
		'pickadate':'../vendor/pickadate/picker.date',
		'pickadate-legacy':'../vendor/pickadate/legacy'
	},
	shim: {
		'handlebars': {
			exports: 'Handlebars'
		},
		'picker': ['jquery', 'pickadate-legacy'],
		'pickadate': {
			deps: ['jquery', 'picker'],
			exports: 'DatePicker'
		},
		'jspdfAddImage': ['jspdf'],
	}
});

require(['domReady','app'], function (domReady, app) {
	
	domReady(function(){
		app._init();
	})

});
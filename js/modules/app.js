define(['contracts', 'controller', 'fileReader', 'pdfGenerator'], function(contracts, controller, fileReader, pdfg){

	app = new Object();

	app._init = function(){
		contracts._init(function(){
			//CALLBACKS
			controller._init();
			fileReader._init();
			pdfg._init();
		});
	}

	return app;
});
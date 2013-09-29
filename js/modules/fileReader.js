define(['jquery'], function($){

	fileReader = new Object();


	fileReader._init = function(){
		$uploader = $('#uploader');
		$uploadInit = $('#uploadInit');

		$uploadInit.on('click', function(){
			$uploader.trigger('click');
		})

		$uploader.change(function(){
			_loadImageFile();
		})

		oFReader = new FileReader(), rFilter = /^image\/(?:bmp|cis\-cod|gif|ief|jpeg|pipeg|png|svg\+xml|tiff|x\-cmu\-raster|x\-cmx|x\-icon|x\-portable\-anymap|x\-portable\-bitmap|x\-portable\-graymap|x\-portable\-pixmap|x\-rgb|x\-xbitmap|x\-xpixmap|x\-xwindowdump)$/i;
		
		oFReader.onload = function(oFREvent){
			fileReader._logo = (oFREvent.target.result);
			console.log(oFREvent)
			$uploadInit.addClass('valid').text('rad');
		}

		function _loadImageFile(){
			if (document.getElementById('uploader').files.length === 0){ return; }
			var oFile = document.getElementById('uploader').files[0];
			if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return}
			oFReader.readAsDataURL(oFile);			
		}
	}

	return fileReader;
});

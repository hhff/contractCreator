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
			oFReader.checkImage(fileReader._logo)
			$uploadInit.addClass('valid').text('rad');
		}

		function _loadImageFile(){
			if (document.getElementById('uploader').files.length === 0){ return; }
			var oFile = document.getElementById('uploader').files[0];
			if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return}
			oFReader.readAsDataURL(oFile);			
		}








		oFReader.checkImage = function(imgData){
	        'use strict'
	        var width, height;
	        // Verify we have a valid jpeg header 0xff,0xd8,0xff,0xe0,?,?,'J','F','I','F',0x00
	        if (!imgData.charCodeAt(0) === 0xff ||
	                !imgData.charCodeAt(1) === 0xd8 ||
	                !imgData.charCodeAt(2) === 0xff ||
	                !imgData.charCodeAt(3) === 0xe0 ||
	                !imgData.charCodeAt(6) === 'J'.charCodeAt(0) ||
	                !imgData.charCodeAt(7) === 'F'.charCodeAt(0) ||
	                !imgData.charCodeAt(8) === 'I'.charCodeAt(0) ||
	                !imgData.charCodeAt(9) === 'F'.charCodeAt(0) ||
	                !imgData.charCodeAt(10) === 0x00) {
	                        throw new Error('getJpegSize requires a binary jpeg file')
	        }
	        var blockLength = imgData.charCodeAt(4)*256 + imgData.charCodeAt(5);
	        var i = 4, len = imgData.length;
	        while ( i < len ) {
	                i += blockLength;
	                if (imgData.charCodeAt(i) !== 0xff) {
	                        throw new Error('getJpegSize could not find the size of the image');
	                }
	                if (imgData.charCodeAt(i+1) === 0xc0 || //(SOF) Huffman  - Baseline DCT
	                    imgData.charCodeAt(i+1) === 0xc1 || //(SOF) Huffman  - Extended sequential DCT 
	                    imgData.charCodeAt(i+1) === 0xc2 || // Progressive DCT (SOF2)
	                    imgData.charCodeAt(i+1) === 0xc3 || // Spatial (sequential) lossless (SOF3)
	                    imgData.charCodeAt(i+1) === 0xc4 || // Differential sequential DCT (SOF5)
	                    imgData.charCodeAt(i+1) === 0xc5 || // Differential progressive DCT (SOF6)
	                    imgData.charCodeAt(i+1) === 0xc6 || // Differential spatial (SOF7)
	                    imgData.charCodeAt(i+1) === 0xc7) {
	                        height = imgData.charCodeAt(i+5)*256 + imgData.charCodeAt(i+6);
	                        width = imgData.charCodeAt(i+7)*256 + imgData.charCodeAt(i+8);
	                        return [width, height];
	                } else {
	                        i += 2;
	                        blockLength = imgData.charCodeAt(i)*256 + imgData.charCodeAt(i+1)
	                }
	        }
		}




	}

	return fileReader;
});

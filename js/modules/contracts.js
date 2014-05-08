define(['jquery', 'handlebars', 'panelTemplate', 'navTemplate', 'data', 'pinch'], function($, handlebars, panelTemplate, navTemplate, data, pinch){

	contracts = new Object();

	var $templatesContainer = $('#templatesContainer'),
		$progressContainer = $('#progressContainer'),
		$inputs = $('.updater'),
		$clauseVars = $('.dataVar');

	contracts._init = function(callback){

		// BUILD AND INSERT HERE

		$templatesContainer.on('finishedPrepend', function(){
			callback();
			$inputs = $('.updater'),
			$clauseVars = $('.dataVar');
		})

		$templatesContainer.on('formChanged', function(event, form){
			contracts._update(form);
		})

		//SWITCH CONTRACTS ON HERE
		_insert($progressContainer, _build(_compile(navTemplate), data));
		_insert($templatesContainer, _build(_compile(panelTemplate), _microTemplater(data)));

		//CALL BACK SHOULD BE OPPOSITE TO ABOVE
		//callback();
	}

	contracts._update = function(form){
		var $me = $(form),
			myClass =
			myMatcher = $me.data('matcher'),
			myVal = $me.val(),
			myText = $clauseVars.filter('[data-matched="'+myMatcher+'"]');

			if(!myVal){
				myVal = $me.attr('placeholder');
			};

			myText.text(myVal);
	}

	_compile = function(t){
		var compiledTemplate = Handlebars.compile(t);
		return compiledTemplate;
	}

	_build = function(ct, d){
		builtHtml = ct(d);
		return builtHtml;
	}

	_insert = function(container, cHtml){
		container.prepend(cHtml);
		container.trigger('finishedPrepend');
	}

	_microTemplater = function(dataObj){

		//MICRO TEMPLATING ENGINE FOR CLAUSES

		for(var j=0; j<dataObj.clauses.length; j++){
			pinch(dataObj, 'clauses['+j+'].clause', function(path, key, value){
				var newValue = value,
					varArray = value.match(/\[\[.*?\]\]/ig),
					varArrayNoBrackets = [];

				if (varArray){
					for(var i=0; i < varArray.length; i++){
						varArrayNoBrackets[i] = varArray[i].replace(/\[\[/g, '');
						varArrayNoBrackets[i] = varArrayNoBrackets[i].replace(/\]\]/g, '');

						newValue = newValue.replace(varArray[i], '</h2><h2 class="dataVar" data-matched="'+varArrayNoBrackets[i]+'">'+dataObj.clauses[j].vars[varArrayNoBrackets[i]].value+'</h2><h2>');
					}
				}

				return(newValue);
			});
		}

		//MICRO TEMPLATING ENGINE FOR TRANSLATIONS

		for(var j=0; j<dataObj.clauses.length; j++){
			pinch(dataObj, 'clauses['+j+'].translation', function(path, key, value){
				var newValue = value,
					varArray = value.match(/\[\[.*?\]\]/ig),
					varArrayNoBrackets = [];

				if (varArray){
					for(var i=0; i < varArray.length; i++){
						varArrayNoBrackets[i] = varArray[i].replace(/\[\[/g, '');
						varArrayNoBrackets[i] = varArrayNoBrackets[i].replace(/\]\]/g, '');

						newValue = newValue.replace(varArray[i], '</h2><h2 class="dataVar" data-matched="'+varArrayNoBrackets[i]+'">'+dataObj.clauses[j].vars[varArrayNoBrackets[i]].value+'</h2><h2>');
					}
				}

				return(newValue);
			});
		}

		return dataObj;
	}

	return contracts;
});
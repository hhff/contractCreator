define(['jquery', 'pickadate'], function($, pickadate){

	controller = new Object();

	var $nextButton = $('.nextButton'),
		$container = $('#container'),
		$backButton = $('.backButton'),
		$navContainer = $('#navButtons'),
		$progress = $('#progress'),
		$beginButton = $('.beginButton'),
		$moreInfo = $('.moreInfo'),
		$overlay = $('#overlay'),
		$templatesContainer = $('#templatesContainer'),
		$progressContainer = $('#progressContainer');

	controller._init = function(){
		$indicators = $('.indicator');
		$panels = $('.panel');

		//SETUP NAV CLICKS
		$beginButton.on('click', function(){
			controller._begin();
			controller._validateIndicators($indicators, $panels);
		})

		$moreInfo.on('click', function(){
			controller._toggleOverlay();
		})

		$overlay.on('click', function(){
			controller._toggleOverlay();
		})

		$nextButton.on('click', function(){
			controller._nextPanel($panels);
			controller._validateIndicators($indicators, $panels);
		})

		$backButton.on('click', function(){
			controller._backPanel();
			controller._validateIndicators($indicators, $panels);
		})

		//SETUP PROGRESS BAR NAVIGATIONS

		$indicators.on('click', function(){
			$me = $(this);
			$indicators.removeClass('active');
			$me.addClass('active');
			$panels.removeClass('active');
			$panels.filter('#'+$me.attr('id')).addClass('active');
			currentPanel = ($panels.filter('.active').index()+1);

			$container.data('currentPanel', currentPanel);

			controller._validateIndicators($indicators, $panels);
		})

		//PANEL VALIDATIONS HERE

		//CLAUSE SWITCH LOGIC HERE

		//SETUPS
		$('.clauseSwitch').each(function(){
			$me = $(this);
			if($me.hasClass('disabled')){
				$me.text('Disabled')
				$me.parents('.panel').addClass('disabled');
			}else{
				$me.text('Enabled')
				$me.parents('.panel').removeClass('disabled');
			}
		})

		//BINDINGS
		$('.clauseSwitch').on('click', function(){
			$me = $(this);
			$me.toggleClass('disabled');
			if($me.hasClass('disabled')){
				$me.text('Disabled')
				$me.parents('.panel').addClass('disabled');
			}else{
				$me.text('Enabled')
				$me.parents('.panel').removeClass('disabled');
			}
		})

		//CLAUSE SWITCH LOGIC OVER

		//CHANGE TEXT FIELDS CLAUSES
		$updater = $('.updater');
		$updater.keyup(function(){
			$me = $(this);
			$templatesContainer.trigger('formChanged', $me);

			//VALIDATION LOGIC


			if(!$me.val() == ''){
				$me.removeClass('invalid');
				$me.addClass('valid');
			}else{
				$me.removeClass('valid');
				$me.addClass('invalid');				
			}

			controller._validatePanels($panels);
			controller._validateIndicators($indicators, $panels);


			//NONE
		})

		//CHANGE DATE FIELDS CLAUSES & DROPDOWNS CHANGER
		$updater.change(function(){
			$me = $(this);
			if($me.hasClass('dateField') || $me.hasClass('dropdown')){
				$templatesContainer.trigger('formChanged', $me);
			}

			//VALIDATION LOGIC
			if(!$me.val() == ''){
				$me.removeClass('invalid');
				$me.addClass('valid');
			}else{
				$me.removeClass('valid');
				$me.addClass('invalid');				
			}

			controller._validatePanels($panels);
			controller._validateIndicators($indicators, $panels);
			//END
		})



		//DROPDOWNS LOGIC HERE
		$updater.focus(function(){
			$me = $(this);
			myKey = $me.data('matcher');
			if($me.hasClass('dropdown')){
				$me.prop('disabled', true);
				$('.options').filter('[data-matcher="'+myKey+'"]').toggleClass('active').children().toggleClass('active');
			}

			//VALIDATION LOGIC HERE 
			if ($me.val() == '' && !$me.hasClass('invalid') ){
				$me.addClass('invalid');
			}
			//VALIDATION LOGIC OVER
		})


		// $updater.blur(function(){
		// 	$me = $(this);
		// 	if($me.hasClass('dropdown')){
		// 		$me.prop('disabled', false);
		// 		$('.options').filter('[data-matcher="'+myKey+'"]').toggleClass('active');
		// 	}
		// })

		$('.option').on('click', function(){
			$me = $(this);
			myKey = $me.data('matcher');
			$myForm = $updater.filter('[data-matcher="'+myKey+'"]');
			$myForm.val($me.text());
			$myForm.change();
			$me.next().toggleClass('active');
			$myForm.prop('disabled', false);
		})

		//END DROPDOWNS LOGIC


		//SETUP ALL DATE FIELDS
		$('.dateField').pickadate({
			container: '#container'
		});

		//HAVENT USED YET
		$container.data('currentPanel', 0);

		//SETUP ALL ACTIVE ELEMENTS ON PAGE LOAD
		$templatesContainer.children(':first').toggleClass('active');
		$progressContainer.children(':first').toggleClass('active');

	}

	controller._begin = function(){
		currentPanel = $container.data('currentPanel');
		currentPanel ++;
		$container.css({
			right:200+'%'
		})
		$container.data('currentPanel', currentPanel)
		controller._toggleNavButtons();
	}

	controller._nextPanel = function($panels){
		var currentPanel = $container.data('currentPanel'),
			$activePanel = $('.panel.active'),
			$activeIndicator = $('.indicator.active');

		if ($activePanel.next().hasClass('endCard')){

			// if ($panels.hasClass('invalid')){
			// 	controller._pulseInvalids();
			// }else{
			// 	$nextButton.removeClass('active');
			// 	$activePanel.removeClass('active');
			// 	$activePanel.next().addClass('active');
			// 	$progress.toggleClass('active');
			// }


			//Delete this block and Uncomment above for production
			$nextButton.removeClass('active');
			$activePanel.removeClass('active');
			$activePanel.next().addClass('active');
			$progress.toggleClass('active');



		}else{
			$activePanel.removeClass('active');
			$activeIndicator.removeClass('active');
			$activePanel.next().addClass('active');
			$activeIndicator.next().addClass('active');			
		}

		currentPanel ++;
		$container.data('currentPanel', currentPanel);
	}

	controller._backPanel = function(){
		var currentPanel = $container.data('currentPanel'),
			$activePanel = $('.panel.active'),
			$activeIndicator = $('.indicator.active');

		//check if 1
		if (currentPanel > 1){
			$activePanel.removeClass('active');
			$activePanel.prev().addClass('active');

			if($activePanel.hasClass('endCard')){
				$nextButton.addClass('active');
				$progress.toggleClass('active');
			}else{
				$activeIndicator.removeClass('active');
				$activeIndicator.prev().addClass('active');
			}

		}else{
			$container.css({
				right:currentPanel*0+'%'
			})
			controller._toggleNavButtons();
		}

		currentPanel --;
		$container.data('currentPanel', currentPanel)
	}

	controller._toggleNavButtons = function(){
		$navContainer.toggleClass('active');
		$progress.toggleClass('active');
	}

	controller._validatePanels = function(panels){
		$activePanel = panels.filter('.active');
		$activeForms = $activePanel.find('.updater');
		$validForms = $activePanel.find('.updater.valid');

		if($activeForms.length == $validForms.length){
			$activePanel.addClass('valid');
			$activePanel.removeClass('invalid');
		}else{
			$activePanel.addClass('invalid');
			$activePanel.removeClass('valid');
		}
	}

	controller._toggleOverlay = function(context){
		$container.toggleClass('overlayActive');
	}

	controller._validateIndicators = function(indicators, panels){
		$activePanel = panels.filter('.active');
		myKey = $activePanel.attr('id');

		if($activePanel.hasClass('valid')){
			indicators.filter('#'+myKey).removeClass('invalid').addClass('valid');
		}else{
			indicators.filter('#'+myKey).removeClass('valid').addClass('invalid');
		}
	}

	controller._pulseInvalids = function(){
		$indicators = $('.indicator');

		$invalids = $indicators.filter('.invalid');

		$invalids.addClass('red');

		window.setTimeout(function(){
			$invalids.removeClass('red')
		}, 400);

	}

	return controller;
});

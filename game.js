var bossDeck = [], bimboDeck = [], effortDeck = [], effortDiscard = [], hand = [], workDeck = [] , workDiscard = [], workActive = [];
var title = 'Administrative Assistant';
var willpower = 30;
var maxWillpower = 32;
var progress = 0;
var level = 0; /*0, 1, 2, 3=final boss*/
var templevel =0;
var progBase = [0,33,66,100];
var levelEffort = 30;
var challenge = 0;
var totalEffort = 0;
var sacrifice = 0;
var drawsLeft = 0;
var changes = {hairstyle:0,haircolor:0,hips:0,bot:0,shoes:0,top:0,boobs:0,nails:0,jewelry:0,makeup:0,lips:0,face:0,height:300,heels:0,sumaho:0}
var willLoss = 0;
var thisChange = '';
var cardSel = 0; //number of cards thatcan be selected in popup
var totalSelected = 0;
var drawcost = 1;
var bonus = 0;
var bimboDraws = 0;
var introstep = 0;
	
$(function() {
bimboDeck =  initilizeBimboDeck(false);
effortDeck = initilizeStartDeck();
workDeck = initilizeWorkDeck();
bossDeck = initilizeBossDeck();

showCharScreen()
showMenu()

	
/**********************************************/
/************Menu, tutorial, intro*************/
/**********************************************/


function showMenu() {
	$('#story').html('<div id="menuWrap"><img src="resources/img/ui/logo-2.png" alt="Logo"><div id="startWrap">New Game<div id="starts"><div id="easy">Easy (30 willpower)</div><div id="medium">Medium (25 willpower)</div><div id="hard">Hard (20 willpower, +1 bimbo card)</div><div id="sandbox">Sandbox (999 willpower)</div></div></div><div id="tutbutton">How to Play</div><br><a id="desiLink" href="https://desidee.itch.io/" target="_blank">More games from DesiDee</a></div>').fadeIn();
}

function easyMode() {
	willpower = 30;
	maxWillpower = 32;
	showCharScreen()
	$('#story').fadeOut();
	showIntro()
}
function medMode() {
	willpower = 25;
	maxWillpower = 27;
	showCharScreen()
	$('#story').fadeOut();
	showIntro()
}
function hardMode() {
	willpower = 20;
	maxWillpower = 22;
	bimboDeck = initilizeBimboDeck(true);
	showCharScreen()
	$('#story').fadeOut();
	showIntro()
}
function sandboxMode() {
	willpower = 999;
	maxWillpower = 999;
	showCharScreen()
	$('#story').fadeOut();
	showIntro()
}

function tutorial() {
	$('#tutorial').fadeIn();
}
	
function closeTutorial() {
	$('#tutorial').fadeOut();
}
	
function showIntro() {
	var html = '<div id="letterAvatar"><img id="hairstyleBack" src="resources/img/mc/hair/' + changes.hairstyle + '/back/' + changes.haircolor + '.png" /><img id="shoes" src="resources/img/mc/bot/' + changes.bot + '/shoes/' + changes.shoes + '.png" /><img id="bot" src="resources/img/mc/bot/' + changes.bot + '/' + changes.hips + '.png" /><img id="top" src="resources/img/mc/top/' + changes.top + '/' + changes.boobs + '.png" /><img id="nails" src="resources/img/mc/top/' + changes.top + '/nails/' + changes.nails + '.png" /><img id="head" src="resources/img/mc/head.png" /><img id="makeup" src="resources/img/mc/makeup/' + changes.makeup + '/makeup.png" /><img id="face" src="resources/img/mc/face/' + changes.face + '.png" />';
	if (changes.face > 1) {
	html += '<img id="makeupLips" src="resources/img/mc/makeup/' + changes.makeup + '/lips/' + changes.lips + '.png" /><img id="lips" src="resources/img/mc/face/lips/' + changes.lips + '.png" />';	}
	html += '<img id="hairstyle" src="resources/img/mc/hair/' + changes.hairstyle + '/' + changes.haircolor + '.png" /><img id="jewelry" src="resources/img/mc/top/' + changes.top + '/jewelry/' + changes.jewelry + '.png" /><img id="sumaho" src="resources/img/mc/sumaho/' + changes.sumaho + '.png" /></div>'
	$('.letter .intropic .introcrop').html(html)
	$('#intro').fadeIn(1500);
}

function closeIntro() {
	$('#intro').fadeOut();
	$('#wrap').fadeIn();
}
	
function nextIntro() {
	switch (introstep) {
		case 0:
			$('#introA').fadeIn();
			introstep++
		break;
		case 1:
			$('#commentA').fadeIn();
			introstep += 2
		break;
		case 2:
			/*$('#commentB').fadeIn();*/
			introstep++
		break;
		case 3:
			$('#introB').fadeIn();
			introstep++
		break;
		case 4:
			$('#commentC').fadeIn();
			introstep++
		break;
		case 5:
			$('#introC').fadeIn();
			$('#clicktoseemore').fadeOut();
			introstep++
		break;
		case 6:
			$('#commentD').fadeIn();
			introstep++
		break;
	}
}
	
/*****************************/
/********Interactions*********/
/*****************************/

/*Char Screen Buttons*/
$('#wrap').on('click', '#rank, #effortLeft, #willLeft, #progressbarWrap', showCharInfo);
$('#wrap').on('click', '.batsu', hideCharInfo);
$('#wrap').on('click', '#bossBtn', showBosses);
$('#wrap').on('click', '#gettoworkBtn', showHazardChoice);
$('#wrap').on('click', '#ReviewBtn', reviewChoice);

/* Game Buttons */
$('#wrap').on('click', '.hazardFlip, .effortFlip', hazardCardFlip);
$('#wrap').on('click', '#drawBTN', draw);
$('#wrap').on('click', '#stopBTN', stop);
$('#wrap').on('click', '#allCardsBTN', showHand);
$('#wrap').on('click', '#allUsedBTN', showDiscards);
	
/*Card Specials*/
$('#wrap, #overlay').on('click', '[data-key="willpower1"]', willpower1);
$('#wrap, #overlay').on('click', '[data-key="willpower2"]', willpower2);
$('#wrap, #overlay').on('click', '[data-key="card1"]', card1);
$('#wrap, #overlay').on('click', '[data-key="card2"]', card2);
$('#wrap, #overlay').on('click', '[data-key="belowpile"]', belowpile);
$('#wrap, #overlay').on('click', '[data-key="copy"]', copy);
$('#wrap, #overlay').on('click', '[data-key="destroy"]', destroy);
$('#wrap, #overlay').on('click', '[data-key="double"]', double);
$('#wrap, #overlay').on('click', '[data-key="exchange1"]', exchange1);
$('#wrap, #overlay').on('click', '[data-key="exchange2"]', exchange2);
$('#wrap, #overlay').on('click', '[data-key="phase"]', phase);
$('#wrap, #overlay').on('click', '[data-key="sort"]', sort);
$('#wrap, #overlay').on('click', '.sortDiscard', selectDiscard);
$('#wrap, #overlay').on('click', '.sortFirst', selectFirst);
$('#wrap, #overlay').on('click', '.sortSecond', selectSecond);
$('#wrap, #overlay').on('click', '#clearSelection', selectClear);

/* Overlay Buttons */
$('#overlay').on('click', '#ichiranCloseBTN, .overlayBatsu', closeOverlay);
$('#overlay').on('click', '.hazardFlip, .effortFlip', cardFlip);
$('#overlay').on('click', '#ichiran.selectable > .overlayCardInner', cardSelect);
$('#overlay').on('click', '#ichiranConfirmBTN', confirmSelect);
$('#overlay').on('click', '#reviewConfirmBTN', confirmReview);
$('#overlay').on('click', '#ichiranFinishBTN', finishRound);
$('#overlay').on('click', '#ichiranCloseBTN', closeOverlay);
$('#overlay').on('click', '#ichiran.destroyable > .destroyable', destroySelect);
$('#overlay').on('click', '#ichiranDestroyBTN', destroyConfirm);
$('#overlay').on('click', '#ichiran.selectable > .selectable', selectSelect);

/*Popup*/
$('body').on('click', '#popup, #popupClose', closePopup);
$('body').on('click', '#gameover', showLoseLetter);
$('body').on('click', '#bossWin', showWin);

/*Tutorial*/
$('#tutorial').on('click', '.overlayBatsu, #tutCloseBTN', closeTutorial);

/*Intro*/
$('#intro').on('click', '.overlayBatsu, #introCloseBTN', closeIntro);
$('#intro').on('click', '.letter', nextIntro);
$('#intro').on('click', '#restart', restart);

/*Menu*/
$('#story').on('click', '#easy', easyMode);
$('#story').on('click', '#medium', medMode);
$('#story').on('click', '#hard', hardMode);
$('#story').on('click', '#sandbox', sandboxMode);
$('#story').on('click', '#tutbutton', tutorial);
});

/*****************************/
/********  General  **********/
/*****************************/
function closeOverlay() {
	$('#overlay').fadeOut();
}

function closePopup() {
	$('#popup').fadeOut();
	$('#messagebar').html('<h1></h1><h3></h3><div class="ichiranBTN ichiranSub"id="popupClose">Ok</div></div>');
}

function cardFlip(event) {
	event.stopPropagation();
	var parentwrap = $(this).closest('.overlayCardInner');
	if( $(parentwrap).hasClass('flipped') ) {
		$(parentwrap).removeClass('flipped');
	} else {
		$(parentwrap).addClass('flipped');
	}
}

function hazardCardFlip(event) {
	event.stopPropagation();
	var parentwrap = $(this).closest('#hazardCardWrap');
	if( $(parentwrap).hasClass('flipped') ) {
		$(parentwrap).removeClass('flipped');
	} else {
		$(parentwrap).addClass('flipped');
	}
}

function selectSelect(){
	if ( $(this).hasClass('selected') ) {
		$(this).removeClass('selected')
	} else {
		if ($('#ichiran.selectable .card.selectable.selected').length < cardSel) {
		$(this).addClass('selected');
		} else {
			$(this).addClass('shake');
			$(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
				$(this).removeClass('shake');
			});
		}
	}
	if ($('#ichiran.selectable .card.selectable.selected').length > 0) {
		$('.ichiranBTN.confirm').removeClass('disabled');
	} else {
		$('.ichiranBTN.confirm').addClass('disabled');
	}
}

function destroySelect(){
	
	if ( $(this).hasClass('selected') ) {
		$(this).removeClass('selected')
		totalSelected -= parseInt($(this).data("burn"));
	} else {
		if (totalSelected < cardSel) {
		$(this).addClass('selected');
		totalSelected += parseInt($(this).data("burn"));
		} else {
			$(this).addClass('shake');
			$(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
				$(this).removeClass('shake');
			});
		}
	}
	if ($('#ichiran.destroyable .card.destroyable.selected').length > 0) {
		$('.ichiranBTN.confirm').removeClass('disabled');
	} else {
		$('.ichiranBTN.confirm').addClass('disabled');
	}
}

function restart() {
	location.reload();
}

/*****************************/
/********Char Screen**********/
/*****************************/
function showCharInfo() {
	if($(this).hasClass('bumped')){
		hideCharInfo(this);
	} else {
		$('.bumped').removeClass('bumped');
		$(this).addClass('bumped');
		$('#charInfoTxt span').html( $(this).data('info') );
		$('#charInfo').addClass('on');
	}
}

function hideCharInfo() {
	$('.bumped').removeClass('bumped');
	$('#charInfo').removeClass('on');
}

function finishRound() {
	//move hand to discarded
	for (let i = 0; i < hand.length; i++) {
		if(hand[i].id == 'E034' || hand[i].id == 'E034') {
			hand[i].specialTitle = 'Copy';
			hand[i].specialText = 'Copy the ability of another card';
			hand[i].specialKey = 'copy';
		}		
		effortDiscard.push(hand[i])
	}
	//cleanup temp values in effort and discard
	effortDeck.forEach(function(item) {
		item.tempEffort = item.effort
		item.specialUsed = false
		if (item.id == "E034" || item.id == "E035") {
			item.specialKey = "copy"
			item.specialTitle = "Copy"
			item.specialText = "Copy the ability of another card"
		}
	});
	effortDiscard.forEach(function(item) {
		item.tempEffort = item.effort
		item.specialUsed = false
		if (item.id == "E034" || item.id == "E035") {
			item.specialKey = "copy"
			item.specialTitle = "Copy"
			item.specialText = "Copy the ability of another card"
		}
	});
	hand = [];
	workActive = [];
	willpower = willpower + willLoss;
	showCharScreen();
	templevel = level;
	$('section#overlay').fadeOut();
	if (level > 3 && willpower > 0) {showWin()}
	if (willpower < 1) {showLose()}
}

function showWin() {
	var html = workActive[0].endtext;
	$('.letter').html(html);
	$('.letter').css("font-size","16px");
	$('#intro').fadeIn(1500);
	$('#restart').show().css("display","flex");
	$('.overlayBatsu').hide();
	$('#introCloseBTN').hide();
}

function showLose(cardloss) {
	$('#messagebar h1').text('Game Over');
	if (cardloss === true) {$('#messagebar h3').text('You ran out of cards!');}
	else {$('#messagebar h3').text('Your willpower has reached zero!');}
	$('#popupClose').hide();
	$('#messagebar').append('<div class="ichiranBTN ichiranSub" id="gameover">Next</div>');
	$('#popup').fadeIn();
}
	
function showLoseLetter() {
	$('#popup').fadeOut();
	$('#messagebar').html('<h1></h1><h3></h3><div class="ichiranBTN ichiranSub"id="popupClose">Ok</div></div>');
	var html = '<div class="intropic"><div class="introcrop"><img class="endpic" src="resources/img/cards/lose.jpg"></div></div><p>To all employees,</p><p>Unfortunately, we regret to inform you that our newest intern in the secretary program was unable to successfully complete the course.</p><p>While her body took readily to all improvements, she lacked the willpower to succeed in administrative assistant tasks.</p><p>As with other unsuccessful candidates, she has been remanded to R&amp;D for further testing.</p><p>We will be unable to provide further updates on her progress.</p><p>Management</p><p style="font-weight:bold;">Game over: You lose</p>'
	$('.letter').html(html);
	$('.letter').css("font-size","16px");
	$('#intro').fadeIn(1500);
	$('#restart').show().css("display","flex");
	$('.overlayBatsu').hide();
	$('#introCloseBTN').hide();
	$( "#intro" ).scrollTop();
}

function showHand() {
	var html = '<h1>Hand</h1><div class="overlayBatsu">&#215;</div><div id="ichiran" class="">';
	hand.forEach(function(item) {
		html += '<div class="card destroyable" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.tempEffort + '</span>Effort</div><h3>' + item.title;
		if(item.willpower == 2) {html += '<span class="power-used">☑Used</span>';}
		else {
		if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
		if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
		}
		html += '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
		if(item.willpower == 1) {
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'a" type="checkbox" class="showSpecial"><label for="' + item.id + 'a" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
			if (item.specialUsed == false) { html += '<div class="specialButton" data-key="' + item.specialKey + '">Use</div>'; }
			else {	html += '<div class="specialButton disabled">Used</div>'; }
					html += '</div></div>';
			}}
		html += '</div>';
	});
	html += '<div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Close</div>';
	$('section#overlay').html(html).fadeIn();
}

function showDiscards() {
	var html = '<h1>Discarded</h1><div class="overlayBatsu">&#215;</div><div id="ichiran" class="">';
	effortDiscard.forEach(function(item) {
		html += '<div class="card destroyable" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.tempEffort + '</span>Effort</div><h3>' + item.title + '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'b" type="checkbox" class="showSpecial"><label for="' + item.id + 'b" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
				html += '</div></div>';
			}	
		html += '</div>';
	});
	html += '<div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Close</div>';
	$('section#overlay').html(html).fadeIn();
}

function showCharScreen() {
	//calculate progress bar
	var bar = 0
	bar = ((workDiscard.length/levelEffort)*33)+progBase[level]
	if (bar > 100) {
		bar = 100;
	}
	
	
	//Character Screen
	var html = '<section id="charScreen"><div id="charAvatar" style="top:' + changes.heels + 'px;"><img id="hairstyleBack" src="resources/img/mc/dot.png" /><img id="shoes" src="resources/img/mc/dot.png" /><img id="bot" src="resources/img/mc/dot.png" /><img id="top" src="resources/img/mc/dot.png" /><img id="nails" src="resources/img/mc/dot.png" /><img id="head" src="resources/img/mc/dot.png" /><img id="makeup" src="resources/img/mc/dot.png" /><img id="face" src="resources/img/mc/dot.png" /><img id="makeupLips" src="resources/img/mc/dot.png" /><img id="lips" src="resources/img/mc/dot.png" /><img id="hairstyle" src="resources/img/mc/dot.png" /><img id="jewelry" src="resources/img/mc/dot.png" /><img id="sumaho" src="resources/img/mc/dot.png" /></div><div id="charMain"><div id="leftStats"><div id="rank" data-info="Your current position in the company.">Title<span id="rankTxt">' + title + '</span></div><div id="effortLeft" data-info="Cards left in your &#8220;Effort Deck&#8221;. Use these cards to complete tasks. When your deck reaches zero, it will refresh but with a &#8220;Bimbo Card&#8221; added. Try and be efficient!">Effort Deck<span id="effortLeftTxt">' + effortDeck.length + '</span></div><div id="willLeft" data-info="The willpower you have to keep going. If this reaches zero, it&#8217;s game over!">Willpower<span id="willpowerLeftTxt">' + willpower + '</span></div></div><div id="charInfo"><div id="charInfoTxt"><div class="batsu">&#215;</div><span>Here is some placeholder text!</span></div></div><div id="progressbarWrap" data-info="When the &#8220;Work Deck&#8221; reaches zero, you&#8217;re promoted! Currently ' + workDeck.length + ' cards left (each round uses two). In the final round, face one of two BOSSES. Click the &#8220;Supervisors&#8221; button below to see your bosses">Progress - <span id="workLeft">' + workDeck.length + '</span> cards until level up<div id="progressbarOuter"><div id="progressbarInner" style="width:' + bar + '%;"></div><div id="level1"></div><div id="level2"></div></div></div><div id="bossBtn">Supervisors</div>';
	if (level === 3) {
		html += '<div id="ReviewBtn">Performance Review!</div></div></section>'
	} else {
		html += '<div id="gettoworkBtn">Get to work!</div></div></section>'
	}
	$('#wrap').html(html);
	thisChange = '';
	updateAvatar();
	
	//level up
	if ( workDeck.length < 1 ) {
		levelUp();
	}
}

function levelUp() {
	closeOverlay()
	level++
    switch (level) {
		case 0:	title = 'Administrative Assistant';
				$('#messagebar h3').text('Congratulations! You’ve been promoted to Administrative Assistant! Your duties will reflect your new status.');
		break;
		case 1: title = 'Office Assistant';
				$('#messagebar h3').text('Congratulations! You’ve been promoted to Office Assistant! Your duties will reflect your new status.');
		break;
		case 2: title = 'Office Secretary';
				$('#messagebar h3').text('Congratulations! You’ve been promoted to Office Secretary! Your duties will reflect your new status.');
		break;
		case 3: title = 'Secretary';
				$('#messagebar h3').text('Congratulations! You’ve been promoted to Office Assistant! Time for your performance review! I hope you’re ready!');
		break;
    }

	
 
	//push work discards into active deck
    for(var i=0; i<workDiscard.length; i++) {
        workDeck.push(workDiscard[i]);
    }
    workDeck.flat(Infinity);
    workDiscard = []
	levelEffort = workDeck.length;
	
	shuffleArray(workDeck);

    $('#messagebar h1').text('Level up!');
    $('#popup').fadeIn();

    showCharScreen();
}

function showBosses() {
	var html = '<h1>Supervisors</h1><h2>Your final performance review will be against one of these two bosses.</h2><div class="overlayBatsu">&#215;</div><div id="ichiran" class="">';
	bossDeck.forEach(function(item) {
	html += '<div class="overlayCardInner"><div class="hazardCard" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><h1>' + item.title + '</h1><div class="hazardDraw">Draw<span id="hazardDrawVal">' + item.draw + '</span></div><div class="hazardChallenge">Challenge<span id="hazardChallengeVal">' + item.challenge + '</span></div>';
	if (item.specialText != '') {
		html += '<div class="hazardFlavor">' + item.specialText + '</div>';
	}
	html += '</div></div>';
	});
	html += '<div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Close</div>';
	$('section#overlay').html(html).fadeIn();
}

function reviewChoice() {
	var html = '<h1>Choose Supervisor</h1><h2>Your final performance review will be against one of these two bosses.</h2><div class="overlayBatsu">&#215;</div><div id="ichiran" class="selectable">';
	bossDeck.forEach(function(item) {
	html += '<div class="overlayCardInner"><div class="hazardCard" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><h1>' + item.title + '</h1><div class="hazardDraw">Draw<span id="hazardDrawVal">' + item.draw + '</span></div><div class="hazardChallenge">Challenge<span id="hazardChallengeVal">' + item.challenge + '</span></div>';
	if (item.specialText != '') {
		html += '<div class="hazardFlavor">' + item.specialText + '</div>';
	}
	html += '</div></div>';
	});
	html += '</div><div id="reviewConfirmBTN" class="ichiranBTN disabled">Confirm</div>';
	html += '<div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Close</div>';
	$('section#overlay').html(html).fadeIn();
}

function confirmReview() {
	if ( $('.overlayCardInner.selected').index() == 0 ) {
		workActive.push(bossDeck[0]);
	} else {
		workActive.push(bossDeck[1]);
	}
	challenge = workActive[0].challenge;
	drawsLeft = workActive[0].draw;
	sacrifice = 0;
	totalEffort = 0;
	
	switch (workActive[0].id) {
		case 'LB002':
			bonus = 1;
			break;
		case 'LB004':
			drawcost = 2;
			break;
		case 'LB006':
			challenge = bimboDraws * 2;
			break;
	}
	
	effortDeck.forEach(function(item) {
		item.tempEffort = item.effort;
		item.specialUsed = false;
	});
	
	var html = '<section id="gameScreen"><div id="ColCard"><div id="cardWrap"><h2>Cards</h2><div id="cardArrow"></div><div id="cardList"></div><div id="allCardsBTN">See All Cards In Hand</div><div id="allUsedBTN">See Used/Discards</div></div></div><div id="ColChallenge">	<div id="hazardCardWrap"><div class="hazardCard" style="background:url(resources/img/cards/' + workActive[0].img + '.jpg) no-repeat center center;"><h1>' + workActive[0].title + '</h1><div class="hazardDraw">Draw<span class="hazardDrawVal">' + workActive[0].draw + '</span></div><div class="hazardChallenge">Challenge<span class="hazardChallengeVal">' + challenge + '</span></div>';
	if (workActive[0].specialText != '') {
		html += '<div class="hazardFlavor">' + workActive[0].specialText + '</div>';
	}
	html += '</div></div><div id="hazardStats"><div id="totalEffort"><span class="statlabel">Total Effort</span><span class="statval">0</span></div><div id="challenge"><span class="statlabel">Challenge</span><span class="statval">' + challenge + '</span></div><div id="sacrifice"><span class="statlabel">Will Loss</span><span class="statval">-' + challenge + '</span></div></div><div id="selectAction">Select Action</div><div id="mainBTNs"><div id="drawBTN">Draw<span>Free Draws: <span id="remainingDraws">' + drawsLeft + '</span></span><span id="drawWarning">Extra draws: <span id="extradraws">' + sacrifice + '</span> (-1<img src="resources/img/ui/will.svg" /> each)</span></div><div id="stopBTN">Stop<span>Face Challenge</span></div></div><div id="cardsRemainingWrap">Cards remaining in effort deck: <span id="cardsRemaining">' + effortDeck.length + '</span></div></div><div id="ColChar"><div id="avatar" style="width:' + changes.height + 'px;top:' + changes.heels + 'px;"><img id="hairstyleBack" src="resources/img/mc/dot.png" /><img id="shoes" src="resources/img/mc/dot.png" /><img id="bot" src="resources/img/mc/dot.png" /><img id="top" src="resources/img/mc/dot.png" /><img id="nails" src="resources/img/mc/dot.png" /><img id="head" src="resources/img/mc/dot.png" /><img id="makeup" src="resources/img/mc/dot.png" /><img id="face" src="resources/img/mc/dot.png" /><img id="makeupLips" src="resources/img/mc/dot.png" /><img id="lips" src="resources/img/mc/dot.png" /><img id="hairstyle" src="resources/img/mc/dot.png" /><img id="jewelry" src="resources/img/mc/dot.png" /><img id="sumaho" src="resources/img/mc/dot.png" /></div><div id="will">Willpower<span class="willVal">' + willpower + '</span></div></div></section>';
	$('#wrap').html(html);
	updateAvatar()	
	$('section#overlay').fadeOut();
}

function showHazardChoice() {
	var html = '<h1>Choose task</h1>';
	if (workDeck.length === 1) {
		html += '<h2>You have only one task available, you may work this task or level up now.</h2><div id="ichiran" class="selectable">';
	} else {
		html += '<h2>Choose your task for work. Flip to see the reward for completing the task.</h2><div id="ichiran" class="selectable">';
	}
	html += '<div class="overlayCardInner"><div class="hazardCard" style="background:url(resources/img/cards/' + workDeck[0].hazard[level].img + '.jpg) no-repeat center center;"><h1>' + workDeck[0].hazard[level].title + '</h1><div class="hazardDraw">Draw<span id="hazardDrawVal">' + workDeck[0].hazard[level].draw + '</span></div><div class="hazardChallenge">Challenge<span id="hazardChallengeVal">' + workDeck[0].hazard[templevel].challenge + '</span></div><div class="hazardFlavor">' + workDeck[0].hazard[level].text + '</div><div class="hazardFlip">Flip</div></div><div class="card" style="background:url(resources/img/cards/' + workDeck[0].reward.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + workDeck[0].reward.effort + '</span>Effort</div><h3>' + workDeck[0].reward.title + '</h3><div class="cardBurn">';
	if( workDeck[0].reward.willpower == 1) { html += '<div></div>' }
	else { html += '<div></div><div></div>' }
	html += '</div></div><div class="cardFlavor">' + workDeck[0].reward.text + '</div><div class="cardChange" style="background:url(resources/img/cards/change/' + workDeck[0].reward.change + '.png) no-repeat center center;">' + workDeck[0].reward.change + '</div><div class="effortFlip">Flip</div>';
	if (!workDeck[0].reward.specialKey == '') { html += '<div class="cardSpecial"><input id="' + workDeck[0].reward.id + 'c" type="checkbox" class="showSpecial"><label for ="' + workDeck[0].reward.id + 'c" class="cardSpecialTitle"><span>' + workDeck[0].reward.specialTitle + '</span></label><div class="cardSpecialText">' + workDeck[0].reward.specialText + '</div></div>' }
	html += '</div></div>';
	if (workDeck.length !== 1) {
		html += '<div class="overlayCardInner"><div class="hazardCard" style="background:url(resources/img/cards/' + workDeck[1].hazard[level].img + '.jpg) no-repeat center center;"><h1>' + workDeck[1].hazard[level].title + '</h1><div class="hazardDraw">Draw<span id="hazardDrawVal">' + workDeck[1].hazard[level].draw + '</span></div><div class="hazardChallenge">Challenge<span id="hazardChallengeVal">' + workDeck[1].hazard[templevel].challenge + '</span></div><div class="hazardFlavor">' + workDeck[1].hazard[level].text + '</div><div class="hazardFlip">Flip</div></div><div class="card" style="background:url(resources/img/cards/' + workDeck[1].reward.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + workDeck[1].reward.effort + '</span>Effort</div><h3>' + workDeck[1].reward.title + '</h3><div class="cardBurn">';
		if( workDeck[1].reward.willpower == 1) { html += '<div></div>' }
		else { html += '<div></div><div></div>' }
		html += '</div></div><div class="cardFlavor">' + workDeck[1].reward.text + '</div><div class="cardChange" style="background:url(resources/img/cards/change/' + workDeck[1].reward.change + '.png) no-repeat center center;">' + workDeck[1].reward.change + '</div><div class="effortFlip">Flip</div>';
		if (!workDeck[1].reward.specialKey == '') { html += '<div class="cardSpecial"><input id="' + workDeck[1].reward.id + 'd" type="checkbox" class="showSpecial"><label for ="' + workDeck[1].reward.id + 'd" class="cardSpecialTitle"><span>' + workDeck[1].reward.specialTitle + '</span></label><div class="cardSpecialText">' + workDeck[1].reward.specialText + '</div></div>' }
		html += '</div></div>';
		html += '</div><div id="ichiranConfirmBTN" class="ichiranBTN disabled">Confirm</div>';
	}
	else {
		html += '</div><div id="ichiranConfirmBTN" class="ichiranBTN disabled">Confirm</div>';
		html += '<div onclick="levelUp()" class="ichiranBTN ichiranSub">Level Up</div>';
	}
	
	$('section#overlay').html(html).fadeIn();
}

function confirmSelect() {
	if ( $('.overlayCardInner.selected').index() == 0 ) {
		if (workDeck.length > 1) {workDiscard.push(workDeck[1]);}
		workActive.push(workDeck[0]);
	} else {
		workDiscard.push(workDeck[0]);
		workActive.push(workDeck[1]);
	}
	workDeck.splice(0, 2);
	challenge = workActive[0].hazard[templevel].challenge;
	drawsLeft = workActive[0].hazard[level].draw;
	sacrifice = 0;
	totalEffort = 0;
	thisChange = workActive[0].reward.change;
	
	effortDeck.forEach(function(item) {
		item.tempEffort = item.effort;
		item.specialUsed = false;
	});
	
	var html = '<section id="gameScreen"><div id="ColCard"><div id="cardWrap"><h2>Cards</h2><div id="cardArrow"></div><div id="cardList"></div><div id="allCardsBTN">See All Cards In Hand</div><div id="allUsedBTN">See Used/Discards</div></div></div><div id="ColChallenge"><div id="hazardCardWrap"><div class="hazardCard" style="background:url(resources/img/cards/' + workActive[0].hazard[level].img + '.jpg) no-repeat center center;"><h1>' + workActive[0].hazard[level].title + '</h1><div class="hazardDraw">Draw<span class="hazardDrawVal">' + workActive[0].hazard[level].draw + '</span></div><div class="hazardChallenge">Challenge<span class="hazardChallengeVal">' + challenge + '</span></div><div class="hazardFlavor">' + workActive[0].hazard[level].text + '</div><div class="hazardFlip">Flip</div></div><div class="card" style="background:url(resources/img/cards/' + workActive[0].reward.img + '.jpg) no-repeat center center;background-size:cover;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + workActive[0].reward.effort + '</span>Effort</div><h3>' + workActive[0].reward.title + '</h3><div class="cardBurn">';
	if( workActive[0].reward.willpower == 1) { html += '<div></div>' }
	else { html += '<div></div><div></div>' }
	html += '</div></div><div class="cardFlavor">' + workActive[0].reward.text + '</div><div class="cardChange" style="background:url(resources/img/cards/change/' + thisChange + '.png) no-repeat center center;">' + thisChange + '</div><div class="effortFlip">Flip</div>';
	if (!workActive[0].reward.specialKey == '') { html += '<div class="cardSpecial"><input id="' + workActive[0].reward.id + 'e" type="checkbox" class="showSpecial"><label for="' + workActive[0].reward.id + 'e" class="cardSpecialTitle"><span>' + workActive[0].reward.specialTitle + '</span></label><div class="cardSpecialText">' + workActive[0].reward.specialText + '</div></div>' }
	html += '</div></div><div id="hazardStats"><div id="totalEffort"><span class="statlabel">Total Effort</span><span class="statval">0</span></div><div id="challenge"><span class="statlabel">Challenge</span><span class="statval">' + challenge + '</span></div><div id="sacrifice"><span class="statlabel">Will Loss</span><span class="statval">-' + challenge + '</span></div></div><div id="selectAction">Select Action</div><div id="mainBTNs"><div id="drawBTN">Draw<span>Free Draws: <span id="remainingDraws">' + drawsLeft + '</span></span><span id="drawWarning">Extra draws: <span id="extradraws">' + sacrifice + '</span> (-1<img src="resources/img/ui/will.svg" /> each)</span></div><div id="stopBTN">Stop<span>Face Challenge</span></div></div><div id="cardsRemainingWrap">Cards remaining in effort deck: <span id="cardsRemaining">' + effortDeck.length + '</span></div></div><div id="ColChar"><div id="avatar" style="width:' + changes.height + 'px;top:' + changes.heels + 'px;"><img id="hairstyleBack" src="resources/img/mc/dot.png" /><img id="shoes" src="resources/img/mc/dot.png" /><img id="bot" src="resources/img/mc/dot.png" /><img id="top" src="resources/img/mc/dot.png" /><img id="nails" src="resources/img/mc/dot.png" /><img id="head" src="resources/img/mc/dot.png" /><img id="makeup" src="resources/img/mc/dot.png" /><img id="face" src="resources/img/mc/dot.png" /><img id="makeupLips" src="resources/img/mc/dot.png" /><img id="lips" src="resources/img/mc/dot.png" /><img id="hairstyle" src="resources/img/mc/dot.png" /><img id="jewelry" src="resources/img/mc/dot.png" /><img id="sumaho" src="resources/img/mc/dot.png" /></div><div id="will">Willpower<span class="willVal">' + willpower + '</span></div></div></section>';
	$('#wrap').html(html);
	updateAvatar()	
	$('section#overlay').fadeOut();
}

/*****************************/
/********Game Screen**********/
/*****************************/
function bimbo() {
	bimboDraws++
	
	if (bimboDeck.length < 1) { showLose(true); return; }
	
	effortDiscard.push(bimboDeck[0]);
		
    for(var i=0; i<effortDiscard.length; i++) {
        effortDeck.push(effortDiscard[i]);
    }
    effortDeck.flat(Infinity);

    effortDiscard = []
	
	shuffleArray(effortDeck);

    var html = '<h1>Bimbo +1</h1><h2>You pushed yourself too hard and ran out of effort [cards]! Deck reshuffled with a <em>Bimbo</em> card added.</h2><div class="overlayBatsu">&#215;</div><div id="ichiran" class=""><div class="overlayCardInner flipped"><div class="card" style="background:url(resources/img/cards/' + bimboDeck[0].img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + bimboDeck[0].effort + '</span>Effort</div><h3>' + bimboDeck[0].title + '</h3><div class="cardBurn">';
    if( bimboDeck[0].willpower == 1) { html += '<div></div>' }
    else { html += '<div></div><div></div>' }
    html += '</div></div><div class="cardFlavor">' + bimboDeck[0].text + '</div>';
    if (!bimboDeck[0].specialKey == '') {
        html += '<div class="cardSpecial"><input id="' + bimboDeck[0].id + 'f" type="checkbox" class="showSpecial"><label for="' + bimboDeck[0].id + 'f" class="cardSpecialTitle"><span>' + bimboDeck[0].specialTitle + '</span></label><div class="cardSpecialText">' + bimboDeck[0].specialText + '</div></div>';
    }
    html += '</div></div></div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Close</div>';
    $('section#overlay').html(html).fadeIn();
    bimboDeck.splice(0, 1);
}

function cardSelect() {
	if( $('#ichiran').hasClass('selectable')) {
	$('.overlayCardInner').removeClass('selected');
	$(this).addClass('selected');
	$('#ichiranConfirmBTN, #reviewConfirmBTN').removeClass('disabled');
	}
}

function destroyConfirm() {
	var i = 0
	$('#ichiran.destroyable .card.destroyable').each(function(x) { 
		if ( $(this).hasClass('selected') ) {
			hand.splice((x-i),1)
			i++
		}
	});
	finishRound()
}

function draw() {
	if (drawsLeft < 1) {
		sacrifice -= 1;
		$('#drawWarning').show();
		$('#ColChar').append('<div class="willMinus">-' + drawcost + '</div>')
		willpower -= drawcost;
		$('span.willVal').text(willpower)
	} else {
		drawsLeft -= 1;
	}
	
	if (effortDeck.length < 1) {
		bimbo()
	}
	
	if (bonus > 0) {
		effortDeck[0].tempEffort = effortDeck[0].effort + bonus;
	}
	
	hand.push(effortDeck[0]);
	
	switch (effortDeck[0].specialKey) {
		case 'willpower-1':
			willpowerDown(1)
		break;
		case 'willpower-2':
			willpowerDown(2)
		break;
		case 'highest0':
			highest0()
		break;
		case 'stop':
			bimbostop()
		break;
	}
	
	
	effortDeck.splice(0, 1);
	
	
	if (drawsLeft <= 0) {$('#drawWarning').show();}
		
	refreshGame();
}

function refreshGame() {
	var html = '';
	totalEffort = 0;
	
	hand.forEach(function(item) {
		html += '<div class="card" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.tempEffort + '</span>Effort</div><h3>' + item.title;
		if(item.willpower == 2) {html += '<span class="power-used">☑Used</span>';}
		else {
		if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
		if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
		}
		html += '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'g" type="checkbox" class="showSpecial"><label for="' + item.id + 'g" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
			if(item.willpower == 1) {
				if (item.specialUsed == false) { html += '<div class="specialButton" data-key="' + item.specialKey + '">Use</div>'; }
				else {	html += '<div class="specialButton disabled">Used</div>'; }
				}
			html += '</div></div>';
			}
		html += '</div>';
		totalEffort += item.tempEffort;
		$('#cardList').empty();
		$('#cardList').append(html)
	});
	
	willLoss = (totalEffort - challenge);
	if (willLoss > 0) {willLoss = 0}
	$('#sacrifice span.statval').text( willLoss );
	$('#extradraws').text( sacrifice * -1)
	$('#totalEffort span.statval').text(totalEffort);
	$('span#remainingDraws').text(drawsLeft);
	$('span#cardsRemaining').text( effortDeck.length );
	$('.willVal').text(willpower);
	
	if (willpower < 1) { showLose() }
	
	//debug for undefined cards
	if (effortDeck.includes(undefined)) { alert("Error: Effort Deck contains undefined")}
	if (effortDiscard.includes(undefined)) { alert("Error: Effort Discard contains undefined")}
	if (hand.includes(undefined)) { alert("Error: Hand contains undefined")}
	if (workDeck.includes(undefined)) { alert("Error: Work Deck contains undefined")}
	if (workDiscard.includes(undefined)) { alert("Error: Work Discard contains undefined")}	
}

function stop() {
	var html;
	if(level >= 3) {
		//boss ending
		if (totalEffort >= challenge) {
			//boss success
			$('#messagebar h1').text('You did it!');
			$('#messagebar h3').text('You’ve passed the program!');
			$('#popupClose').hide();
			$('#messagebar').append('<div class="ichiranBTN ichiranSub" id="bossWin">Yay!</div>');
			$('#popup').fadeIn();
		} else {
			//boss fail
			$('#messagebar h1').text('Game Over');
			$('#messagebar h3').text('Oh no! You ran out of willpower!');
			$('#popupClose').hide();
			$('#messagebar').append('<div class="ichiranBTN ichiranSub" id="gameover">Continue</div>');
			$('#popup').fadeIn();
		}
	} else {
		if (totalEffort >= challenge) {
			//Success
			html = '<h1>Success!</h1><h2>You&#39;ve succeeded at your task! Here is your reward!</h2><div id="ichiran" class=""><div class="overlayCardInner flipped"><div class="card" style="background:url(resources/img/cards/' + workActive[0].reward.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + workActive[0].reward.effort + '</span>Effort</div><h3>' + workActive[0].reward.title + '</h3><div class="cardBurn">';
			if( workActive[0].reward.willpower == 1) { html += '<div></div>' }
			else { html += '<div></div><div></div>' }
			html += '</div></div><div class="cardFlavor">' + workActive[0].reward.text + '</div>';
			if (!workActive[0].reward.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + workActive[0].reward.id + 'h" type="checkbox" class="showSpecial"><label for="' + workActive[0].reward.id + 'h" class="cardSpecialTitle"><span>' + workActive[0].reward.specialTitle + '</span></label><div class="cardSpecialText">' + workActive[0].reward.specialText + '</div></div>';
			}
			html += '</div></div></div><h4>You also have another reward coming...</h4><div id="ichiranChangeBTN" class="ichiranBTN" onclick="change(\'' + thisChange + '\')">Change</div>';
			effortDiscard.push(workActive[0].reward)
			$('section#overlay').html(html).fadeIn();
		} else {
			//Failure
			html = '<h1>Failure!</h1><h2>You&#39;ve failed your task by ' + willLoss + ' points. While this hurts your willpower, failure is the best teacher - or so they say. You can destroy ' + (willLoss * -1) + ' points worth of effort cards.</h2><div class="willLoss">' + willLoss + '</div><div id="ichiran" class="destroyable">';
			
			cardSel = (willLoss * -1);
			totalSelected = 0;
			
			hand.forEach(function(item) {
				html += '<div class="card destroyable" data-burn="' + item.willpower + '" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.effort + '</span>Effort</div><h3>' + item.title + '</h3>';
				if (item.willpower == 1) {
				html += '<div class="cardBurn"><div></div><span>Destroy Cost</span></div>'; }
				else {
				html += '<div class="cardBurn"><div></div><div></div><span>Destroy Cost</span></div>'; }
				html += '</div><div class="cardFlavor">' + item.text + '</div>';
					if (!item.specialKey == '') {
						html += '<div class="cardSpecial"><input id="' + item.id + 'i" type="checkbox" class="showSpecial"><label for="' + item.id + 'i" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
						html += '</div></div>';
					}	
			html += '</div>';
			});
			html += '<div id="ichiranDestroyBTN" class="ichiranBTN confirm disabled">Destroy</div><div id="ichiranFinishBTN" class="ichiranBTN ichiranSub">Skip Destroy</div>';
			workDiscard.push(workActive[0]);
			$('section#overlay').html(html).fadeIn();
		}
	}
}


function updateAvatar() {
	$('#hairstyleBack').attr('src','resources/img/mc/hair/' + changes.hairstyle + '/back/' + changes.haircolor + '.png');
	$('#shoes').attr('src','resources/img/mc/bot/' + changes.bot + '/shoes/' + changes.shoes + '.png');
	$('#bot').attr('src','resources/img/mc/bot/' + changes.bot + '/' + changes.hips + '.png');
	$('#top').attr('src','resources/img/mc/top/' + changes.top + '/' + changes.boobs + '.png');
	$('#nails').attr('src','resources/img/mc/top/' + changes.top + '/nails/' + changes.nails + '.png');
	$('#head').attr('src','resources/img/mc/head.png');
	$('#makeup').attr('src','resources/img/mc/makeup/' + changes.makeup + '/makeup.png');
	$('#face').attr('src','resources/img/mc/face/' + changes.face + '.png');
	if (changes.face > 1) {
		$('#makeupLips').attr('src','resources/img/mc/makeup/' + changes.makeup + '/lips/' + changes.lips + '.png');
		$('#lips').attr('src','resources/img/mc/face/lips/' + changes.lips + '.png');
	}
	$('#hairstyle').attr('src','resources/img/mc/hair/' + changes.hairstyle + '/' + changes.haircolor + '.png');
	$('#jewelry').attr('src','resources/img/mc/top/' + changes.top + '/jewelry/' + changes.jewelry + '.png');
	$('#sumaho').attr('src','resources/img/mc/sumaho/' + changes.sumaho + '.png');
}

function change(part) {
	var title = '';
	var text = '';
	
	//build a current avatar, before update
	var oldAvatar = '<div id="oldAvatar"><img id="hairstyleBack" src="resources/img/mc/hair/' + changes.hairstyle + '/back/' + changes.haircolor + '.png" /><img id="shoes" src="resources/img/mc/bot/' + changes.bot + '/shoes/' + changes.shoes + '.png" /><img id="bot" src="resources/img/mc/bot/' + changes.bot + '/' + changes.hips + '.png" /><img id="top" src="resources/img/mc/top/' + changes.top + '/' + changes.boobs + '.png" /><img id="nails" src="resources/img/mc/top/' + changes.top + '/nails/' + changes.nails + '.png" /><img id="head" src="resources/img/mc/head.png" /><img id="makeup" src="resources/img/mc/makeup/' + changes.makeup + '/makeup.png" /><img id="face" src="resources/img/mc/face/' + changes.face + '.png" />';
	if (changes.face > 1) {
		oldAvatar += '<img id="makeupLips" src="resources/img/mc/makeup/' + changes.makeup + '/lips/' + changes.lips + '.png" /><img id="lips" src="resources/img/mc/face/lips/' + changes.lips + '.png" />';
	}
	oldAvatar += '<img id="hairstyle" src="resources/img/mc/hair/' + changes.hairstyle + '/' + changes.haircolor + '.png" /><img id="jewelry" src="resources/img/mc/top/' + changes.top + '/jewelry/' + changes.jewelry + '.png" /><img id="sumaho" src="resources/img/mc/sumaho/' + changes.sumaho + '.png" /></div>';
	
	//switch on part, set title, upgrade avatar vars
//switch on part, set title, upgrade avatar vars
switch (part) {
	case 'hips':
		title = 'Change: Butt';
		switch (changes.hips) {
			case 0: text = 'A well-rounded profile will help you get noticed in your career.';break;
			case 1: text = 'An employee&apos;s ass should stand out as much as their performance metrics.';break;
			case 2: text = 'An employee&apos;s ass should be like their work ethic: never quit!';break;
			case 3: text = 'Recent performance reviews ranked you low in “thiccness”, adjusting now.';break;
			default: text = 'An employee&apos;s ass should stand out as much as their performance metrics.';
		}
		if (changes.hips < 3) {changes.hips += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'boobs':
		title = 'Change: Boobs';
		switch (changes.boobs) {
			case 0: text = 'These are like a good email, small, elegant, with a couple of strong, stand-out bullet points.';break;
			case 1: text = 'Since you&apos;re moving up in this company - so should your cup size!';break;
			case 2: text = 'I&apos;m happy to report significant growth of your top-end assets this month.';break;
			case 3: text = 'I hope your typing skills are good, you uh…might have difficulty seeing the keyboard from now on.';break;
			case 4: text = 'Tits like this will open many doors for you…though fitting through them might be an issue.';break;
			default: text = 'Since you&apos;re moving up in this company - so should your cup size!';
		}
		if (changes.boobs < 4) {changes.boobs += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'bot':
		title = 'Change: Bottoms';
		switch (changes.bot) {
			case 0: text = 'Tailor-fit slacks, After all, the clothes make the…well, you look great!';break;
			case 1: text = 'I’m afraid we&apos;re going to have to downsize your pants. Thankfully, these are a stretchy material, so they should still fit…with enough effort.';break;
			case 2: text = 'We&apos;d like you to show a little more initiative…and more leg. Your uniform is now a skirt.';break;
			case 3: text = 'Management isn&apos;t known for their creativity, so this skirt leaves little to the imagination.';break;
			case 4: text = 'Management isn&apos;t known for their creativity, so this skirt leaves little to the imagination.';break;
			default: text = 'Management isn&apos;t known for their creativity, so this skirt leaves little to the imagination.';
		}
		if (changes.bot < 4) {changes.bot += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'hairstyle':
		title = 'Change: Hairstyle';
		switch (changes.hairstyle) {
			case 0: text = 'Looks like your hair is getting a little shaggy. Might want a cut, or a nice styling.';break;
			case 1: text = 'This style is called a “shag”. I&apos;ll refrain from any infantile jokes, but I can&apos;t make any promises for your coworkers.';break;
			case 2: text = 'Nothing like an up-do for an up-and-comer like you.';break;
			case 3: text = 'Your hair is too long for an up-do now, I&apos;m afraid all I can do is make you look FABULOUS.';break;
			default: text = 'Has your hair gotten longer again? Time for a new style!';
		}
		if (changes.hairstyle == 0) {
			changes.hairstyle += 1;
			title = 'Change: Hair growth';
			text = 'Looks like your hair is getting a little shaggy. Might want a cut, or a nice styling.';
		} else if (changes.hairstyle < 3) {changes.hairstyle += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'haircolor':
		title = 'Change: Hair color';
		switch (changes.haircolor) {
			case 0: text = 'You&apos;ll have to let me know if blondes really do have more fun.';break;
			case 1: text = 'Management wants you to brighten up a little. Not your attitude, your hair color.';break;
			case 2: text = 'It&apos;s a woman&apos;s prerogative to change her mind…and her hair color!';break;
			default: text = 'It&apos;s a woman&apos;s prerogative to change her mind…and her hair color!';
		}
		if (changes.hairstyle == 0) {
			changes.hairstyle += 1;
			title = 'Change: Hair growth';
			text = 'Has your hair gotten longer again? Time for a new style!';
		} else if (changes.haircolor < 2) {changes.haircolor += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'jewelry':
		title = 'Change: Jewelry';
		switch (changes.jewelry) {
			case 0: text = 'You can&apos;t buy happiness, but you can buy jewelry, and that&apos;s kind of the same.';break;
			case 1: text = 'Jewelry is like chocolate, there&apos;s always room for more.';break;
			case 2: text = 'Jewelry is like chocolate, there&apos;s always room for more.';break;
			
		}
		if (changes.jewelry < 2) {changes.jewelry += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'lips':
		title = 'Change: Lips';
		switch (changes.lips) {
			case 0: text = 'These will give you a beautiful smile. They say smiling is the second best thing you can do with your lips…maybe third.';break;
			case 1: text = 'They may not listen to you, but with these lips, they&apos;ll love watching you speak.';break;
			case 2: text = 'These lips will be able to suck the extension off a PDF file…um, something like that.';break;
			
		}
		if (changes.lips < 2) {changes.lips += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'makeup':
		title = 'Change: Makeup';
		switch (changes.makeup) {
			case 0: text = 'A secretary needs a good foundation of work…and a good eyeliner.';break;
			case 1: text = 'Trust me with this: eyeliner speaks louder than words.';break;
			case 2: text = 'Try not to stress out too much. This makeup is too expensive for crying.';break;
			
		}
		if (changes.makeup < 2) {changes.makeup += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'nails':
		title = 'Change: Nails';
		switch (changes.nails) {
			case 0: text = 'I love beautiful nails. They&apos;re are the one thing you can get in shape without exercise.';break;
			case 1: text = 'These will probably hurt your typing speed, but they&apos;re too gorgeous to care.';break;
			case 2: text = 'I love beautiful nails. They&apos;re are the one thing you can get in shape without exercise.';break;
			default: text = 'I love beautiful nails. They&apos;re are the one thing you can get in shape without exercise.';
		}
		if (changes.nails < 2) {changes.nails += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'top':
		title = 'Change: Top';
		switch (changes.top) {
			case 0: text = 'You&apos;re just swimming in that suit. Let&apos;s try something that fits…no…accentuates your curves.';break;
			case 1: text = 'We try to promote a policy of openness, why don&apos;t you open a few buttons?';break;
			case 2: text = 'Due to recent cost cuts, we&apos;re going to be reducing your…um…shirt.';break;
			case 3: text = 'Wow, it seems you&apos;re almost out of uniform, in the best possible way.';break;
			case 4: text = 'Due to recent cost cuts, we&apos;re going to be reducing your…um…shirt.';break;
			
		}
		if (changes.top < 4) {changes.top += 1;}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
	case 'shoes':
		title = 'Change: Shoes';
		switch (changes.shoes) {
			case 0: text = 'Honestly, it&apos;s a wonder you didn&apos;t break your neck with these old shoes. Way too big for dainty little feet like yours.';break;
			case 1: text = 'Life is short, your heels should not be.';break;
			case 2: text = 'Our company&apos;s standards are like our heels: extravagant and very high!';break;
			case 3: text = 'Life is short, your heels should not be.';break;
		}
		if (changes.shoes < 3) {changes.shoes += 1;}
		switch (changes.shoes) {
               case 0: changes.heels = 2; $('#avatar, #charAvatar').css("top", "2px");
               break;
               case 1: changes.heels = 5; $('#avatar, #charAvatar').css("top", "5px");
               break;
               case 2: changes.heels = -5; $('#avatar, #charAvatar').css("top", "-5px");
               break;
               case 3: changes.heels = -10; $('#avatar, #charAvatar').css("top", "-10px");
               break;
		}
		if (changes.face < 4) {changes.face += 1;}
		if (changes.top > 0 && changes.sumaho < 5) {changes.sumaho += 1;}
	break;
}




	//build html of title & text
	var html = '<h1>' + title + '</h1><h2>' + text + '</h2>' + oldAvatar;
	html += '<div id="newAvatar"><img id="hairstyleBack" src="resources/img/mc/hair/' + changes.hairstyle + '/back/' + changes.haircolor + '.png" /><img id="shoes" src="resources/img/mc/bot/' + changes.bot + '/shoes/' + changes.shoes + '.png" /><img id="bot" src="resources/img/mc/bot/' + changes.bot + '/' + changes.hips + '.png" /><img id="top" src="resources/img/mc/top/' + changes.top + '/' + changes.boobs + '.png" /><img id="nails" src="resources/img/mc/top/' + changes.top + '/nails/' + changes.nails + '.png" /><img id="head" src="resources/img/mc/head.png" /><img id="makeup" src="resources/img/mc/makeup/' + changes.makeup + '/makeup.png" /><img id="face" src="resources/img/mc/face/' + changes.face + '.png" />';
	if (changes.face > 1) {
	html += '<img id="makeupLips" src="resources/img/mc/makeup/' + changes.makeup + '/lips/' + changes.lips + '.png" /><img id="lips" src="resources/img/mc/face/lips/' + changes.lips + '.png" />';	}
	html += '<img id="hairstyle" src="resources/img/mc/hair/' + changes.hairstyle + '/' + changes.haircolor + '.png" /><img id="jewelry" src="resources/img/mc/top/' + changes.top + '/jewelry/' + changes.jewelry + '.png" /><img id="sumaho" src="resources/img/mc/sumaho/' + changes.sumaho + '.png" /></div>';
	html += '<div id="ichiranFinishBTN" style="top:70vh" class="ichiranBTN ichiranSub">Finished</div>';
	
	$('section#overlay *').fadeOut();
	$('section#overlay').html(html).fadeIn();
}

/*****************************/
/********Card Powers**********/
/*****************************/


function willpower1() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	hand[specCard].specialUsed = true
	if (willpower < maxWillpower) {
		willpower += 1
	}
	refreshGame()
	$('#messagebar h1').text('+1 Willpower');
	$('#messagebar h3').text(' ');
	$('#popup').fadeIn();
}

function willpower2() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	hand[specCard].specialUsed = true
	if (willpower < maxWillpower) {
		willpower += 2
	}
	refreshGame()
	$('#messagebar h1').text('+2 Willpower');
	$('#messagebar h3').text(' ');
	$('#popup').fadeIn();
}

function card1() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	hand[specCard].specialUsed = true
	drawsLeft += 1
	refreshGame()
	$('#messagebar h1').text('+1 Draw');
	$('#messagebar h3').text('One extra free draw added!');
	$('#popup').fadeIn();
}

function card2() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	hand[specCard].specialUsed = true
	drawsLeft += 2
	refreshGame()
	$('#messagebar h1').text('+2 Draw');
	$('#messagebar h3').text('Two extra free draws added!');
	$('#popup').fadeIn();
}


function belowpile() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	var html = '<h1>Below Pile</h1><h2>Choose one card from your hand to return to the effort deck (on the bottom).</h2><div id="ichiran" class="selectable">';
	
		cardSel = 1
		
		hand.forEach(function(item) {
		html += '<div class="card selectable" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.effort + '</span>Effort</div><h3>' + item.title;
		if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
		if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
		html += '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'i" type="checkbox" class="showSpecial"><label for="' + item.id + 'i" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
				html += '</div></div>';
			}	
		html += '</div>';
	});
		html += '<div id="belowPileBTN" onclick="confirmBelowPile('+ specCard + ')" class="ichiranBTN confirm disabled">Move</div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Cancel Move</div>';
		$('section#overlay').html(html);
		$('.card.selectable').eq(specCard).hide();
		$('section#overlay').fadeIn();
		if ($("#overlay div.card:visible").length === 0) {$('#overlay h2').text('No applicable cards.')}
	$('#overlay').scrollTop(0);
}

function confirmBelowPile(specCard) {
	hand[specCard].specialUsed = true
	$('#ichiran.selectable .card.selectable').each(function(x) { 
		if ( $(this).hasClass('selected') ) {
			$('#messagebar h1').text('Moved');
			var tempCardTitle = $(this).find('h3').clone().children().remove().end().text().trim();
			$('#messagebar h3').text( '"' + tempCardTitle + '" moved to Effort Deck');
			if (hand[x].specialKey != '') {hand[x].specialUsed = false;}
			effortDeck.push(hand[x]);
			hand.splice((x),1);
		}
	});
	refreshGame()
	$('section#overlay').fadeOut();
	$('#popup').fadeIn();
}

function copy() {
	$('section#overlay').fadeOut();
	var handplace = 0;
	var copyplace = $(this).closest('.card').index();
	
	var html = '<h1>Copy</h1><h2>Choose one card from your hand with a special ability, then copy that ability to this card.</h2><div id="ichiran" class="selectable">';
	
		cardSel = 1
		
		hand.forEach(function(item) {
		if (item.specialKey == '' || item.specialKey !== 'copy' ) {
			html += '<div class="card selectable" data-place="' + handplace + '" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.effort + '</span>Effort</div><h3>' + item.title;
			if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
			if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
			html += '</h3>';
			if (item.willpower == 1) {html += '<div class="cardBurn"><div></div></div>'; }
			else { html += '<div class="cardBurn"><div></div><div></div></div>'; }
			html += '</div><div class="cardFlavor">' + item.text + '</div>';
			html += '<div class="cardSpecial"><input id="' + item.id + 'i" type="checkbox" class="showSpecial"><label for="' + item.id + 'i" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
			html += '</div></div></div>';
		}
		handplace++;
	});
		html += '<div id="copyBTN" onclick="confirmCopy('+ copyplace + ')" class="ichiranBTN confirm disabled">Copy</div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Cancel Copy</div>';
		$('section#overlay').html(html);
		$('section#overlay').fadeIn();
		if ($("#overlay div.card:visible").length === 0) {$('#overlay h2').text('No applicable cards.')}
	$('#overlay').scrollTop(0);
}

function confirmCopy(copyplace) {
	var k = $('.card.selectable.selected').data("place")
	$('#messagebar h1').text('Card Copied');
	$('#messagebar h3').text(hand[copyplace].title + '’s ability changed to: "' + hand[k].specialTitle + '"!');
	
	hand[copyplace].specialTitle = hand[k].specialTitle;
	hand[copyplace].specialText = hand[k].specialText;
	hand[copyplace].specialKey = hand[k].specialKey;
	
	refreshGame()
	$('section#overlay').fadeOut();
	$('#popup').fadeIn();
}

function destroy() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	
	var html = '<h1>Destroy</h1><h2>Choose a card to remove from the game completely. Best used to remove weak or bimbo cards from your hand for good.</h2><div id="ichiran" class="destroyable">';
		
		cardSel = 1;
		totalSelected = 0;
	
	hand.forEach(function(item) {
		html += '<div class="card destroyable" data-burn="1" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.effort + '</span>Effort</div><h3>' + item.title;
		if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
		if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
		html += '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'i" type="checkbox" class="showSpecial"><label for="' + item.id + 'i" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
				html += '</div></div>';
			}	
		html += '</div>';
	});
	
		html += '<div id="destroyConfirmBTN" onclick="confirmDestroy('+ specCard + ')" class="ichiranBTN confirm disabled">Destroy</div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Cancel Destroy</div>';
		$('section#overlay').html(html)
		$('.card.destroyable').eq(specCard).hide();
		$('section#overlay').fadeIn();
		if ($("#overlay div.card:visible").length === 0) {$('#overlay h2').text('No applicable cards.')}
		$('#overlay').scrollTop(0);
}

function confirmDestroy(specCard) {
	hand[specCard].specialUsed = true
	$('#ichiran.destroyable .card.destroyable').each(function(x) { 
		if ( $(this).hasClass('selected') ) {
			$('#messagebar h1').text('Destroyed');
			var tempCardTitle = $(this).find('h3').clone().children().remove().end().text().trim();
			$('#messagebar h3').text( '"' + tempCardTitle + '" was removed from the game.');
			hand.splice((x),1)
		}
	});
	refreshGame()
	$('section#overlay').fadeOut();
	$('#popup').fadeIn();
}

function double() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	var html = '<h1>Double</h1><h2>Choose one card from your hand, double the <em>base</em> effort value for this round. (Cannot be used on the same card twice)</h2><div id="ichiran" class="selectable">';
	
		cardSel = 1
		
		hand.forEach(function(item) {
		html += '<div class="card selectable" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.effort + '</span>Effort</div><h3>' + item.title;
		if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
		if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
		html += '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'i" type="checkbox" class="showSpecial"><label for="' + item.id + 'i" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
				html += '</div></div>';
			}	
		html += '</div>';
	});
	
		html += '<div id="doubleBTN" onclick="confirmDouble('+ specCard + ')" class="ichiranBTN confirm disabled">Double</div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Cancel Double</div>';
		$('section#overlay').html(html)
		$('.card.selectable').eq(specCard).hide();
		$('section#overlay').fadeIn();
		if ($("#overlay div.card:visible").length === 0) {$('#overlay h2').text('No applicable cards.')}
	$('#overlay').scrollTop(0);
}

function confirmDouble(specCard) {
	hand[specCard].specialUsed = true
	$('#ichiran.selectable .card.selectable').each(function(x) { 
		if ( $(this).hasClass('selected') ) {
			$('#messagebar h1').text('Double');
			var tempCardTitle = $(this).find('h3').clone().children().remove().end().text().trim();
			$('#messagebar h3').text( '"' + tempCardTitle + '" was doubled!');
			hand[x].tempEffort = (hand[x].effort * 2);
		}
	});
	refreshGame()
	$('section#overlay').fadeOut();
	$('#popup').fadeIn();
}

function exchange1() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	var html = '<h1>Exchange 1</h1><h2>Choose one card from your hand, discard it for an extra free draw.</h2><div id="ichiran" class="selectable">';
	
		cardSel = 1
		
		hand.forEach(function(item) {
		html += '<div class="card selectable" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.effort + '</span>Effort</div><h3>' + item.title;
		if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
		if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
		html += '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'i" type="checkbox" class="showSpecial"><label for="' + item.id + 'i" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
				html += '</div></div>';
			}	
		html += '</div>';
	});
	
		html += '<div id="exchangeBTN" onclick="confirmExchange(' + specCard + ',1)" class="ichiranBTN confirm disabled">Exchange</div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Cancel Exchange</div>';
		$('section#overlay').html(html)
		$('.card.selectable').eq(specCard).hide();
		$('section#overlay').fadeIn();
		if ( $("#overlay div.card:visible").length === 0) { $('#overlay h2').text('No applicable cards.');}
	$('#overlay').scrollTop(0);
}

function exchange2() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	var html = '<h1>Exchange 2</h1><h2>Choose up to two cards from your hand, discard them for extra free draw(s).</h2><div id="ichiran" class="selectable">';
	
		cardSel = 2
		
		hand.forEach(function(item) {
		html += '<div class="card selectable" style="background:url(resources/img/cards/' + item.img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + item.effort + '</span>Effort</div><h3>' + item.title;
		if (item.specialKey != '' && item.specialUsed == false) {html += '<span class="power-used">☐Used</span>'; }
		if (item.specialKey != '' && item.specialUsed == true) {html += '<span class="power-used">☑Used</span>'; }
		html += '</h3>';
		if (item.willpower == 1) {
		html += '<div class="cardBurn"><div></div></div>'; }
		else {
		html += '<div class="cardBurn"><div></div><div></div></div>'; }
		html += '</div><div class="cardFlavor">' + item.text + '</div>';
			if (!item.specialKey == '') {
				html += '<div class="cardSpecial"><input id="' + item.id + 'i" type="checkbox" class="showSpecial"><label for="' + item.id + 'i" class="cardSpecialTitle"><span>' + item.specialTitle + '</span></label><div class="cardSpecialText">' + item.specialText;
				html += '</div></div>';
			}	
		html += '</div>';
	});
	
		html += '<div id="exchangeBTN" onclick="confirmExchange(' + specCard + ',2)" class="ichiranBTN confirm disabled">Exchange</div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Cancel Exchange</div>';
		$('section#overlay').html(html)
		$('.card.selectable').eq(specCard).hide();
		if ($("#overlay div.card:visible").length === 0) {$('#overlay h2').text('No applicable cards.');}
		$('section#overlay').fadeIn();
	$('#overlay').scrollTop(0);
}


function confirmExchange(specCard,discard) {
	hand[specCard].specialUsed = true
	var i = 0
	var cardnames = "";
	var discarded = 0;
	$('#ichiran.selectable .card.selectable').each(function(x) { 
		if ( $(this).hasClass('selected') ) {
			if (i > 0) {cardnames += ' and '}
			cardnames += '"' + $(this).find('h3').text() + '"';
			effortDiscard.push(hand[x-i])
			hand.splice((x-i),1)
			i++
		}
	});
	drawsLeft += i
	$('#messagebar h1').text('Exchange');
	cardnames += ' discarded. +' + i;
	if (i > 1) {cardnames += ' free draws.'} else {cardnames += ' free draw.'}
	$('#messagebar h3').text( cardnames );
	refreshGame()
	$('section#overlay').fadeOut();
	$('#popup').fadeIn();
}

function phase() {
	$('section#overlay').fadeOut();
	var specCard = $(this).closest('.card').index()
	hand[specCard].specialUsed = true
	if (level > 0 && level < 3) {
		templevel--;
		$('#messagebar h1').text('Challenge Level -1');
		$('#messagebar h3').text('Challenge reduced by one level!');
		challenge = workActive[0].hazard[templevel].challenge;
		$('.hazardChallengeVal').text(challenge);
		$('#challenge span.statval').text(challenge);
	} else {
		$('#messagebar h1').text('Minimum Challenge');
		$('#messagebar h3').text('Challenge level cannot be changed!');
	}
	refreshGame()
	$('#popup').fadeIn();
}

function sort() {
	var specCard = $(this).closest('.card').index();
	if (effortDeck.length < 3) {
		$('section#overlay').fadeOut();
		$('#messagebar').html('<div id="messagebar"><h1>Not Enough Cards!</h1><h3>You don&#39;t have enough cards to sort. Would you like to reshuffle and proceed? This will add a Bimbo card to your deck.</h3><div class="popupBTNwrap"><div class="ichiranBTN"  onclick="drawSort(' + specCard + ')">Continue</div><div class="ichiranBTN ichiranSub" id="popupClose">Cancel</div></div></div>');
		$('#popup').fadeIn();
	} else {
		Gosort(specCard);
	}
}

function drawSort(specCard) {
	closePopup()
	effortDiscard.push(bimboDeck[0]);
		
    for(var i=0; i<effortDiscard.length; i++) {
        effortDeck.push(effortDiscard[i]);
    }
    effortDeck.flat(Infinity);

    effortDiscard = []

    var html = '<h1>Bimbo +1</h1><h2>You pushed yourself too hard and ran out of effort [cards]! Deck reshuffled with a <em>Bimbo</em> card added.</h2><div class="overlayBatsu">&#215;</div><div id="ichiran" class=""><div class="overlayCardInner flipped"><div class="card" style="background:url(resources/img/cards/' + bimboDeck[0].img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + bimboDeck[0].effort + '</span>Effort</div><h3>' + bimboDeck[0].title + '</h3><div class="cardBurn">';
    if( bimboDeck[0].willpower == 1) { html += '<div></div>' }
    else { html += '<div></div><div></div>' }
    html += '</div></div><div class="cardFlavor">' + bimboDeck[0].text + '</div>';
    if (!bimboDeck[0].specialKey == '') {
        html += '<div class="cardSpecial"><input id="' + bimboDeck[0].id + 'f" type="checkbox" class="showSpecial"><label for="' + bimboDeck[0].id + 'f" class="cardSpecialTitle"><span>' + bimboDeck[0].specialTitle + '</span></label><div class="cardSpecialText">' + bimboDeck[0].specialText + '</div></div>';
    }
    html += '</div></div></div><div onclick="Gosort(' + specCard + ')" class="ichiranBTN ichiranSub">Sort</div>';
    $('section#overlay').html(html).fadeIn();
    bimboDeck.splice(0, 1);
}

function Gosort(specCard) {
	$('section#overlay').fadeOut();
	var html = '<h1>Sort</h1><h2>Look at the next three effort cards. You may discard one, then replace the remaining cards back in the work deck in any order.</h2><div id="ichiran" class="sortable">';
	
	for(var i=0; i<3; i++) {
        html += '<div class="card" style="background:url(resources/img/cards/' + effortDeck[i].img + '.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">' + effortDeck[i].effort + '</span>Effort</div><h3>' + effortDeck[i].title + '</h3>';
		if (effortDeck[i].willpower == 1) {
			html += '<div class="cardBurn"><div></div></div>'; }
		else {
			html += '<div class="cardBurn"><div></div><div></div></div>'; }
			html += '</div><div class="cardFlavor">' + effortDeck[i].text + '</div>';
		if (!effortDeck[i].specialKey == '') {
			html += '<div class="cardSpecial"><input id="' + effortDeck[i].id + 'i" type="checkbox" class="showSpecial"><label for="' + effortDeck[i].id + 'i" class="cardSpecialTitle"><span>' + effortDeck[i].specialTitle + '</span></label><div class="cardSpecialText">' + effortDeck[i].specialText;
			html += '</div></div>';
		}
		html += '</div>';
		html += '<div class="sortBTNwrap"><div class="sortDiscard">Discard</div><div class="sortFirst">First</div><div class="sortSecond">Second</div></div>'
    }
	
	html += '<div id="clearSelection">Clear Selection</div><div id="sortBTN" onclick="confirmSort(' + specCard + ')" class="ichiranBTN confirm disabled">Sort</div><div id="ichiranCloseBTN" class="ichiranBTN ichiranSub">Cancel Sort</div>';
	
	$('section#overlay').html(html).fadeIn();
	$('#overlay').scrollTop(0);
}

function selectDiscard() {
	var targ = $(this).parent().prev();
	if ( $(targ).hasClass('discard') ) {
		$(targ).removeClass('discard')
	} else {
		$('#ichiran.sortable .card').removeClass('discard');
		$(targ).attr("class","card discard");
	}
	sortCleanup()
}

function selectFirst() {
	var targ = $(this).parent().prev();
	if ( $(targ).hasClass('first') ) {
		$(targ).removeClass('first')
	} else {
		$('#ichiran.sortable .card').removeClass('first');
		$(targ).attr("class","card first");
	}
	sortCleanup()
}

function selectSecond() {
	var targ = $(this).parent().prev();
	if ( $(targ).hasClass('second') ) {
		$(targ).removeClass('second')
	} else {
		$('#ichiran.sortable .card').removeClass('second');
		$(targ).attr("class","card second");
	}
	sortCleanup()
}

function sortCleanup() {
	//if there is a one and a two, but no discard, mark that as 3
	if ( $('.card.first').length > 0 && $('.card.second').length > 0 && $('.card.discard').length === 0) {
		$('#ichiran.sortable .card').each(function(x) { 
			if( $(this).attr("class") === "card" ) {
				$(this).addClass('third');
			}
		});
	}
	//Remove three if either one or two does not exist
	if ( $('.card.first').length == 0 || $('.card.second').length == 0) {
		$('.card.third').removeClass('third');
	}
	//if there is a one and a two, unlock confirm button
	if ( $('.card.first').length > 0 && $('.card.second').length > 0 ) {
		$('#sortBTN').removeClass('disabled')
	} else {
		$('#sortBTN').addClass('disabled')
	}
}

function selectClear() {
	$('.card').attr("class","card");
	$('#sortBTN').addClass('disabled');
}

function confirmSort(specCard) {
	hand[specCard].specialUsed = true
	var newarray = effortDeck.splice(0,3);
	var second = $('#ichiran.sortable .card').index($('.second'));
	var first = $('#ichiran.sortable .card').index($('.first'));
	var discard = $('#ichiran.sortable .card').index($('.discard'));
	var third = $('#ichiran.sortable .card').index($('.third'));
	$('#messagebar h1').text('Sort');
	
	if( third >= 0 ) {effortDeck.unshift(newarray[third])}
	effortDeck.unshift(newarray[second]);
	effortDeck.unshift(newarray[first]);
	if( discard >= 0 ) {
		effortDiscard.push(newarray[discard])
		$('#messagebar h3').text( '"' + newarray[discard].title + '" discarded, two cards sorted to effort deck.');
	} else {
		$('#messagebar h3').text( 'Three cards sorted to effort deck.');
	}
	refreshGame()
	$('section#overlay').fadeOut();
	$('#popup').fadeIn();
}


/*****************************/
/*******Bimbo "Powers"********/
/*****************************/

function willpowerDown(val) {
	$('section#overlay').fadeOut();
	willpower -= val
	refreshGame()
	$('#messagebar h1').text('You drew a Bimbo card!');	
	$('#messagebar h3').text('-'+ val + ' willpower');
	$('<div class="card" style="background:url(resources/img/cards/b_absent.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">0</span>Effort</div><h3>Absent Minded</h3><div class="cardBurn"><div></div><div></div></div></div><div class="cardFlavor">Wait, what was I doing again?</div><div class="cardSpecial"><input id="B001z" type="checkbox" class="showSpecial"><label for="B001z" class="cardSpecialTitle"><span>-1 Willpower</span></label><div class="cardSpecialText" style="display:block;">Lose 1 willpower</div></div></div>').insertAfter('#messagebar h1');
	$('#popup').fadeIn();	
}

function highest0() {
	$('section#overlay').fadeOut();
	
var maxValue = Math.max.apply( null, hand.map( c => c.effort ) )
var output = Object.keys(hand).findIndex( s => hand[s].effort == maxValue );
hand[output].tempEffort = 0
	
	$('#messagebar h1').text('You drew a Bimbo card!');
	$('#messagebar h3').text( 'Your highest card, "' + hand[output].title + '", is now worth 0 effort.');
	$('<div class="card" style="background:url(resources/img/cards/b_obedient.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">0</span>Effort</div><h3>Obedient</h3><div class="cardBurn"><div></div><div></div></div></div><div class="cardFlavor">Of course, I&#39;ll do whatever you want.</div><div class="cardSpecial"><input id="B001z" type="checkbox" class="showSpecial"><label for="B001z" class="cardSpecialTitle"><span>Highest Card = 0</span></label><div class="cardSpecialText" style="display:block;">Highest effort card reduced to 0</div></div></div>').insertAfter('#messagebar h1');
	$('#popup').fadeIn();	
}


function bimbostop() {
	$('section#overlay').fadeOut();
	drawsLeft = 0;
	refreshGame()
	$('#messagebar h1').text('You drew a Bimbo card!');
	$('#messagebar h3').text('Free draws set to zero!');
	$('<div class="card" style="background:url(resources/img/cards/b_horny.jpg) no-repeat center center;"><div class="titleBar"><div class="cardEffort"><span class="cardEffortVal">0</span>Effort</div><h3>Horny</h3><div class="cardBurn"><div></div><div></div></div></div><div class="cardFlavor">I um...have to go to the ladies room...right now.</div><div class="cardSpecial"><input id="B001z" type="checkbox" class="showSpecial"><label for="B001z" class="cardSpecialTitle"><span>Stop</span></label><div class="cardSpecialText" style="display:block;">Stop drawing and face challenge now</div></div></div>').insertAfter('#messagebar h1');
	$('#popup').fadeIn();	
}


/*****************************/
/********Debugging**********/
/*****************************/

function setHand() {
	hand = [{id:'E019',img:'effort',title:'Boobs',effort:4,tempEffort:4,willpower:1,text:'The power of tits compells you!',change:'boobs',specialKey:'',specialUsed:false,specialTitle:'...',specialText:''},{id:'E032',img:'effort',title:'Repression',effort:1,tempEffort:1,willpower:1,text:'How did I ever go out without makeup? Did I ever go out without makeup?',change:'hairstyle',specialKey:'belowpile',specialUsed:false,specialTitle:'1x Return',specialText:'Put one effort card back in the deck'},{id:'E028',img:'effort',title:'Coffee Break',effort:0,tempEffort:0,willpower:1,text:'I need a little pick-me-up, with whip cream and sprinkles!',change:'lips',specialKey:'willpower1',specialUsed:false,specialTitle:'+1 Willpower',specialText:'Gain 1 willpower'},{id:'E034',img:'effort',title:'Gossip',effort:1,tempEffort:1,willpower:1,text:'Did you hear about Janet and Mr. Smith?',change:'makeup',specialKey:'copy',specialUsed:false,specialTitle:'1x copy',specialText:'Copy the power of another card'},{id:'E024',img:'effort',title:'Ass',effort:3,tempEffort:3,willpower:1,text:'Hate to see you go, but love to watch you leave.',change:'boobs',specialKey:'card1',specialUsed:false,specialTitle:'+1 Card',specialText:'Draw 1 card for free'},{id:'E036',img:'effort',title:'Obey',effort:1,tempEffort:1,willpower:1,text:'Of course. I&apos;ll do whatever you want.',change:'nails',specialKey:'destroy',specialUsed:false,specialTitle:'1x destroy',specialText:'Destroy one drawn card'},{id:'E040',img:'effort',title:'Hustle',effort:1,tempEffort:1,willpower:1,text:'Bouncing between appointments!',change:'shoes',specialKey:'double',specialUsed:false,specialTitle:'1x double',specialText:'Double effort of one drawn card'},{id:'E042',img:'effort',title:'Flirt',effort:2,tempEffort:2,willpower:1,text:'[Giggle] You&apos;re so funny!',change:'bot',specialKey:'exchange1',specialUsed:false,specialTitle:'1x exchange',specialText:'Discard one drawn card, draw a replacement'},{id:'E044',img:'effort',title:'Flirt',effort:0,tempEffort:0,willpower:1,text:'[Giggle] You&apos;re so funny!',change:'hips',specialKey:'exchange2',specialUsed:false,specialTitle:'2x exchange',specialText:'Discard two drawn cards, draw replacements'},{id:'E046',img:'effort',title:'Plead',effort:0,tempEffort:0,willpower:1,text:'It&apos;s so haaard! Can you help pretty please!',change:'shoes',specialKey:'phase',specialUsed:false,specialTitle:'Level -1',specialText:'Reduce challenge one level'},{id:'E048',img:'effort',title:'Preen',effort:3,tempEffort:3,willpower:1,text:'Fix hair, reapply lipstick, bit of powder...lookout world, here I come!',change:'makeup',specialKey:'sort',specialUsed:false,specialTitle:'Sort 3 cards',specialText:'Look at the top 3 effort cards, sort, and return to deck.'}]
	refreshGame()
}

function logEffort() {
	console.log(effortDeck)
}

function logDiscard() {
	console.log(effortDiscard)
}

function logHand() {
	console.log(hand)
}

function logWork() {
	console.log(workDeck)
}

function logWorkDiscard() {
	console.log(workDiscard)
}


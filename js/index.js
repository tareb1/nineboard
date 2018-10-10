'use strict'
$(function() {
	var userData = document.implementation.createDocument(null, "TextTest");
    var entriesCount = 0;
    
	var downloadButton;

	var BUTTON_NUM = 12;

	var lowerCase =   ['n', 'a', 'h', 's', 'e', 'i', 'r', 'o', 't', 'CAPS', '__', '123'];
	var upperCase =   ['N', 'A', 'H', 'S','E', 'I', 'R', 'O', 'T', 'CAPS', '__', '123'];
	var punctuation = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '__', 'abc'];

// lowercase
	var botLetter = ['v', 'p', 'd', 'u', 'c', 'x'];
	var topLetter = ['q', 'l', 'z']
	var rightLetter = ['w', 'k', 'f'];
	var leftLetter = ['m', 'b', 'y'];

	var centerKey = ['j', 'g'];


// uppercase
	var upbotLetter = ['V', 'P', 'D', 'U', 'C', 'X'];
	var uptopLetter = ['Q', 'L', 'Z']
	var uprightLetter = ['W', 'K', 'F'];
	var upleftLetter = ['M', 'B', 'Y'];

	var upcenterKey = ['J', 'G'];

// punctuation
	var puncbotLetter = ['!', '@', '#', '$', '%', '^'];
	var punctopLetter = ['&', '*', '(']
	var puncrightLetter = ['/', '-', ':'];
	var puncleftLetter = ['?', '+', ';'];

	var punccenterKey = ['=', '_'];

// bottom 
	var botButtonPunc = ['.', ','];
	var botButtonPunc2 = ['"', '?'];

	$('#clear').click(function() {
		$('#inputText h1').empty();
	})

	// display initial keyboard
	for (var i = 0; i < BUTTON_NUM; i++) {
		var button = $('<div id="button' + (i + 1) + '" class="col col-sm-4 button" >');
		button.append('<h3 class="letterAlign">' + lowerCase[i] + '</h3>');

		button = displaySideKeys(button, i, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);

		if (lowerCase[i] === 'CAPS') {
			button.attr('id', 'toUpCaps');
		} 

		if (lowerCase[i] === '123') {
			button.attr('id', 'nums');
		}

		$('#keyboard').append(button);
		
	}

/********************* swipe events display *********************************/ 
	var textInput = document.getElementById('inputText');
    
	// Display string that user transcribes 
	var currentString = document.getElementById('displayText');
	var globalIndex = 0; //current index in the array of string
	var strings = [
                    'my watch fell in the water',
                    'prevailing wind from the east',
                    'never too rich and never too thin',
                    'breathing is difficult',
                    'I can see the rings on Saturn',
                    'physics and chemistry are hard',
                    'my bank account is overdrawn',
                    'elections bring out the best',
                    'we are having spaghetti',
                    'time to go shopping',
                    'a problem with the engine',
                    'elephants are afraid of mice',
                    'my favorite place to visit',
                    'three two one zero blast off',
                    'my favorite subject is psychology',
                    'circumstances are unacceptable',
                    'watch out for low flying objects',
                    'if at first you do not succeed',
                    'please provide your date of birth',
                    'we run the risk of failure',
                    'prayer in schools offends some',
                    'he is just like everyone else',
                    'great disturbance in the force',
                    'love means many things',
                    'you must be getting old',
                    'the world is a stage',
                    'can I skate with sister today',
                    'neither a borrower nor a lender be',
                    'one heck of a question',
                    'question that must be answered',
                    'beware the ides of March',
                    'double double toil and trouble',
                    'the power of denial',
                    'I agree with you',
                    'do not say anything',
                    'play it again Sam',
                    'the force is with you',
                    'you are not a jedi yet',
                    'an offer you cannot refuse',
                    'are you talking to me',
                    'yes you are very smart',
                    'all work and no play',
                    'hair gel is very greasy',
                    'Valium in the economy size',
                    'the facts get in the way'
			];
	currentString.innerHTML = '<p>' + strings[globalIndex] + '</p>'; 
 
	appendTrial(strings, globalIndex); // set initial first trial
    /***************Swipe gestures on text input******************/
  	// swipe left --> backspace
  	Hammer(textInput).on('swipeleft', function() {
		var appendVal = "&#x8;" //backspace character 
		var val = $('#inputText h1');
		var valLength = val.text().length;

		val.text(val.text().substring(0, valLength - 1));
        entriesCount++;
		appendEntry(globalIndex, '&#x8;');
  	});

  	// swipe right --> add space
  	Hammer(textInput).on('swiperight', function() {
		var appendVal = "\xa0";
  		var val = $('#inputText h1');
  		val.text(val.text() + appendVal);
        entriesCount++;
		appendEntry(globalIndex, " ");
		scrollRight();
  	})

  	// swipe up: clear Keyboard, shows next string in array;
  	var options = {
		preventDefault: true
	};
    
  	var submitKeyboard = new Hammer(textInput, options);
  	submitKeyboard.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
 	
  	submitKeyboard.on('swipeup', function(ev) {
        entriesCount = 0;
		var textVal = $('#inputText h1').text()
		$('#inputText h1').empty();
		appendTranscribed(textVal);
		globalIndex++;
		if (globalIndex > strings.length - 1) { // reached end of string array
			alert('test is done!');

			 console.log('userData = ' + userData);
			//create button
			downloadButton = $('<button type="button" class="btn btn-primary">Download Data </button>');
			$('#transcribeText').append(downloadButton);
			console.log(downloadButton[0]);



			// assuming var `svg` for your SVG node
			
		} 
		currentString.innerHTML = '<p>' + strings[globalIndex] + '</p>';
        if (globalIndex < strings.length) {
    		appendTrial(strings, globalIndex);
        }
		console.log(userData);
  	})    
    
/*******************Date stuff for <TextTest> node *********************/
    var rootElement = userData.documentElement; //grabs the <TextTest node>
    
    rootElement.setAttribute("version", "2.7.2");
    rootElement.setAttribute("trials", strings.length); 
    rootElement.setAttribute("ticks", (new Date().getTime() * 10000) + 621355968000000000);  
    rootElement.setAttribute("seconds", new Date().getTime() / 1000);
    
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date();
    var currentDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + date.getHours()  + ':' + date.getMinutes() + ':' + date.getSeconds();
    currentDate = formatDate(currentDate);
    
    // https://stackoverflow.com/questions/4898574/converting-24-hour-time-to-12-hour-time-w-am-pm-using-javascript
    function formatDate(date) {
        var d = new Date(date);
        var hh = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = "PM";
        }
        if (h == 0) {
            h = 12;
        }
        m = m < 10 ? "0" + m : m;

        s = s < 10 ? "0" + s : s;

        /* if you want 2 digit hours:
        h = h<10?"0"+h:h; */

        var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

        var replacement = h + ":" + m;
        /* if you want to add seconds
        replacement += ":"+s;  */
        replacement += " " + dd;

        return date.replace(pattern, replacement);
    }    
    
    var currentDate = days[date.getDay()] + ', ' + currentDate;
    rootElement.setAttribute("date", currentDate);
	console.log(userData);
    
/************************ download button events ********************/ 
	$('#transcribeText').on('click', downloadButton, function() {
		var a = document.createElement('a'), xml, ev;
		a.download = 'Test_Result.xml'; // file name
		xml = (new XMLSerializer()).serializeToString(userData).replace(/&amp;#x8;/gi, "&#x8;"); // convert node to xml string
		var xmlNode = '<?xml version = "1.0" encoding="utf-8" standalone="yes"?>';
		xml = xmlNode + xml;
		a.href = 'data:application/octet-stream;base64,' + btoa(xml); // create data uri
		// <a> constructed, simulate mouse click on it
		ev = document.createEvent("MouseEvents");
		ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		a.dispatchEvent(ev);

		downloadButton.attr('disabled', 'disabled'); // disable the button after click




	})

/**********************************************************************************/
    
    // Ensures that the text input field is always to the right
    function scrollRight() {
        var isScrolledToRight = textInput.scrollWidth - textInput.clientWidth <= textInput.scrollLeft + 1;
        if (!isScrolledToRight) {
            textInput.scrollLeft = textInput.scrollWidth - textInput.clientWidth;
        }         
    }
    
/********************* XML Functions***************************************/
	function appendTrial(strings, index) {
		var trialElement = userData.createElement("Trial");		
		trialElement.setAttribute("number", index + 1); // trial number is not based 0, so add 1
		if (index < 5) { //first 5 of 45 are just practice 
			trialElement.setAttribute("testing", "false");
		} else { 
			trialElement.setAttribute("testing", "true");		
		}
		trialElement.setAttribute("entries", entriesCount);
		userData.getElementsByTagName("TextTest")[0].appendChild(trialElement);	
		appendPresented(strings, index);	
	}

	function appendPresented(strings, index) {
		var presentedElement = userData.createElement("Presented");
		presentedElement.textContent = strings[index];
		userData.getElementsByTagName("Trial")[index].appendChild(presentedElement);   		
	}

	function appendEntry(index, char) {
		var ticks = (new Date().getTime() * 10000) + 621355968000000000 ; // https://stackoverflow.com/questions/7966559/how-to-convert-javascript-date-object-to-ticks
		var seconds = new Date().getTime() / 1000; //convert ms to seconds
		var entryElement = userData.createElement("Entry");
		entryElement.setAttribute("char", char);
        if (char == ' ') { //a space value has to be 32, charCodeAt returns 160
            entryElement.setAttribute("value", 32);
        } else if (char === '&#x8;') {
            console.log('inside');
            entryElement.setAttribute("value", 8); // a backspace value has to be 8, charCodeAt returns 38;
        } else {
            entryElement.setAttribute("value", char.charCodeAt(0));            
        }
		entryElement.setAttribute("ticks", ticks);		
		entryElement.setAttribute("seconds", seconds);
		userData.getElementsByTagName("Trial")[index].appendChild(entryElement);
		userData.getElementsByTagName("Trial")[index].setAttribute("entries", entriesCount);        
	}

	function appendTranscribed(transcription) {
		var transcribedElement = userData.createElement("Transcribed");
		transcribedElement.textContent = transcription;
		userData.getElementsByTagName("Trial")[globalIndex].appendChild(transcribedElement);
	}

/************************************************************************/	

	// show that a mouse is hovering over a key
	$('#keyboard').on('mouseenter', '.button', function() {
		$(this).css('background-color', '#000000');
	})

	// shows that a mouse is not hovering the key
	$('#keyboard').on('mouseleave', '.button', function() {
		$(this).css('background-color', '#222223');
	})

	$('#testBox').mousemove(function(event) {
		$('#report').text('X Coordinate: ' + event.pageX + ', Y Coordinate: ' + event.pageY);
	})

	// when keys are pressed
	$('#keyboard').on('click', '.button', function() {
		if ($(this).attr('id') === 'nums') {
			$('#keyboard').empty();
			changeKeyBoard(punctuation, 'punctuation');
		} else if ($(this).attr('id') === 'toUpCaps') {
	    	// change to Upper;;
	    	$('#keyboard').empty();
	    	changeKeyBoard(upperCase, 'upCase');
	    } else if ($(this).attr('id') === 'toLowCaps') {
	    	// change to lower
	    	$('#keyboard').empty();
	    	changeKeyBoard(lowerCase, 'lowCase');
	    } else {
            entriesCount++;
			var textVal = $('#inputText h1').text(); //current letters in text input
			var appendVal = $(this).children('h3').text(); //letter just inputted 
			if ($(this).attr('id') === 'button11') {
				appendVal = "\xa0";
                appendEntry(globalIndex, " "); // logging should read a " " instead of the non breaking space
			} else {
                appendEntry(globalIndex, appendVal) // append Entry XML node
            }
            $('#inputText h1').text(textVal += appendVal);            
            scrollRight();
	    }
	});
	function createEntryNode(val){

	}

	function displaySideKeys(button, index, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc) {		

		// display right Letters
		if (index === 0 || index === 4 || index === 3 || index === 6) {
			if (index === 0 || index === 3 || index === 6) {
				console.log(index);
				console.log(button[0]);
				button.children('h3').addClass('letterConfig1');
			}
			if (index === 6) {
				button.children('h3').css('margin-top', 0);
			}
			if (index === 4) {
				button.append('<h5 class="letterAlign">' + centerKey[1] + '</h5>');	
			} else {
                button.append('<h5 class="letterAlignRight">' + rightLetter[index / 3] + '</h5>');
			}
		}

		// display bottom Letter
		if (index < 6) {
			button.append('<h5>' + botLetter[index] + '</h5>');
		}

		// display left Letter
		if (index === 2 || index === 4 || index === 5 || index === 8) {
			if (index === 2 || index === 5 || index === 8) {
				button.children('h3').addClass('letterConfig2');
			}
			if (index === 8 ){
				button.children('h3').css('margin-top', 0);
			}
			if (index === 4) {
				button.prepend('<h5 class="letterAlign">' + centerKey[0] + '</h5>');	
			} else {
				button.prepend('<h5 class="letterAlignLeft">' + leftLetter[Math.floor(index / 3)] + '</h5>');
			}
		}

		// display top Letter
		if (index >= 6 && index <= 8 || index === 10) {
			if (index === 10) {
				button.prepend('<h5>' + botButtonPunc[0] + '</h5>');
				button.children('h5').css('margin-top', '1em');
				button.children('h5').css('margin-bottom', 0);
			} else {
				button.prepend('<h5>' + topLetter[index - 6] + '</h5>');
				button.children('h5').css('margin-top', '1em');
				button.children('h5').css('margin-bottom', 0);	
				button.children('h3').css('margin-top', 0);	
			}	
		}

		if (index === 10) {
			button.children('h3').addClass('letterConfig1');
			button.children('h3').css('margin-top', 0);
			button.append('<h5 class="letterAlignRight">' + botButtonPunc[1] + '</h5>');
		}

		if (index === 4) {
			button.children('.letterAlign').css('width', '30%');
			
		}
		return button;


	}


	// change keyboard depending on the type of keyboard wanted
	function changeKeyBoard(letterCase, changeCaps) {
		for (var i = 0; i < BUTTON_NUM; i++) {
			var button = $('<div id="button' + (i + 1) + '" class="col col-sm-4 button">');
			button.append('<h3 class="letterAlign">' + letterCase[i] + '</h3>');

			if (changeCaps === 'upCase') {
				displaySideKeys(button, i, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc)

			} else if (changeCaps === 'lowCase') {
				displaySideKeys(button, i, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc)
			} else {
				displaySideKeys(button, i, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2)				
			}

			if (letterCase[i] === 'CAPS' || letterCase[i] === 'abc') {
				if (changeCaps === 'upCase') {
					button.attr('id', 'toLowCaps');	
					button.css('background-color', 'black');
					button.css('color', 'white');
				} else if (changeCaps === 'punctuation') {
					button.attr('id', 'toLowCaps');

				} else {
					button.attr('id', 'toUpCaps');
				}
			}

			if (letterCase[i] === '123') {
				button.attr('id', 'nums');
			}

			$('#keyboard').append(button);			
		}

		if (changeCaps === 'upCase') {
			swipe('button1', 0, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button2', 1, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button3', 2, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button4', 3, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button5', 4, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button6', 5, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button7', 6, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button8', 7, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button9', 8, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);
			swipe('button11', 10, upbotLetter, uptopLetter, upleftLetter, uprightLetter, upcenterKey, botButtonPunc);

		} else if (changeCaps === 'lowCase') {
			swipe('button1', 0, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button2', 1, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button3', 2, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button4', 3, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button5', 4, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button6', 5, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button7', 6, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button8', 7, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button9', 8, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
			swipe('button11', 10, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
		} else {
			swipe('button1', 0, punctopLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button2', 1, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button3', 2, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button4', 3, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button5', 4, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button6', 5, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button7', 6, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button8', 7, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button9', 8, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);
			swipe('button11', 10, puncbotLetter, punctopLetter, puncleftLetter, puncrightLetter, punccenterKey, botButtonPunc2);

		}
	}



/********************* swipe events ****************************************/

	swipe('button1', 0, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button2', 1, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button3', 2, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button4', 3, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button5', 4, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button6', 5, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button7', 6, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button8', 7, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button9', 8, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);
	swipe('button11', 10, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc);

	function swipe(id, index, botLetter, topLetter, leftLetter, rightLetter, centerKey, botButtonPunc) {
	  	var button = document.getElementById(id);

	  	var options = {
			preventDefault: true
		}; 
		var vertSwipe = new Hammer(button, options);
		vertSwipe.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
		 

	  	//swipe down
		if (index < 6) {
			vertSwipe.on('swipedown', function(ev) {
		  		var inputVal = $('#inputText h1').text();
  				$('#inputText h1').text(inputVal + botLetter[index]);
                entriesCount++;
				appendEntry(globalIndex, botLetter[index]); 
                scrollRight();
  			})
            
		}

		// swipe up
		if (index >= 6 && index <= 8 || index === 10) {

			vertSwipe.on('swipeup', function(ev) {
                entriesCount++;
		  		var inputVal = $('#inputText h1').text();
		  		if (index === 10) {
  					$('#inputText h1').text(inputVal + botButtonPunc[0]);
					appendEntry(globalIndex, botButtonPunc[0]); 
		  		} else {
  					$('#inputText h1').text(inputVal + topLetter[index - 6]);
					  appendEntry(globalIndex, topLetter[index - 6]); 
  				}
                scrollRight();
  			})            
		}


		// swipe right
		if (index === 0 || index === 4 || index === 3 || index === 6 || index === 10) {
			Hammer(button).on('swiperight', function(ev) {
		  		var inputVal = $('#inputText h1').text();
                entriesCount++;
		  		if (index === 4) {
		  			$('#inputText h1').text(inputVal + centerKey[1]);
					appendEntry(globalIndex, centerKey[1]); 
		  		} else if (index === 10) {
		  			$('#inputText h1').text(inputVal + botButtonPunc[1]);
					appendEntry(globalIndex, botButtonPunc[1]); 
		  		} else {
			  		$('#inputText h1').text(inputVal + rightLetter[index / 3]);
					appendEntry(globalIndex, rightLetter[index / 3]); 
		  		}
                scrollRight();
			});
		}

		// swipe left
		if (index === 2 || index === 4 || index === 5 || index === 8) {
			Hammer(button).on('swipeleft', function(ev) {
                entriesCount++;
		  		var inputVal = $('#inputText h1').text();
		  		if (index === 4) {
			  		$('#inputText h1').text(inputVal + centerKey[0]);
					appendEntry(globalIndex, centerKey[0]); 
		  		} else {
		  			$('#inputText h1').text(inputVal + leftLetter[Math.floor(index / 3)]);
					appendEntry(globalIndex, leftLetter[Math.floor(index / 3)]); 
				}
                scrollRight();
			});
		}       
	}
})
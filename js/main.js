//===menu 
//===link active
let menuUl = document.querySelector('.menu__ul') 

menuUl.onclick = (e) => { 

	let menuActive = document.querySelector('.menu__title--active');
	let clickedLink = e.target.closest('a');    
	let clickedSpan = clickedLink.children    
	  
	  if(menuActive) menuActive.classList.remove('menu__title--active');

	  clickedSpan[0].classList.add('menu__title--active'); 
	
	//change tab active
	let linkTab = clickedLink.getAttribute('data-tab'),
		contentTab = document.querySelector('#' + linkTab),
		menuHeader = document.querySelector('.menu__header'),
		tabActive =  document.querySelector('.setting--active')

		if(tabActive) tabActive.classList.remove('setting--active')

		contentTab.classList.add('setting--active')

		//change header
		menuHeader.innerHTML = clickedSpan[0].innerText


		return false;
};

//===popup form input
let settingPopup = document.querySelector('.setting-popup'); // get popup tag
let popupForm = document.querySelector('.setting-popup__form')
let popupInput = document.querySelector('.setting-popup__input')

//add class if focus
popupInput.onfocus = () => {
	popupForm.classList.add('setting-popup__form--active');
}

//remove class if blur and value is empty
popupInput.onblur  = () => {
	if(popupInput.value == '') popupForm.classList.remove('setting-popup__form--active');
}
 
//===settings popup
let settingBtns = document.querySelectorAll('.svg-create'),
	clickedSetting,
	settingTitleDefault

//change popup values
for(var i = 0; i < settingBtns.length; i++){

settingBtns[i].onclick = (e) => { 

	settingPopup.classList.add('setting-popup--active'); //show popup
	clickedSetting = e.target.closest('.setting-title'); //clicked title
	settingTitleDefault = clickedSetting.querySelector('.setting-title__text').innerText; //get default title

	let activeBtn = e.target.closest('.svg-create'); //current btn

	if(activeBtn) {
		let	bodyRect = document.body.getBoundingClientRect(),		// get body offset
			elemRect = activeBtn.getBoundingClientRect(), 			// get current btn offset
			offsetTop = elemRect.top - bodyRect.top, 				// get top position
			offsetLeft = elemRect.left - bodyRect.left + 60; 		// get left position

		//change position popup
		settingPopup.setAttribute(
			'style', 
			'top: ' + offsetTop + 'px; left: ' + offsetLeft + 'px'); 

		//change popup label text
		let parentName = activeBtn.parentNode.getAttribute('data-name'),
			popupLabel = document.querySelector('.setting-popup__label')

			popupLabel.innerHTML = parentName //write to label 
			popupInput.value = '' // reset value
			popupForm.classList.remove('setting-popup__form--active') // reset class
	}
};

}

//live change
	popupInput.oninput = (e) => {
		let liveInput = e.target.value
		console.log(liveInput)
		clickedSetting.querySelector('.setting-title__text').innerHTML = liveInput //change setting item
	};

//===setting values
//load from localstorage
	let storageName = (localStorage.getItem('name')) ? localStorage.getItem('name') : 'Your name',
		storageSite = (localStorage.getItem('site')) ? localStorage.getItem('site') : 'Your web site',
		storagePhone = (localStorage.getItem('phone')) ? localStorage.getItem('phone') : 'Your phone',
		storageCity = (localStorage.getItem('city')) ? localStorage.getItem('city') : 'Your city',
		settingTitle = document.querySelectorAll('.setting-title__text')

	let storageSettings = (...storageSettingsVal) => {
		for( let i = 0; i < settingTitle.length; i++) { // get setting titles length
			for (let key in localStorage) { // get key form localstorage
				if(settingTitle[i].parentNode.getAttribute('data-check') == key) { // compare localstorage key and setting title parent data-check
					document.querySelector('[data-check="' + key + '"] .setting-title__text').innerHTML = localStorage.getItem(key); //write value from localstorage to setting title					
				}
			}
		}
	}

	storageSettings(storageName, storageSite, storagePhone, storageCity)


//change setting values
let btnSave = document.querySelector('.button--save'),
	btnCancel = document.querySelector('.button--cancel'),
	settingError = document.querySelector('.setting-title__error');

btnSave.onclick = () => {

	let popupInputVal = popupInput.value,
		parentCheck = clickedSetting.getAttribute('data-check');

	let	invalidSetting = () => {
		settingError.classList.add('setting-title__error--active') //show error
	}

	let	validSetting = (key) => {
		settingError.classList.remove('setting-title__error--active') //hide error
		localStorage.setItem(key, popupInput.value) // push data to localstorage
	}

	if(parentCheck == 'name') {

		let popupInputLength = popupInputVal.split('').length;

		if(popupInputLength < 3) {
			invalidSetting()

			if(window.innerWidth < 768) {
				document.querySelector('.profile-info__name').innerHTML = popupInputVal
			}

		} else {
			validSetting(parentCheck)
		}

	}

	if(parentCheck == 'site') {

		let checkSite = /^(ftp|http|https):\/\/[^ "]+$/;

		if(!popupInputVal.match(checkSite)) {
			invalidSetting() 

		} else {
			validSetting(parentCheck)
		}

	}

	if(parentCheck == 'phone') {

		let checkPhone = /^\+[1-9]{1}[0-9]{3,14}$/;

		if(!popupInputVal.match(checkPhone)) {
			invalidSetting()

			if(window.innerWidth < 768) {
				document.querySelector('.profile-info__contact--phone').innerHTML = popupInputVal
			}

		} else {
			validSetting(parentCheck)

		}

	}

	if(parentCheck == 'city') {
		validSetting(parentCheck)

		if(window.innerWidth < 768) {
			document.querySelector('.profile-info__contact--location').innerHTML = popupInputVal
		}
	}

}



btnCancel.onclick = () => {

	document.querySelector('.setting-popup__input').innerHTML = ''; // reset value

	settingPopup.classList.remove('setting-popup--active'); //hide popup
	settingError.classList.remove('setting-title__error--active') //hide error
	clickedSetting.querySelector('.setting-title__text').innerHTML = settingTitleDefault //return default value
}

//===increase localstorage
//===followers
	//set 1 to localstorage
	if(localStorage.getItem('followers') < 1) localStorage.setItem('followers', 1); //create

let svgAdd = document.querySelector('.svg-add'),
	followersNum = document.querySelector('.followers-num'),
	followersStorage = localStorage.getItem('followers');


	//increase followers Num
svgAdd.onclick = () => {
	followersNum.innerHTML = parseInt(followersNum.innerText) + 1

	//add to localstorage
	localStorage.setItem('followers', followersNum.innerText); //push to localstorage
}

	//load from localstorage
	followersNum.innerHTML = followersStorage


//=== reviews
	//set 1 to localstorage
	if(localStorage.getItem('reviews') < 1) localStorage.setItem('reviews', 1); //create

let reviewsNum = document.querySelector('.reviews__num'),
	reviewsStorage = localStorage.getItem('reviews')

	//increase reviews Num
window.onload = () => {
	reviewsNum.innerHTML = parseInt(reviewsNum.innerText) + 1

	//add to localstorage
	localStorage.setItem('reviews', reviewsNum.innerText); //push to localstorage

}

	//load from localstorage
	reviewsNum.innerHTML = reviewsStorage


document.querySelector('.profile-info__name').innerHTML 				= document.querySelector('[data-check="name"] .setting-title__text ').innerText
document.querySelector('.profile-info__contact--phone').innerHTML 		= document.querySelector('[data-check="phone"] .setting-title__text ').innerText
document.querySelector('.profile-info__contact--location').innerHTML 	= document.querySelector('[data-check="city"] .setting-title__text ').innerText



if(window.innerWidth < 768) {
	let settingMobile = document.querySelector('.setting-mobile'),
		settingBlock = document.querySelector('.setting');
//======mobile setting
	//show settings btn on mobile devices
	let mobileSetting = document.querySelector('.svg-setting');

	//===show mobile settings
	let mobileInput = document.querySelectorAll('.mobile-popup__input');

	mobileSetting.onclick = () => {
		settingMobile.classList.add('setting-mobile--active') // show settings form
		mobileSetting.style.display = 'none' // hide btn
		settingBlock.style.opacity = '0';
	}

	for (let i = 0; i < mobileInput.length; i++) {

		//add class if focus
		mobileInput[i].onfocus = () => {
			mobileInput[i].parentNode.classList.add('setting-popup__form--active');
		}

		//remove class if blur and value is empty
		mobileInput[i].onblur  = () => {
			if(mobileInput[i].value == '') mobileInput[i].parentNode.classList.remove('setting-popup__form--active');;
		}
	}


	let btnMobileSave = document.querySelector('.button--save-mobile'),
		btnMobileCancel = document.querySelector('.button--cancel-mobile'),
		settingError = document.querySelectorAll('.setting-title__error'),
		mobilePopupInput = document.querySelectorAll('.mobile-popup__input')


	btnMobileSave.onclick = () => {
		for( let i = 0; i < mobilePopupInput.length; i++){
			let mobileInputAttr = mobilePopupInput[i].getAttribute('data-mobile-input'),
				mobileInputVal = mobilePopupInput[i].value,
				settingTitle = document.querySelectorAll('.setting-title'),
				settingName = document.querySelector('[data-check="name"]'),
				stopIterate = 0,
				checkSite = /^(ftp|http|https):\/\/[^ "]+$/,
				checkPhone = /^\+[1-9]{1}[0-9]{3,14}$/;

				for( let a = 0; a < settingTitle.length; a++){
					let	settingTitleAttr = settingTitle[a].getAttribute('data-check'),
						settingTitleText = settingTitle[a].querySelector('.setting-title__text')

					// if(mobileInputAttr == 'site') {
					// 	if(!mobileInputVal.match(checkSite)) {
					// 		invalidSetting() 
					// 	} else {
					// 		validSetting(parentCheck)
					// 	}
					// }

					if(mobileInputAttr == 'surname' && mobileInputVal !== '' ) { //555

						//stop if done once
						// if (stopIterate !== 0) continue 
						// 	stopIterate++

						let storageName = localStorage.getItem('name').split(' ')[0]
						console.log(storageName)
						settingName.innerHTML = storageName + ' ' + mobileInputVal
						localStorage.setItem('name', storageName + ' ' + mobileInputVal)
					}


					if(mobileInputAttr == 'name' && mobileInputVal !== '') {

						let popupInputLength = mobileInputVal.split('').length;
						console.log(popupInputLength)
						if(popupInputLength < 3) {
								document.querySelector('[data-mobile-input="name"]').style.borderColor = "ff0000"

						} else {
							localStorage.setItem('name', mobileInputVal) // push data to localstorage
							document.querySelector('.profile-info__name').innerHTML = mobileInputVal
							document.querySelector('[data-check="name"]').innerHTML = mobileInputVal
						}

					}

					if(mobileInputAttr == 'site' && mobileInputVal !== '') {

						let checkSite = /^(ftp|http|https):\/\/[^ "]+$/;

						if(!mobileInputVal.match(checkSite)) {
							document.querySelector('[data-mobile-input="site"]').style.borderColor = "ff0000"
						} else {
							localStorage.setItem('site', mobileInputVal) // push data to localstorage
							document.querySelector('[data-check="site"] .setting-title__text').innerHTML = mobileInputVal
						}

					}

					if(mobileInputAttr == 'phone' && mobileInputVal !== '') {

						let checkPhone = /^\+[1-9]{1}[0-9]{3,14}$/;

						if(!mobileInputVal.match(checkPhone)) {
							document.querySelector('[data-mobile-input="phone"]').style.borderColor = "ff0000"
						} else {
							localStorage.setItem('phone', mobileInputVal) // push data to localstorage
							document.querySelector('[data-check="phone"] .setting-title__text').innerHTML = mobileInputVal

						}

					}

					if(mobileInputAttr == 'city') {
						localStorage.setItem('city', mobileInputVal) // push data to localstorage
						document.querySelector('[data-check="city"] .setting-title__text').innerHTML = mobileInputVal
					}
					
				}

		}
	}

	btnMobileCancel.onclick = () => {

		document.querySelector('.setting-popup__input').innerHTML = ''; // reset value

		settingMobile.classList.remove('setting-mobile--active'); //hide popup
		mobileSetting.style.display = 'block'; // show btn
		settingBlock.style.opacity = '1'; // reset value

	}

}

//===change DOM profile info
let infoBlock = document.querySelector('.profile-info'),
	infoContact = document.querySelectorAll('.profile-info__contact'),
	infoContactFirst = infoContact[0],
	infoContactLast = infoContact[1]

 	infoBlock.insertBefore(infoContactLast, infoContactFirst); // replace

//===change DOM setting buttons
let settingBlock = document.querySelector('.setting-buttons--mobile'),
	settingContact = settingBlock.querySelectorAll('.button'),
	settingContactFirst = settingContact[0],
	settingContactLast = settingContact[1]

 	settingBlock.insertBefore(settingContactLast, settingContactFirst); // replace
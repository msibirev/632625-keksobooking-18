'use strict';

var TITLES = [
  'Самая лучшая квартира!',
  'Ниче так!',
  '---',
  'just title'
];

var CHECKINS = ['12:00,', '13:00', '14:00'];
var CHECKOUTS = ['12:00,', '13:00', '14:00'];

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var ROOMS = [1, 2, 3];

var GUESTS = [1, 2, 3];

var IMAGE_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var ENTER_CODE = 13;

var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65 + 22;

// возвращает url картинки
var getImgUrl = function (number) {
  if (!number) {
    throw new Error('Ты не передал number!');
  }
  var mainZero = (number < 10) ? '0' : '';
  return 'img/avatars/user' + mainZero + number + '.png';
};

var imagesArrayUrlGenerator = function (arrNumbers) {
  var tepArr = [];
  arrNumbers.forEach(function (item) {
    var tempImgUrl = getImgUrl(item);
    tepArr.push(tempImgUrl);
  });
  return tepArr;
};

// возвращает число в диапазоне min max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomValueFromArray = function (arr) {
  var arrLength = arr.length;
  var randomNumber = getRandomNumber(0, arrLength);
  return arr[randomNumber];
};

var getRandomListFromArray = function (list, randomMin, randomMax) {
  var randomList = getRandomNumber(randomMin, randomMax);
  var arrList = [];
  for (var i = 0; i < randomList; i++) {
    arrList.push(list[i]);
  }

  return arrList;
};

var getLocation = function () {
  var mapElement = document.querySelector('.map');

  return {
    x: getRandomNumber(0, mapElement.offsetWidth),
    y: getRandomNumber(130, 630)
  };
};

var getOfferMock = function (avatarUrl) {
  return {
    author: {
      avatar: avatarUrl || ''
    },
    offer: {
      title: getRandomValueFromArray(TITLES),
      address: '600, 200',
      price: 1000,
      type: getRandomValueFromArray(TYPES),
      rooms: getRandomValueFromArray(ROOMS),
      guests: getRandomValueFromArray(GUESTS),
      checkin: getRandomValueFromArray(CHECKINS),
      checkout: getRandomValueFromArray(CHECKOUTS),
      features: getRandomListFromArray(FEATURES, 0, 3),
      description: '---',
      photos: getRandomListFromArray(PHOTOS, 0, 3)
    },
    location: getLocation()
  };
};

// Генерация n-го кол-ва моков
var getArrayOffersMock = function (countMocks) {
  var tempArr = [];
  var imgArr = imagesArrayUrlGenerator(IMAGE_NUMBER, getImgUrl);

  for (var i = 0; i < countMocks; i++) {
    var tempimgUrl = imgArr[i];
    var tempGenaretedMock = getOfferMock(tempimgUrl);
    tempArr.push(tempGenaretedMock);
  }
  return tempArr;
};

var mocks = getArrayOffersMock(8);

window.mocks = mocks;

/* var createPin = function (offer) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var childPinTemplate = mapPinTemplate.cloneNode(true);
  childPinTemplate.setAttribute('style', 'left: ' + offer.location.x + 'px' + '; top: ' + offer.location.y + 'px');
  childPinTemplate.querySelector('img').setAttribute('src', offer.author.avatar);
  childPinTemplate.querySelector('alt', offer.offer.type);
  return childPinTemplate;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();
  var mapArea = document.querySelector('.map__pins');

  for (var i = 0; i < offers.length; i++) {
    var newPin = createPin(offers[i]);
    fragment.appendChild(newPin);
  }

  mapArea.appendChild(fragment);
};

renderPins(mocks);

  var createPopup = function (offer) {
  var popupInsert = document.querySelector('.map');
  var popupTemplate = document.querySelector('#card').content.querySelector('.popup');

  var popupElement = popupTemplate.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupInsert.appendChild(popupElement);
  var beforeMapElement = document.querySelector('.map__filters-container');
  var parentMap = beforeMapElement.parentNode;
  parentMap.insertBefore(popupElement, beforeMapElement);

  return popupElement;
};

createPopup(mocks); */

var adFormHeader = document.querySelector('.ad-form-header');
adFormHeader.setAttribute('disabled', 'disabled');


var adFormElement = document.querySelectorAll('.ad-form__element');
for (var i = 0; i < adFormElement.length; i++) {
  adFormElement[i].setAttribute('disabled', 'disabled');
}

var doActive = function () {
  adFormHeader.removeAttribute('disabled', 'disabled');
  for (var i = 0; i < adFormElement.length; i++) {
    adFormElement[i].removeAttribute('disabled', 'disabled');
  }
  var adFormFaded = document.querySelector('.ad-form--disabled');
  adFormFaded.classList.remove('ad-form--disabled');


};

var mapElement = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', function () {
  mapElement.classList.remove('map--faded');
  doActive();
  setAddress('down');
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    mapElement.classList.remove('map--faded');
    doActive();
    setAddress('down');
  }
});

var getCoordinatsPinMain = function (howCalc) {
  // style left in number
  var mapPinMainLeftStyle = mapPinMain.style.left.slice(0, -2) * 1;
  var mapPinMainTopStyle = mapPinMain.style.top.slice(0, -2) * 1;

  var pinHeight = 0;
  if (howCalc === 'center') {
    pinHeight = MAP_PIN_MAIN_HEIGHT / 2;
  } else if (howCalc === 'down') {
    pinHeight = MAP_PIN_MAIN_HEIGHT;
  }

  var x = Math.floor(mapPinMainLeftStyle + MAP_PIN_MAIN_WIDTH / 2);
  var y = Math.floor(mapPinMainTopStyle + pinHeight);

  return {
    x: x,
    y: y
  };
};

var setAddress = function (howCalc) {
  var addressInput = document.querySelector('#address');
  var centerPin = getCoordinatsPinMain(howCalc);
  addressInput.value = centerPin.x + ', ' + centerPin.y;
};

setAddress('center');


var selectChanger = function () {
  var capacityValue = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var roomSelect = document.querySelector('#room_nubmer');
  var capacitySelect = document.querySelector('#capacity');
  var guestCapacity = capacitySelect.querySelector('option:checked');
  var roomCapacity = capacityValue[roomSelect.querySelector('option:checked').value];
  var errorMessage = roomCapacity.includes(guestCapacity.value) ? '' : 'Колличество комнат не подходит ' + guestCapacity.textContent;
  capacitySelect.setCustomValidity(errorMessage);
};

document.querySelector('#capacity').addEventListener('change', function () {
  selectChanger();
});

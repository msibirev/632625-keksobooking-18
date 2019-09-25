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

var mapRemove = document.querySelector('.map');
mapRemove.classList.remove('map--faded');

var createPin = function (offer) {
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

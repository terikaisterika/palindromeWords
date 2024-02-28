function getWebElement(locator) {
  return document.querySelector(locator);
}
function outputAnswer(result, locator) {
  divAnswer = getWebElement(locator);
  divResult = document.createElement('div');
  divResult.innerText = result;
  divAnswer.appendChild(divResult);
}

function getPalindromeUI(e) {
  e.preventDefault();
  form = getWebElement('[name="getPalindrome"]');
  inputsRadioText = form.elements['type-text'];
  inputsRadioLength = form.elements['type-length'];
  listWords = getArray(form.elements['list'].value);
  resultList = inputsRadioText[0].checked
    ? listWords
    : excludeNumbers(listWords);
  answer = getPalindrome(resultList, inputsRadioLength[0].checked);
  outputAnswer(answer, '#result');
}
function excludeNumbers(data) {
  const regExp = /^[^0-9]+$/i;
  result = data.filter((el) => {
    if (regExp.test(el) == true) {
      return el;
    }
  });
  return result;
}
function getArray(list) {
  return list.replaceAll(', ', ',').replaceAll(' ,', ',').split(',');
}
const submit = getWebElement('[type="submit"]');
submit.addEventListener('click', getPalindromeUI);

/**
 *
 * @param {*} arr @type array[<number>]
 * @param {*} max @type boolean
 * если параметр max = true, вернется максимальное число из массива, если max=false, вернется минимальное
 * @returns number
 */
const getMaxMin = (arr, max = true) => {
  extremeValue = arr[0];
  if (max) {
    for (let i = 1; i < arr.length; i++) {
      extremeValue < arr[i] ? (extremeValue = arr[i]) : extremeValue;
    }
  }
  if (max == false) {
    for (let i = 1; i < arr.length; i++) {
      extremeValue > arr[i] ? (extremeValue = arr[i]) : extremeValue;
    }
  }
  return extremeValue;
};
//isMax=true - вернет максимальное. false - вернет минимальное
const getPalindrome = (list, isMax = true) => {
  arrResult = [];
  arrAnswer = [];
  arrForLength = [];
  for (let i = 0; i < list.length; i++) {
    element = list[i].toLowerCase();
    elReverse = element.split('').reverse().join('');
    if (element == elReverse && element.length > 1) {
      arrResult.push(list[i]);
      arrForLength.push(list[i].length);
    }
  }
  if (isMax) {
    maxLength = getMaxMin(arrForLength);
    arrAnswer = arrResult.filter((el) => el.length == maxLength);
  }
  if (isMax == false) {
    minLength = getMaxMin(arrForLength, false);
    arrAnswer = arrResult.filter((el) => el.length == minLength);
  }
  return arrAnswer;
};

const form = document.querySelector('form');
const emailField = form.querySelector('input[name="email"]');
const countrySelect = form.querySelector('select');
const postalCodeField = form.querySelector('input[name="postal-code"]');

const isEmailValid = function (email) {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegExp.test(email);
};

const checkEmail = function () {
  const email = emailField.value.trim();
  const isEmpty = email === '';
  const errorEl = form.querySelector('input[name="email"] + .error');
  const invalidEmailMessage = `Пожалуйста, введите ${isEmpty ? '' : 'корректный'} адрес электронной почты.`;

  if (isEmailValid(email)) {
    errorEl.textContent = '';
    emailField.setCustomValidity('');
  } else {
    emailField.setCustomValidity(invalidEmailMessage);
    errorEl.textContent = emailField.classList.contains('touched')
      ? emailField.validationMessage
      : '';
  }
};

const checkCountry = function () {
  const errorEl = form.querySelector('select + .error');
  const invalidSelectMessage = 'Пожалуйста, выберите страну';

  if (countrySelect.value === '') {
    errorEl.textContent = invalidSelectMessage;
    countrySelect.setCustomValidity(invalidSelectMessage);
  } else {
    errorEl.textContent = '';
    countrySelect.setCustomValidity('');
  }
};

const checkPostalCode = function () {
  const postalCodeRules = {
    '': [/^.*$/, 'Пожалуйста, выберите страну'],
    BY: [/^\d{6}$/, 'Пример кода выбранной страны: 220030'],
    HU: [/^\d{4}$/, 'Пример кода выбранной страны: 1234'],
    RU: [/^\d{6}$/, 'Пример кода выбранной страны: 123456'],
    RS: [/^\d{5}$/, 'Пример кода выбранной страны: 11000'],
    UA: [/^\d{5}$/, 'Пример кода выбранной страны: 01001'],
  };
  const errorEl = form.querySelector('input[name="postal-code"] + .error');
  const country = countrySelect.value.trim();
  const postalCode = postalCodeField.value;

  if (country === '') {
    postalCodeField.setCustomValidity('');
  }

  if (postalCodeRules[country][0].test(postalCode)) {
    postalCodeField.setCustomValidity('');
    errorEl.textContent = '';
  } else {
    postalCodeField.setCustomValidity(postalCodeRules[country][1]);
    errorEl.textContent = postalCodeField.validationMessage;
  }
};

emailField.addEventListener('blur', () => {
  emailField.classList.add('touched');
  checkEmail();
});

emailField.addEventListener('input', checkEmail);

countrySelect.addEventListener('blur', () => {
  countrySelect.classList.add('touched');
  checkCountry();
});

countrySelect.addEventListener('change', checkCountry);

postalCodeField.addEventListener('blur', () => {
  postalCodeField.classList.add('touched');
  checkPostalCode();
});

postalCodeField.addEventListener('input', checkPostalCode);

const form = document.querySelector('form');
const emailField = form.querySelector('input[name="email"]');
const countrySelect = form.querySelector('select');
const postalCodeField = form.querySelector('input[name="postal-code"]');
const passwordField = form.querySelector('input[name="password"]');
const confirmPasswordField = form.querySelector(
  'input[name="confirm-password"]',
);

const postalCodeRules = {
  '': [/^.*$/, 'Пожалуйста, выберите страну'],
  BY: [/^\d{6}$/, 'Пример: 220030'],
  HU: [/^\d{4}$/, 'Пример: 1234'],
  RU: [/^\d{6}$/, 'Пример: 123456'],
  RS: [/^\d{5}$/, 'Пример: 11000'],
  UA: [/^\d{5}$/, 'Пример: 01001'],
};

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
    postalCodeField.disabled = true;
  } else {
    errorEl.textContent = '';
    countrySelect.setCustomValidity('');
    postalCodeField.disabled = false;
    postalCodeField.placeholder = postalCodeRules[countrySelect.value][1];
  }
};

const checkPostalCode = function () {
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
    const invalidMessage = postalCodeField.classList.contains('touched')
      ? postalCodeRules[country][1]
      : '';

    postalCodeField.setCustomValidity(invalidMessage);
    errorEl.textContent = postalCodeField.validationMessage;
  }
};

const checkNewPassword = function () {
  const errorEl = form.querySelector('input[name="password"] + .error');
  const isTouched = passwordField.classList.contains('touched');
  let invalidMessage = '';

  if (passwordField.validity.valueMissing && isTouched) {
    invalidMessage = `Введите пароль длиной от 8 до 15 символов`;
  }

  if (passwordField.validity.tooShort && isTouched) {
    invalidMessage = `Минимальное количество символов 8. Вы ввели ${passwordField.value.length}`;
  }

  passwordField.setCustomValidity(invalidMessage);
  errorEl.textContent = invalidMessage;
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

passwordField.addEventListener('blur', () => {
  passwordField.classList.add('touched');
  checkNewPassword();
});
passwordField.addEventListener('input', checkNewPassword);

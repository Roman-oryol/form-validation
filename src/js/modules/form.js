const form = document.querySelector('form');
const emailField = form.querySelector('input[name="email"]');

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

emailField.addEventListener('blur', () => {
  emailField.classList.add('touched');
  checkEmail();
});

emailField.addEventListener('input', checkEmail);

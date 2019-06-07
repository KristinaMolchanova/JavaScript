'use strict'

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const errorMessage = 'Ошибка! Логин должен быть от 4 до 16 символов';
const failureMessage = 'Такой логин уже используется!';
const successMessege = 'Логин успешно добавлен!';

const isLoginValid = (login) => {
  return login.length > 3 && login.length < 17;
};

const isLoginUnique = (allLogins, login) => !allLogins.includes(login);

const addLogin = (allLogins, login) => {
  if (!isLoginValid(login)) {
    console.log(errorMessage);
    return errorMessage;
  }
  if (isLoginUnique(allLogins, login)) {
    logins.push(login);
    console.log(successMessege);
    return successMessege;
  } else {
    console.log(failureMessage);
    return failureMessage;
  }
};

addLogin(logins, 'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles') // Такой логин уже используется!
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'

console.log(logins);
'use strict';

const login = prompt ('Введите логин');
const adminLogin = 'admin';
const adminPassword = 'm4ng0h4ckz';

if (!login){
    alert('Отменено пользователем!');
} else if (login !== adminLogin){
    alert('Доступ запрещен, неверный логин!');
} else {
    const password = prompt('Введите пароль');
    if (!password) {
        alert('Отменено пользователем!');
    } else if (password !== adminPassword) {
        alert('Доступ запрещен, неверный пароль!');
    } else {
        alert('Добро пожаловать!');
    }
}

 
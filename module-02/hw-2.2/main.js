'use strict';

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;

do {
    let password = prompt('Введите пароль', '');
    if (passwords.includes(password)){
        alert('Добро пожаловать!');        
        break;
    } else if (!password) {
        break;
    } else {
        attempts -= 1;
        if (attempts >=1){
            alert ('Неверный пароль, у вас осталось ' + attempts + ' попыток');    
        } else {
            break;
        }                  
    }       
} while (attempts >= 1 ){
    if (attempts < 1){
        alert('У вас закончились попытки, аккаунт заблокирован!');
    }     
}




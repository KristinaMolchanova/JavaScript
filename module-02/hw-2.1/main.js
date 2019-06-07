'use strict';

let userInput;
const numbers = [];
let total = 0;

do {    
    userInput = prompt('Введите число','');
    userInput = Number(userInput); 
    if (isNaN(userInput)){        
        alert('Было введено не число, попробуйте еще раз');
    } else {
        numbers.push(userInput);
    }     
}   
while (userInput || isNaN(userInput)) {
    for (let i = 0; i < numbers.length; i += 1) {
        total += numbers[i];                              
    }  
    if (!isNaN(userInput) && total !== 0){
        alert('Общая сумма чисел равна: ' + total); 
    }      
}
 


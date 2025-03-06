'use strict';

const liveTime = document.querySelector('section h1');
const alarmTime = document.querySelector('.alarm-set p');
const setAlarmButton = document.querySelector('.submit-button');
const inputs = document.querySelectorAll('.time');
const hourInput = document.querySelector('.hour');
const minutesInput = document.querySelector('.minutes');
const alarmMusic = new Audio('./assets/media/alarm.mp3');
alarmMusic.type = 'audio/mp3';

let alarmHour = null;
let alarmMinute = null;
let alarmDateTime = null;
let alarmSet = false;

function clearInputs () {
    hourInput.value = '';
    minutesInput.value = '';
}

setInterval ( function setTime () {
    const time = new Date();
    let hour = time.getHours().toString().padStart(2, '0');
    let minute = time.getMinutes().toString().padStart(2, '0');
    liveTime.textContent = `${hour}:${minute}`;

    if (alarmSet && time.getTime() >= alarmDateTime) {
        alarmMusic.play();
        liveTime.classList.add('alarm-color');
        alarmSet = false;
    }

}, 1000);

function validateInputs () {
    let hourValue = parseInt(hourInput.value, 10);
    let minuteValue = parseInt(minutesInput.value, 10);

    if( hourValue < 0 || hourValue > 23) {
        return false;
    }
    if( minuteValue < 0 || minuteValue > 59) {
        return false;
    }

    return true;
}

inputs.forEach((input) => {
    input.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
        validateInputs();
    });
});  

function setAlarmTime (hourValue, minuteValue) {
    let now = new Date();
    let alarmTimeObj = new Date();
    alarmTimeObj.setHours(parseInt(hourValue, 10), parseInt(minuteValue, 10), 0, 0);

    if (alarmTimeObj.getTime() <= now.getTime()) {
        alarmTimeObj.setDate(alarmTimeObj.getDate() + 1);
    }

    return alarmTimeObj.getTime();
}


setAlarmButton.addEventListener('click', () => {
    if(!validateInputs()) {
        return;
    }

    let hourValue = hourInput.value.padStart(2, '0');
    let minuteValue = minutesInput.value.padStart(2, '0');

    alarmDateTime = setAlarmTime (hourValue, minuteValue);
    alarmTime.textContent = `${hourValue}:${minuteValue}`;
    alarmSet = true;

    clearInputs();
});
